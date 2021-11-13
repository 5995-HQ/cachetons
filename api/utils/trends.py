
import pandas as pd                        
from pytrends.request import TrendReq
pytrend = TrendReq()


def top_searches_usa():
    """
    Returns a list of the top searches in the US.
    """
    df = pytrend.trending_searches(pn='united_states')
    return df.values
