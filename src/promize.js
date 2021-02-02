class Promize {
  constructor(executorFn) {
    if (executorFn === undefined) {
      throw Error("Executor Function is undefined!");
    }

    this.status = "pending";
    this.chain = [];

    this.value = undefined;

    try {
      executorFn(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  errHandler(err) {
    throw new Error(err);
  }

  resolve(val) {
    let value = val;
    try {
      this.chain.forEach((eFn) => {
        value = eFn(value);
      });
    } catch (err) {
      console.log(err);
    }
    this.status = "resolved";
  }

  reject(val) {
    this.status = "rejected";
    this.value = val;
  }

  then(eFn) {
    this.chain.push(eFn);
    return this;
  }

  //   catch(err) {
  //     this.errHandler = err;
  //     return this;
  //   }
}

module.exports = Promize;
