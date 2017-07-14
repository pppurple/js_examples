const datas = [200, 30, 100, 80];

let funcWithPromise = (datas) => {
  return Promise.all(datas.map((data) => {
    return doAsyncJobWithPromise(data);
  }));
};

let doAsyncJobWithPromise = (data) => {
  return new Promise((resolve, reject) => {
    // do async job
    setTimeout(() => {
      console.log("wait " + data + " sec.");
      resolve();
    }, data);
  });
};

funcWithPromise(datas)
  .then(() => {console.log("all done!!")});
