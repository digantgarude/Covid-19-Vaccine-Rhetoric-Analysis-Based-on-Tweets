from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

def top_tfidf(ids,data):
    text = []
    for id in ids:
        try:
            text.append(data[id]['text_en'])
        except:
            continue
    
    tfidf = TfidfVectorizer(analyzer='word' , stop_words='english')
    tfs = tfidf.fit_transform(text)
    importance = np.argsort(np.asarray(tfs.sum(axis=0)).ravel())[::-1]
    
    tfidf_feature_names = np.array(tfidf.get_feature_names())
    #print(importance,tfidf_feature_names)
    
    return tfidf_feature_names[importance[:]] #Returns top 10

