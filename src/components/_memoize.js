const memoize = function(argFns, fn, config) {
  config = config || {};
  let equalityFn = config.equalityFn || memoize.ArgEquality.identity;

  let didRun = false;
  let lastArgs, lastResult;
  let ctx = this;
  const runFn = args => {
    didRun = true;
    const result = fn.apply(ctx, args);
    lastArgs = args;
    lastResult = result;
    return result;
  };
  return function(...args) {
    const fnArgs = argFns.map(function(argFn) {
      return argFn.apply(ctx, args);
    });
    if (!didRun) {
      return runFn(fnArgs);
    } else {
      const argsSame = fnArgs.every(function(arg, index) {
        return equalityFn(arg, lastArgs[index]);
      });
      if (argsSame) {
        return lastResult;
      } else {
        return runFn(fnArgs);
      }
    }
  };
};

memoize.ArgEquality = {
  identity: function(a, b) {
    return a === b;
  },
};

export default memoize;
