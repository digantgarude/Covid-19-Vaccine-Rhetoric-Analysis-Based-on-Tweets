import pandas as pd

import gensim
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import re


def convert_to_df_for_lda(tweets):
    filter_only_english =[]
    for data in tweets:
        if data['tweet_lang'] == "en" and 'text_en' in data.keys():
            filter_only_english.append(data)
    tweets_data = [[data['id'], data['text_en']] for data in filter_only_english]
    if(len(tweets_data))==0:
        return pd.DataFrame()
        

    df = pd.DataFrame(tweets_data, columns=["id","text_en"])
    return df

def train_lda_model(passes=10,iterations=10,num_topics=10, transform_text= None):
    # Use CountVectorizor to find three letter tokens, remove stop_words, 
    # remove tokens that don't appear in at least 20 documents,
    # remove tokens that appear in more than 20% of the documents
    
    vect = CountVectorizer(min_df=0, max_df=0.5, stop_words='english', 
                        token_pattern='(?u)\\b\\w\\w\\w+\\b')
    # Fit and transform

    X = vect.fit_transform(transform_text)
    

    # Convert sparse matrix to gensim corpus.
    corpus = gensim.matutils.Sparse2Corpus(X, documents_columns=False)
    
    # Mapping from word IDs to words (To be used in LdaModel's id2word parameter)
    id_map = dict((v, k) for k, v in vect.vocabulary_.items())
    
    
    # Use the gensim.models.ldamodel.LdaModel constructor to estimate 
    # LDA model parameters on the corpus, and save to the variable `ldamodel`

    ldamodel = gensim.models.LdaMulticore(corpus=corpus, id2word=id_map, passes=passes,iterations=iterations,
                                                random_state=5, num_topics=num_topics, workers=4)
    return ldamodel


