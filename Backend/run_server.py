from flask import Flask, request
import requests
import argparse
from flask_cors import CORS
import pandas as pd
from apscheduler.schedulers.background import BackgroundScheduler
import pymongo
from variables import MONGO_CONNECT_URL




parser = argparse.ArgumentParser()
parser.add_argument("--host", type=str, required=False, default="0.0.0.0")
parser.add_argument("--port", type=int, required=False, default=8080)
parser.add_argument("--db_name", type=str, required=False, default="ir_535")

args            = parser.parse_args()
host            = args.host
port            = args.port
db_name            = args.db_name

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
            vaccinations_df = vaccinations_india_df
        elif country == "USA":
            vaccinations_df = vaccinations_usa_df
        elif country == "Mexico":
            vaccinations_df = vaccinations_mexico_df
        else:
            return {
                "error" : "country is wrong"
            }


        vaccinations_df_after_date = vaccinations_df[vaccinations_df['date'] >= from_date]
        vaccinations_df_till_date = vaccinations_df_after_date[vaccinations_df_after_date['date'] <= till_date]

        vaccinations_df_till_date['date'] = vaccinations_df_till_date.date.dt.strftime("%Y-%m-%d")
        df_response_data = vaccinations_df_till_date

        return {
            "Date": list(df_response_data.date),
            "total_vaccinations": list(df_response_data.total_vaccinations),
            "people_vaccinated": list(df_response_data.people_vaccinated),
            "people_fully_vaccinated": list(df_response_data.people_fully_vaccinated),
            "total_boosters": list(df_response_data.total_boosters)
        }
    else:
        return "Try POST request"   

@app.route("/country/", methods=['GET', 'POST'])
def get_country_cases():
    if request.method == "GET":
        country = request.args.get("country")

        from_date = request.args.get("from_date")
        till_date = request.args.get("till_date")

        df_country_data = pd.DataFrame.from_dict(res_world_count.get(country),orient='columns')
        df_country_data["date"] = pd.to_datetime(df_country_data["date"], format='%Y-%m-%d')

        df_country_data_after_date = df_country_data[df_country_data['date'] >= from_date]
        df_country_data_till_date = df_country_data_after_date[df_country_data_after_date['date'] <= till_date]

        df_response_data = df_country_data_till_date
        
        df_response_data['date'] = df_country_data_till_date.date.dt.strftime("%Y-%m-%d")

        df_response_data['confirmed_daily']=df_response_data['confirmed'].diff().fillna(df_response_data['confirmed'])
        df_response_data['confirmed_daily'].iloc[0] = df_response_data['confirmed_daily'].iloc[1]

        df_response_data['deaths_daily']=df_response_data['deaths'].diff().fillna(df_response_data['deaths'])
        df_response_data['deaths_daily'].iloc[0] = df_response_data['deaths_daily'].iloc[1]
        
        data = {
            "Date":list(df_response_data.date),
            "Confirmed":list(df_response_data.confirmed),
            "Confirmed_Daily":list(df_response_data.confirmed_daily),
            "Deceased":list(df_response_data.deaths),
            "Deceased_Daily":list(df_response_data.deaths_daily),
            "Recovered":list(df_response_data.recovered)
        }

        return {
            "Date":list(df_response_data.date),
            "Confirmed":list(df_response_data.confirmed),
            "Confirmed_Daily":list(df_response_data.confirmed_daily),
            "Deceased":list(df_response_data.deaths),
            "Deceased_Daily":list(df_response_data.deaths_daily),
            "Recovered":list(df_response_data.recovered)
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


if __name__ == "__main__":
    sched = BackgroundScheduler(daemon=True)
    sched.add_job(update_country_count,'interval',minutes=60)
    sched.start()
    app.run(host=host, port=port, debug=True)
    