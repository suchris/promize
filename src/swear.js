class Swear {
  constructor(fn, error = null) {
    this.fn = fn;
    this.handled = false;
    this._error = error;
  }

  _resolve(data) {
    this._data = this._fnSuccess(data);
  }

  _reject(err) {
    this._error = err;
    if (this._fnFailure) {
      this._fnFailure(err);
      this.handled = true;
    }
  }

  then(fnSuccess, fnFailure) {
    this._fnSuccess = fnSuccess;
    this._fnFailure = fnFailure;
    this.fn(this._resolve.bind(this), this._reject.bind(this));

    return new Swear(
      (resolve) => {
        resolve(this._data);
      },
      !this.handled ? this._error : null
    );
  }

  catch(fnCatch) {
    this._fnCatch = fnCatch;
    if (!this.handled && this._error && this._fnCatch) {
      this._fnCatch(this._error);
    }
  }
}

const swear = new Swear((resolve, reject) => {
  resolve("I swear");
});

swear
  .then((data) => {
    return `${data}, by the Moon`;
  })
  .then((data) => {
    return `${data}, and the stars`;
  })
  .then((data) => {
    return `${data}, and the sun`;
  })
  .then((data) => console.log(data));
