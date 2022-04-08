from flask import Flask,jsonify,request

import pysolr

import sentiment_analysis


CORE_NAME_FETCH = "BF_Project4"
AWS_IP_FETCH = "3.21.230.103"


def search_tweets(query):
    sa = sentiment_analysis.SentimentAnalysis()

    sa.connect(CORE_NAME_FETCH, AWS_IP_FETCH)

    tweets = sa.get_tweets(query_params='tweet_text:'+query)

    return tweets



app = Flask(__name__)

@app.route('/search')
def search():
    query = request.args.get('query')
    d = search_tweets(query)
    print(type(d))
    return jsonify(d)

if __name__ == "__main__":
    app.run(debug=True)


