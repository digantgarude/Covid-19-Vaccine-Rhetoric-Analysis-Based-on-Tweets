from flask import Flask,jsonify,request
import requests as req

#import sentiment_analysis
import json
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
#from pickle5 import pickle

from topic_modelling import convert_to_df_for_lda,train_lda_model
from topic_no_lda import top_tfidf
import re
from flask_cors import CORS

##Replace this with updated json dump
f = open('processed_tweets.json','rb')
data = json.load(f)
AWS_IP = '3.21.230.103'
core_name = 'IR_P4'
query_url = f"http://{AWS_IP}:8983/solr/{core_name}/select?q=QUERY&q.op=OR&fl=id&wt=json&indent=true&rows=50000"



def t_model(ids):

    tweets = []
    word = []

    for id in ids:
        tweets.append(data[id])
    
    tweet_df = convert_to_df_for_lda(tweets)

    ldamodel = train_lda_model(num_topics=10, passes=10, iterations=50, transform_text=tweet_df.text_en)

    for i in range(len(ldamodel.print_topics())):
        word.append(re.sub(r"[^a-zA-Z0-9]","",ldamodel.print_topics()[i][1].split('+')[0].split('*')[1]))

    return word


def new_search(id):
    return data[id]



def hashtags(ids):
    hashtag_list = {}
    for id in ids:
        try:
            hashtag_list[str(id)] = data[str(id)]['hashtags']
        except:
            continue
    text = []
    for key in hashtag_list.keys():
        hashtag_list[key] = ' '.join(hashtag_list[key])
        text.append(hashtag_list[key])
    #print(text)
    tfidf = TfidfVectorizer()
    tfs = tfidf.fit_transform(text)
    importance = np.argsort(np.asarray(tfs.sum(axis=0)).ravel())[::-1]
    tfidf_feature_names = np.array(tfidf.get_feature_names())
    scores = np.sort(np.asarray(tfs.sum(axis=0)).ravel())[::-1]
    return list(tfidf_feature_names[importance[:]]), list(scores) #Returns in sorted order based on tfidf score



app = Flask(__name__)

CORS(app)

@app.route('/new_search', methods = ['GET', 'POST', 'DELETE'])
def user():
    request_data = request.get_json()
    if request.method == 'POST':
        if 'id' in request_data:
            id = request_data['id']
            print("inside post")
            return jsonify(new_search(id))


@app.route('/hashtag', methods = ['GET', 'POST', 'DELETE'])
def top_hashtag():
    request_data = request.get_json()
    if request.method == 'POST':
        if 'id' in request_data:
            ids = request_data['id']
           
            #print("inside post")
            hashtag_list, scores = hashtags(ids)
            hashtags_lst = []
            hashtag_dict = {}
            for index in range(len(hashtag_list)):
                hashtags_lst.append({'name': hashtag_list[index], 'weight':scores[index]/100})

            hashtag_dict['data'] = hashtags_lst
            # hashtag_dict['weight']  = json.dumps(scores)
            hashtag_dict['length'] = len(hashtag_list)

            print('CREATED LIST-------------------------')
            #print(hashtag_dict)
            return jsonify(hashtag_dict)

@app.route('/getTweets', methods = ['GET', 'POST', 'DELETE'])
def get_tweets():
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



@app.route('/topic', methods = ['GET', 'POST', 'DELETE'])
def topic_model():
    request_data = request.get_json()
    if request.method == 'POST':
        if 'id' in request_data:
            ids = request_data['id']
           
            #print("inside post")
            topic_list = t_model(ids)
            
            print('CREATED LIST-------------------------')
            #print(hashtag_dict)
            return jsonify(topic_list)



@app.route('/topic_no_lda', methods = ['GET', 'POST', 'DELETE'])
def topic_nolda():
    request_data = request.get_json()
    if request.method == 'POST':
        if 'id' in request_data:
            ids = request_data['id']
           
            #print("inside post")
            topic_list, scores = top_tfidf(ids,data)
            topic_lst = []
            topic_dict = {}
            if len(topic_list) > 50:
                topic_list  = topic_list[:50]
            for index in range(len(topic_list)):
                topic_lst.append({'name': topic_list[index], 'weight':scores[index]})

            topic_dict['data'] = topic_lst
            # hashtag_dict['weight']  = json.dumps(scores)
            topic_dict['length'] = len(topic_lst)
            
            print('CREATED LIST-------------------------')
            #print(hashtag_dict)
            return jsonify(topic_dict)



        

if __name__ == "__main__":
    app.run(debug=True)


