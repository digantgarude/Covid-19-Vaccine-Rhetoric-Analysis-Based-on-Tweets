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

url_world = "https://pomber.github.io/covid19/timeseries.json"
res_world_count = requests.get(url_world).json()


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
    