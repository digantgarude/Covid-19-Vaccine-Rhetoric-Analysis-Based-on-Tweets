import boto3
import pysolr
from cred import aws_access_key_id, aws_secret_access_key, CORE_NAME, AWS_IP

client = boto3.client('comprehend')

solr_url = f'http://{AWS_IP}:8983/solr/'
print(f"URL : {solr_url}\nCORE : {CORE_NAME}")
connection = pysolr.Solr(solr_url + CORE_NAME, always_commit=True, timeout=5000000)
print(f"Connection : {connection}")

results = connection.search(q='*:*',**{
    'rows': 100000,
    'fl': '*' 
    
})

results = list(results)
modified_results = []
for tweet in results:
    response = client.batch_detect_sentiment(
        TextList=[
            tweet['tweet_text'],
        ],
        LanguageCode=tweet['tweet_lang']
    )

    sentiment =  response["ResultList"][0]["Sentiment"]
    tweet.sentiment = sentiment
    modified_results.append(tweet)