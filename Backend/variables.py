MONGO_CONNECT_URL="mongodb://localhost:8000/IR_Project"
# DB_URL="mongodb://localhost:27017/mediC"


# =========================App.py=========================

AWS_IP = ''
core_name = 'IR_P4'

query_url = f"http://{AWS_IP}:8983/solr/{core_name}/select?q=QUERY&q.op=OR&fl=id&wt=json&indent=true&rows=50000"

newsUrl = ""

BingUrl = ""
querystring = {
    "q":"",
    "count":"20",
    "sortBy":"relevance",
    "freshness":"Week",
    "originalImg":"true",
    "textFormat":"Raw",
    "safeSearch":"Off"
}

headers = {
    'x-bingapis-sdk': "true",
    'x-rapidapi-host': "bing-news-search1.p.rapidapi.com",
    'x-rapidapi-key': ""
    }