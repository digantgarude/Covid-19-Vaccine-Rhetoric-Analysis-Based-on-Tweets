from flask import Flask, request
import requests
import argparse
from flask_cors import CORS, cross_origin
import pandas as pd
from apscheduler.schedulers.background import BackgroundScheduler
import pymongo
from requests.models import Response
from variables import MONGO_CONNECT_URL
import df_utils
import json
import re
f = open("./Datasets/vaccine_hesitancy.json", "r")
misinfo_data = json.load(f)
f.close()
misinfo_data = misinfo_data["5080"]

parser = argparse.ArgumentParser()
parser.add_argument("--host", type=str, required=False, default="0.0.0.0")
parser.add_argument("--port", type=int, required=False, default=7000)
parser.add_argument("--db_name", type=str, required=False, default="IR_Project")

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

# Hospitalization Data
df_hospitalization_us = pd.read_csv("./Datasets/COVID-19_Reported_Patient_Impact_and_Hospital_Capacity_by_State_Timeseries.csv")
df_hospitalization_us["date"] = pd.to_datetime(df_hospitalization_us["date"], format='%Y/%m/%d')


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

# ! CHART API
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

# ! CHART API
@app.route("/country/", methods=['GET', 'POST'])
def get_country_cases():
    if request.method == "GET":
        country = request.args.get("country")

        from_date = request.args.get("from_date")
        till_date = request.args.get("till_date")
        if country == "USA":
            country = "US"
        elif country == "INDIA":
            country = "India"
        elif country == "MEXICO":
            country = "Mexico"
        df = pd.DataFrame.from_dict(res_world_count.get(country),orient='columns')
        print("df.columns")
        print(df.columns)
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
        # print("response")
        # print(response)
        cleaned_response = []
        for obj in response:

            obj['_id'] = str(obj['_id']) 
            cleaned_response.append(obj)

        
        return {
            "tweets": cleaned_response,
            "sentiments": get_sentiments_by_tweets_ids(data['tweet_ids'])
        }
    else:
        return "Try POST request"

@app.route("/get_misinfo_tweets_by_country/", methods=['GET', 'POST'])
def get_misinfo_tweets_by_country():
    if request.method == "GET":
        country = request.args.get("country")
        print(country)
        response = list(db['tweets'].find({
            "id": {"$in":misinfo_data},
            "country": re.compile(r""+country+r"(?i)")
        }))

        cleaned_response = []
        for obj in response:
            obj['_id'] = str(obj['_id']) 
            cleaned_response.append(obj)

        
        return {
            "tweets": cleaned_response
            # "sentiments": get_sentiments_by_tweets_ids(data['tweet_ids'])
        }
    else:
        return "Try GET request"


def get_sentiments_by_tweets_ids(tweet_ids):
    response = list(db['tweets'].aggregate([
        {
            '$match': {
                'id': {
                    '$in': tweet_ids
                }
            }
        }, {
            '$group': {
                '_id': '$sentiment', 
                'count': {
                    '$sum': 1
                }
            }
        }
    ]))

    res = {
        "POSITIVE": 0,
        "NEGATIVE": 0,
        "NEUTRAL": 0,
        "MIXED": 0,
    }

    for item in response:
        res[item['_id']] = item['count']
    
    return res

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

# ! CHART API
@app.route("/get_hospitalizations_data/", methods=['GET', 'POST'])
def get_hospitalizations_data():
    if request.method == "GET":
        from_date = request.args.get("from_date")
        till_date = request.args.get("till_date")
        df = df_utils.get_between_dates(df_hospitalization_us, "date", from_date, till_date)
        grouped_data_us = df.groupby("state", axis = 0).sum()
        data = {
            "state": list(grouped_data_us.index)
        }
        data_points = ['hospital_onset_covid','inpatient_beds','inpatient_beds_used','inpatient_beds_used_covid','staffed_adult_icu_bed_occupancy','staffed_icu_adult_patients_confirmed_and_suspected_covid','staffed_icu_adult_patients_confirmed_covid','total_adult_patients_hospitalized_confirmed_and_suspected_covid','total_adult_patients_hospitalized_confirmed_covid','total_pediatric_patients_hospitalized_confirmed_and_suspected_covid','total_pediatric_patients_hospitalized_confirmed_covid','total_staffed_adult_icu_beds','inpatient_beds_utilization','percent_of_inpatients_with_covid','inpatient_bed_covid_utilization','adult_icu_bed_covid_utilization','adult_icu_bed_utilization','geocoded_state','deaths_covid','icu_patients_confirmed_influenza','total_patients_hospitalized_confirmed_influenza','total_patients_hospitalized_confirmed_influenza_and_covid']

        for point in data_points:
            data[point] = list(grouped_data_us[point])
        return data
    else:
        return "Try GET request"   


if __name__ == "__main__":
    sched = BackgroundScheduler(daemon=True)
    sched.add_job(update_country_count,'interval',minutes=60)
    sched.start()
    app.run(host=host, port=port, debug=True)
    