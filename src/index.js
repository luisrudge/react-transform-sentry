export default function enableSentry({ filename, components, imports }) {
  const [React] = imports;

  if (!React || !React.Component) {
    throw new Error('imports[0] for react-transform-sentry does not look like React.');
  }

  return function wrapToCatchErrors(ReactClass, componentId) {
    const wrapThisMethods = [
      'render',
      'componentWillMount',
      'componentDidMount',
      'componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'componentDidUpdate',
      'componentWillUnmount'
    ];
    
    wrapThisMethods.forEach(m => {
      const originalMethod = ReactClass.prototype[m];
      ReactClass.prototype[m] = function tryWrappedMethod() {
        try {
          return originalMethod.apply(this, arguments);
        } catch (err) {
          Raven.captureException(err);
        }
      };
    });

    return ReactClass;
  };
}
