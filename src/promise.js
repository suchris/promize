const basicPromise = new Promise((resolve) => resolve("basicPromise"));

const funcPromise = () => new Promise((resolve) => resolve("funcPromise"));

const chainedPromise = (prom) => {
  return new Promise((resolve) => resolve(prom ? prom() : undefined));
};

const rejectedPromise = () => {
  return new Promise((_, reject) => reject(new Error("rejectedPromise")));
};

module.exports = { basicPromise, chainedPromise, rejectedPromise, funcPromise };
