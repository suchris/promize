class Promize {
  constructor(fn) {
    if (fn === undefined) {
      throw Error("Executor Function is undefined!");
    }

    if (typeof fn !== "function") {
      throw Error("Executor Function is not a function!");
    }

    this.state = "pending";
    this.result = undefined;
    this.promizeFns = [];

    this.resolve = function (value) {
      try {
        this.result = this.promizeFns.reduce((acc, fn) => fn(acc), value);
        this.state = "resolved";
        this.then(promizeFns.shift());
      } catch (err) {}
    };

    this.reject = function (err) {
      this.result = err;
      this.state = "rejected";
    };

    this.catch = function (eff) {
      this.reject(err);
    };

    this.then = function (fn) {
      if (this.state === "resloved") {
        try {
          fn(this.resolve, this.reject);
        } catch (err) {
          this.catch(err);
        }
      } else if (this.state === "rejected") {
        this.rejectFn = rejectFn;
      } else {
        this.promizeFns.push(fn);
      }
      return this;
    };

    try {
      fn(this.resolve, this.reject);
    } catch (err) {
      this.catch(err);
    }
  }
}

module.exports = Promize;
