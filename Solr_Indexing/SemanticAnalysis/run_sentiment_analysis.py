from Solr_Indexing.SemanticAnalysis.indexer import AWS_IP
import sentiment_analysis


sa = sentiment_analysis.SentimentAnalysis()

CORE_NAME_FETCH = "IRF21P1"
CORE_NAME_UPLOAD = "IR_P4"
AWS_IP_FETCH = "3.141.19.45"
AWS_IP_UPLOAD = "3.141.19.45"

sa.connection(CORE_NAME_FETCH, AWS_IP)
sa.get_tweets(no_of_rows=100000)
sa.perform_analysis()
sa.connection(CORE_NAME_UPLOAD, AWS_IP_UPLOAD)
sa.upload_modified_tweets()
