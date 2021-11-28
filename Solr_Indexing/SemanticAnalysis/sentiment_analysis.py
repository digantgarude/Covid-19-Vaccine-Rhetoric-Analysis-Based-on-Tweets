# from Solr_Indexing.SemanticAnalysis.cred import AWS_IP_DG
import boto3
import pysolr
# from cred import aws_access_key_id, aws_secret_access_key, CORE_NAME_FETCH, AWS_IP
import pickle
from tqdm import tqdm

class SentimentAnalysis:
    def __init__(self):
        self.client = boto3.client('comprehend')
        self.solr_url = None
        self.connection = None
        self.tweets = []
        
    def connect(self, CORE_NAME_FETCH, AWS_IP):
        self.solr_url = f'http://{AWS_IP}:8983/solr/'
        self.connection = pysolr.Solr(self.solr_url + CORE_NAME_FETCH, always_commit=True, timeout=5000000)

    def get_tweets(self, query_params='*:*', filters = '*' , no_of_rows = 100000):
        self.tweets = list(self.connection.search(q=query_params,**{
            'rows': no_of_rows,
            'fl': filters 
        }))
        return self.get_tweets


    def get_sentiment(self, tweet):
        # print(f"Lang : {tweet['tweet_lang']}")
        response = self.client.batch_detect_sentiment(
                TextList=[
                    tweet['tweet_text'],
                ],
                LanguageCode=tweet['tweet_lang']
            )
        sentiment =  response["ResultList"][0]["Sentiment"]
        sentiment_score = response["ResultList"][0]['SentimentScore'][sentiment.capitalize()]

        return sentiment, sentiment_score

    def perform_analysis(self):
        self.modified_tweets = []
        counter = 0
        file_count = 0
        current_tweets = []
        for tweet in tqdm(self.tweets):
            if tweet['tweet_lang'] not in ["en", "hi", "es"]:
                continue
            sentiment, sentiment_score = self.get_sentiment(tweet)
            tweet["sentiment"] = sentiment
            tweet["sentiment_score"] = sentiment_score
            del tweet["_version_"]
            self.modified_tweets.append(tweet)
            current_tweets.append(tweet)

            if counter % 100 == 0:
                current_tweets = []
                with open(f"./data/tweets_{file_count}.pkl", "wb") as f:
                    pickle.dump(current_tweets, f, protocol=pickle.HIGHEST_PROTOCOL)
        return self.modified_tweets

    def upload_modified_tweets(self):
        for doc in tqdm(self.modified_tweets):
            self.connection.add(doc)

