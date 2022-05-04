
# E-commerce Website

An E-commerce site, with the following features:
1. A Filter which sorts products based on rating, alphabetical order, highest and lowest price and price range.
2. Adding products to basket.
3. A checkout modal.

## Why limited features?
I decided to limit the features on this website as I understood those were the core front-end components that are required within an e-commerce website.

## What I learnt?
Initially when I received data from the Fake Store API I passed the entirety of the data to each necessary function and then proceeded to filter the data.
The issue with this was the application was making API calls everytime there was a new filter applied, resulting in a two part delay of retrieving the data from the API and then applying the filter, I then realised it would be better to store the data within a variable once the page loaded to prevent delay.

Another issue I faced was that any filter applied would take in excess of 5 seconds. To resolve this I decided to limit the data being passed through to each function to only what is necessary for that particular filter this has resulted in filters being applied extremely fast.

As I continued I realised that the Fake Store API had gramatical errors . At first I created functions to deal with these gramatical issues but then realised in a practical setting it is unlikely for the data to contain these sort of errors in the backend/ database.

Additionally the correction of grammar and filter application was leading to exceedingly long times for the products to load on the page.

As such I decided to use the JSON data from the API.

## Attribution
The data used was from the Fake Store API. 
