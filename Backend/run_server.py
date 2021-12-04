from flask import Flask, request
import requests
import argparse
from flask_cors import CORS
import pandas as pd
from apscheduler.schedulers.background import BackgroundScheduler

parser = argparse.ArgumentParser()
parser.add_argument("--host", type=str, required=True)
parser.add_argument("--port", type=int, required=True)

args            = parser.parse_args()
host            = args.host
port            = args.port

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

        df_country_data_till_date['date'] = df_country_data_till_date.date.dt.strftime("%Y-%m-%d")
        df_response_data = df_country_data_till_date
        
        data = {
            "Date":list(df_response_data.date),
            "Confirmed":list(df_response_data.confirmed),
            "Deceased":list(df_response_data.deaths),
            "Recovered":list(df_response_data.recovered)
        }

        return {
            "data": data
            }
    else:
        return "Try POST request"   


def update_country_count():
    print("UPDATED WORLD COUNT")
    global res_world_count 
    res_world_count = requests.get(url_world).json()


if __name__ == "__main__":
    sched = BackgroundScheduler(daemon=True)
    sched.add_job(update_country_count,'interval',minutes=60)
    sched.start()
    app.run(host=host, port=port, debug=True)
    