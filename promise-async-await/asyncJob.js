let doAsyncJobWithCallback = (data, callback) => {
  // do async job
  setTimeout(() => {
    console.log("wait " + data + " sec.");
    callback();
  }, data);
};

doAsyncJobWithCallback(200, () => console.log("done"));
