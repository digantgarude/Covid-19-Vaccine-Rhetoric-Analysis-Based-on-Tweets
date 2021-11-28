import sentiment_analysis


sa = sentiment_analysis.SentimentAnalysis()

CORE_NAME_FETCH = "IRF21P1"
CORE_NAME_UPLOAD = "BF_Project4"
AWS_IP_FETCH = "3.141.19.45"
AWS_IP_UPLOAD = "3.21.230.103"

sa.connect(CORE_NAME_FETCH, AWS_IP_FETCH)
# 100000
sa.get_tweets(no_of_rows=15)
sa.perform_analysis()
sa.connect(CORE_NAME_UPLOAD, AWS_IP_UPLOAD)
sa.upload_modified_tweets()
