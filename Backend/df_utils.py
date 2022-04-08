import pandas as pd
from pandas.core.frame import DataFrame

def get_reverse_cumsum(df:DataFrame, field:str, suffix:str="daily"):

    df[f'{field}_{suffix}'] = df[f'{field}'].diff().fillna(df[f'{field}'])

    df[f'{field}_{suffix}'].iloc[0] = df[f'{field}_{suffix}'].iloc[1]

    return df 

def get_between_dates(df:DataFrame, date_field:str, start:str, end:str):

    df = df[df[date_field] >= start]
    df = df[df[date_field] <= end]

    return df
