# Coin Cap

React web application for cryptocurrency.

This project using coinranking and currency api.
This api keys stored in .env file.

## How to run the project

To run this project you should create .env file and put api keys in file.
Then get the followed api keys:

### Get coinranking api key. 

Open https://developers.coinranking.com/api/documentation 
Register and get your api key, then store it in .env file API_KEY variable.

API_KEY='YOUR_API_KEY_HERE'

### Get currency api key.

Open https://freecurrencyapi.com/docs/
Regsiter and get your api key, then store it in .env file API_KEY variable.

CURRENCY_API='YOUR_API_KEY_HERE'

### Create firebase with firesotre.

This app also use firebase store, create a firebase project and put your firebase data in .env file varibales:

FIREBASE_API_KEY='YOUR_API_KEY'\
FIREBASE_AUTH_DOMAIN='YOUR_AUTH_DOMAIN'\
FIREBASE_PROJECT_ID='YOUR PROJECT ID'\
FIREBASE_STORAGE_BUCKET='YOUR_STORAGE_BUCCKET'\
FIREBASE_MESAGGING_SENDER_ID='YOUR_MESAGGING_SENDER_ID'\
FIREBASE_APP_ID='YOUR_APP_ID'\
FIREBASE_MEASUREMENT_ID='YOUR_MEASUREMENT_ID'\

## To run this app use: npm run start

It runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

## To run storybook use: npm run storybook

It runs the storybook in 6006 port.
Open http://localhost:6006 to view it in your browser.
