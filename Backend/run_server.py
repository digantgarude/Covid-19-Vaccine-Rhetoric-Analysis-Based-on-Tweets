from flask import Flask, request
import requests
import argparse
from flask_cors import CORS
import pandas as pd
from apscheduler.schedulers.background import BackgroundScheduler
import pymongo
from variables import MONGO_CONNECT_URL
import df_utils

parser = argparse.ArgumentParser()
parser.add_argument("--host", type=str, required=False, default="0.0.0.0")
parser.add_argument("--port", type=int, required=False, default=8080)
parser.add_argument("--db_name", type=str, required=False, default="ir_535")

args            = parser.parse_args()
host            = args.host
port            = args.port
db_name         = args.db_name

client = pymongo.MongoClient(MONGO_CONNECT_URL)

db = client.get_database(db_name)

app = Flask(__name__)
CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'

# ============================= LOAD DATA ON RUN =============================
url_world = "https://pomber.github.io/covid19/timeseries.json"
res_world_count = requests.get(url_world).json()

# ============================================================================
# Vaccinations Data By Country
vaccinations_india_df = pd.read_csv("./Datasets/Vaccinations/India.csv")
vaccinations_usa_df = pd.read_csv("./Datasets/Vaccinations/United_States.csv")
vaccinations_mexico_df = pd.read_csv("./Datasets/Vaccinations/Mexico.csv")
# Clean Data 
vaccinations_india_df.fillna(0,inplace=True)
vaccinations_usa_df.fillna(0,inplace=True)
vaccinations_mexico_df.fillna(0,inplace=True)

# Convert String date to datetime
vaccinations_india_df["date"] = pd.to_datetime(vaccinations_india_df["date"], format='%Y-%m-%d')
vaccinations_usa_df["date"] = pd.to_datetime(vaccinations_usa_df["date"], format='%Y-%m-%d')
vaccinations_mexico_df["date"] = pd.to_datetime(vaccinations_mexico_df["date"], format='%Y-%m-%d')

# ============================= CODE BELOW THIS =============================


@app.route("/vaccinations/", methods=['GET', 'POST'])
def get_country_vaccinations():
    if request.method == "GET":
        country = request.args.get("country")
        from_date = request.args.get("from_date")
        till_date = request.args.get("till_date")

        if country == "India":
            df = vaccinations_india_df
        elif country == "USA":
            df = vaccinations_usa_df
        elif country == "Mexico":
            df = vaccinations_mexico_df
        else:
            return {
                "error" : "country is wrong"
            }

        df = df_utils.get_between_dates(df, "date", from_date, till_date)
        df['date'] = df.date.dt.strftime("%Y-%m-%d")
        df = df_utils.get_reverse_cumsum(df, "total_vaccinations", "daily")
        df = df_utils.get_reverse_cumsum(df, "people_vaccinated", "daily")
        df = df_utils.get_reverse_cumsum(df, "people_fully_vaccinated", "daily")

        return {
            "Date": list(df.date),
            "total_vaccinations": list(df.total_vaccinations),
            "total_vaccinations_daily": list(df.total_vaccinations_daily),
            "people_vaccinated": list(df.people_vaccinated),
            "people_vaccinated_daily": list(df.people_vaccinated_daily),
            "people_fully_vaccinated": list(df.people_fully_vaccinated),
            "people_fully_vaccinated_daily": list(df.people_fully_vaccinated_daily),
        }
    else:
        return "Try POST request"   

@app.route("/country/", methods=['GET', 'POST'])
def get_country_cases():
    if request.method == "GET":
        country = request.args.get("country")

        from_date = request.args.get("from_date")
        till_date = request.args.get("till_date")

        df = pd.DataFrame.from_dict(res_world_count.get(country),orient='columns')

        df["date"] = pd.to_datetime(df["date"], format='%Y-%m-%d')

        # Get data between dates
        df = df_utils.get_between_dates(df, "date", from_date, till_date)

            # Convert datetime to str again
        df['date'] = df.date.dt.strftime("%Y-%m-%d")

        # --------
        df = df_utils.get_reverse_cumsum(df, "confirmed", "daily")
        df = df_utils.get_reverse_cumsum(df, "deaths", "daily")

        return {
            "Date":list(df.date),
            "Confirmed":list(df.confirmed),
            "Confirmed_Daily":list(df.confirmed_daily),
            "Deceased":list(df.deaths),
            "Deceased_Daily":list(df.deaths_daily),
            "Recovered":list(df.recovered)
            }
    else:
        return "Try POST request"  

def update_country_count():
    print("UPDATED WORLD COUNT")
    global res_world_count 
    res_world_count = requests.get(url_world).json()
    

@app.route("/get_tweets_by_ids/", methods=['GET', 'POST'])
def get_tweets_by_ids():
    if request.method == "POST":
        data = request.json
        print(data)
        response = list(db['tweets'].find({
            "id": {"$in":data['tweet_ids']}
        }))
        # response = list(db['tweets'].find({}))
        print("response")
        print(response)
        cleaned_response = []
        for obj in response:

            obj['_id'] = str(obj['_id']) 
            cleaned_response.append(obj)

        
        return {
            "tweets": cleaned_response
        }
    else:
        return "Try POST request"

@app.route("/get_tweets_by_poi/", methods=['GET', 'POST'])
def get_tweets_by_poi():
    if request.method == "POST":
        data = request.json
        print(data)
        response = list(db['tweets'].find({
            "poi_name": data['poi_name']
        }))
        
        print("response")
        print(response)
        cleaned_response = []
        for obj in response:

            obj['_id'] = str(obj['_id']) 
            cleaned_response.append(obj)

        
        return {
            "tweets": cleaned_response
        }
    else:
        return "Try POST request"   


if __name__ == "__main__":
    sched = BackgroundScheduler(daemon=True)
    sched.add_job(update_country_count,'interval',minutes=60)
    sched.start()
    app.run(host=host, port=port, debug=True)
    