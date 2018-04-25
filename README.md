# slothereum

This is a demo application for the [Loadster](https://www.loadsterperformance.com) tutorials.

To install the npm dependencies:

```
$ npm install
```

To run the server:

```
$ npm start
```

To open it in your browser, go to http://localhost:3000.

## Development

The project source is broken into two directories: `backend` and `frontend`.

The backend is an Express server with an in-memory data store and several API endpoints.
The Express server also serves up static content for the front end.

The frontend is HTML + VueJS. The Vue components are embedded in the index.html file as x-templates.
If this were a larger project we might have a build/uglification pipeline but we have so far resisted the temptation.

Before committing, please run the linter to be apprised of inconsistent formatting or possible bugs:

```
$ npm run lint
```

To automatically fix any fixable linting issues:

```
$ npm run lintfix
```
