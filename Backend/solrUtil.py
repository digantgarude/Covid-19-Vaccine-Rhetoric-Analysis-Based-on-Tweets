import requests as req
from flask import Flask,jsonify,request
import json
import re
from flask_cors import CORS

f = open('processed_tweets.json','rb')
data = json.load(f)

AWS_IP = '3.21.230.103'
core_name = 'IR_P4'
query_url = f"http://{AWS_IP}:8983/solr/{core_name}/select?q=QUERY&q.op=OR&fl=id&wt=json&indent=true&rows=50000"

app = Flask(__name__)

CORS(app)



@app.route('/getTweets', methods = ['GET', 'POST', 'DELETE'])
def top_hashtag():
    request_data = request.get_json()
    if request.method == 'POST':
        if 'query' in request_data:
            query = request_data['query']
           
            #print("inside post")
            url = query_url
            url = url.replace("QUERY", query)
            response = req.get(url).json()
            res_data = response['response']['docs']
            print(len(res_data))
            tweet_dict = []
            for obj in res_data:
                id = obj['id']
                # sentiments['positive'] = sentiments['positive'] +
                tweet_dict.append(data[str(id)])
            
            return jsonify(tweet_dict)

if __name__ == "__main__":
    app.run(debug=True)