const syncCallbacker = (fn1, fn2, ...args) => {
  if (fn1 === undefined || fn2 === undefined) {
    throw "require lease 2 arguments";
  }
  if (typeof fn1 !== "function") {
    throw "1st argument is not a function";
  }
  if (typeof fn2 !== "function") {
    throw "2nd argument is not a function";
  }
  return [fn2, ...args].reduce((acc, fn) => fn(acc), fn1());
};

const asyncCallbacker = (fn1, fn2, ...args) => {
  if (fn1 === undefined || fn2 === undefined) {
    throw "require lease 2 arguments";
  }
  if (typeof fn1 !== "function") {
    throw "1st argument is not a function";
  }
  if (typeof fn2 !== "function") {
    throw "2nd argument is not a function";
  }

  let fns = [fn2, ...args].reverse();
  let doneFn = fns.reduce(
    (acc, fn) => (v) => fn(v, acc),
    () => "done"
  );
  return fn1(0, doneFn);
};

module.exports = { syncCallbacker, asyncCallbacker };
