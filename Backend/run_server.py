from flask import Flask, request, render_template, json, jsonify
from flask.wrappers import Response
import requests
import argparse
from datetime import date, datetime
import json
from flask_cors import CORS, cross_origin
import pandas as pd


# Setting up DB URL

parser = argparse.ArgumentParser()
parser.add_argument("--host", type=str, required=True)
parser.add_argument("--port", type=int, required=True)

args            = parser.parse_args()
host            = args.host
port            = args.port

period = "daily" # monthly, yearly
spokenLanguage = "en"

app = Flask(__name__)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
app.config['Access-Control-Allow-Origin'] = '*'





@app.route("/country/", methods=['GET', 'POST'])
def get_country_cases():
    if request.method == "GET":
        country = request.args.get("country")
        print(f"COUNTRY : {country}")
        # print(request)
        # data = request.json
        url_world = "https://pomber.github.io/covid19/timeseries.json"

        res_world_count = requests.get(url_world).json()

        df_country_data = pd.DataFrame.from_dict(res_world_count.get(country),orient='columns')
        
        data = {
            "Date":list(df_country_data.date),
            "Confirmed":list(df_country_data.confirmed),
            "Deceased":list(df_country_data.deaths),
            "Recovered":list(df_country_data.recovered)
        }

        # return app.response_class(
        #     response={
        #         "res" : data
        #     },
        #     status=200,
        #     mimetype='application/json'
        # )
        return {
            "data": data
            }
    else:
        return "Try POST request"   



if __name__ == "__main__":    
    app.run(host=host, port=port, debug=True)