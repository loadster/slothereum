# Slothereum

This is a demo application for the [Loadster](https://loadster.app) tutorials.

It's a spoof cryptocurrency exchange, that professes to use the blockchain
in some vague hand-wavy kind of way... but peek under the covers and 
you'll discover the truth!

The demo app has two parts: an API and a Vue SPA.

## Running the API

The API is in the `slothereum-api` subdirectory.

To install the npm dependencies and run it:

```
$ cd slothereum-api
$ npm install
$ npm start
```

## Running the Web App

The web app is in the `slothereum-web` subdirectory.

To install the npm dependencies and run it:

```
$ cd slothereum-web
$ npm install
$ npm run serve
```

To open it in your browser, go to http://localhost:5001.

## Contributions

If you wish to contribute to this sillly demo app, please run the linter
first and address inconsistent formatting or possible bugs:

```
$ npm run lint
```
