
# GET tweets by ids:

> POST: http://0.0.0.0:8080/get_tweets_by_ids/

REQ:
```json
{
 "tweet_ids": ["1441070799998226434", "1441064459372404745"]
}
```

RES:
```json
{
  "tweets": [
    {
      "_id": "61ae4eb800c6b5e0359a8ee7",
      "_version_": "1717983815791542272",
      "country": "USA",
      "geolocation": [
        "King City"
      ],
      "id": "1441070799998226434",
      "sentiment": "NEUTRAL",
      "sentiment_score": 0.87540495,
      "text_en": "If you're looking for a job in clinical trials in central jersey, holla at ya girllll",
      "tweet_date": "2021-09-23T16:00:00Z",
      "tweet_lang": "en",
      "tweet_text": "If you're looking for a job in clinical trials in central jersey, holla at ya girllll",
      "verified": false
    },
    {
      "_id": "61ae4eb800c6b5e0359a8ee8",
      "_version_": "1717983818568171520",
      "country": "USA",
      "id": "1441064459372404745",
      "replied_to_tweet_id": "1440780256101552129",
      "replied_to_user_id": "1326192020289953792",
      "reply_text": "No one ever insinuated that it does? Get out of here with that bullshit miss-information! \"Today, Phizer and BioNTech announced that their new experimental COVID vaccine is % effective in preventing infections\".",
      "sentiment": "NEGATIVE",
      "sentiment_score": 0.96630126,
      "text_en": "No one ever insinuated that it does? Get out of here with that bullshit miss-information! \"Today, Phizer and BioNTech announced that their new experimental COVID vaccine is % effective in preventing infections\".",
      "tweet_date": "2021-09-23T16:00:00Z",
      "tweet_emoticons": [
        "xp"
      ],
      "tweet_lang": "en",
      "tweet_text": "@ClearSk57308474 @5omni @OttawaHealth No one ever insinuated that it does?  Get out of here with that bullshit miss-information!  \"Today, Phizer and BioNTech announced that their new experimental COVID 19 vaccine is 95% effective in preventing infections\". https://t.co/5pfoUsrIrZ",
      "tweet_urls": [
        "https://t.co/5pfoUsrIrZ"
      ],
      "verified": false
    }
  ]
}
```