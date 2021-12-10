from flask import Flask,jsonify,request

import pysolr

#import sentiment_analysis
import json
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
#from pickle5 import pickle

from topic_modelling import convert_to_df_for_lda,train_lda_model
from topic_no_lda import top_tfidf
import re


##Replace this with updated json dump
f = open('processed_tweets_v5.json','rb')
data = json.load(f)



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
    
    return list(tfidf_feature_names[importance[:]]) #Returns in sorted order based on tfidf score



app = Flask(__name__)

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
            hashtag_list = hashtags(ids)
            hashtag_dict = {}
            hashtag_dict[len(hashtag_list)] = json.dumps(hashtag_list)
            print('CREATED LIST-------------------------')
            #print(hashtag_dict)
            return jsonify(hashtag_dict)



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
            topic_list = top_tfidf(ids,data)
            
            print('CREATED LIST-------------------------')
            #print(hashtag_dict)
            return jsonify(list(topic_list))



        

if __name__ == "__main__":
    app.run(debug=True)


