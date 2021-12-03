import boto3
import pysolr
from tqdm import tqdm

class SolrConnect:
    def __init__(self):
        self.client = boto3.client('comprehend')
        self.solr_url = None
        self.connection = None
        self.tweets = []
        
    def connect(self, CORE_NAME_FETCH, AWS_IP):
        self.solr_url = f'http://{AWS_IP}:8983/solr/'
        self.connection = pysolr.Solr(self.solr_url + CORE_NAME_FETCH, always_commit=True, timeout=50000)

    def get_tweets(self, query_params='*:*', filters = '*' , no_of_rows = 100000):
        self.tweets = list(self.connection.search(q=query_params,**{
            'rows': no_of_rows,
            'fl': filters 
        }))
        return self.tweets

    def upload_modified_tweets(self, docs):
        for doc in tqdm(docs):
            self.connection.add(doc)

