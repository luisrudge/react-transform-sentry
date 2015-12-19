# react-transform-sentry

A [React Transform](https://github.com/gaearon/babel-plugin-react-transform) that catches errors inside React's lifecycle methods and reports to [sentry](https://getsentry.com).

## Installation

First, install the [Babel plugin](https://raw.githubusercontent.com/gaearon/babel-plugin-react-transform):

```
npm install --save-dev babel-plugin-react-transform
```

Then, install the transform:

```
npm install --save-dev react-transform-sentry
```

Then, make sure to [setup sentry](https://getsentry.com/for/react/) in your web page:

```
<script src="https://cdn.ravenjs.com/1.3.0/jquery,native/raven.min.js"></script>
<script>Raven.config('your public dsn').install();</script>
```

Now edit your `.babelrc` to include `extra.babel-plugin-react-transform`.  
It must be an array of the transforms you want to use:

```js
{
  "env": {
    "production": { //only applies when NODE_ENV is set to 'production'
      "plugins": [
        "react-transform"
      ],
      "extra": {
        "react-transform": {
          "transforms": [{
            "transform" : "react-transform-sentry",
            "imports" : ["react"]
          }]
        }
      }
    }
  }
}
```

**It is up to you to ensure that the transform is only enabled when you compile the app in production mode.** The easiest way to do this is to put React Transform configuration inside `env.production` in `.babelrc` and ensure you’re calling `babel` with `NODE_ENV=production`. See [babelrc documentation](https://babeljs.io/docs/usage/babelrc/#env-option) for more details about using `env` option.
