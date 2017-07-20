const datas = [200, 30, 100, 80];

let loop = (max, callback) => {
  let count = 0;
  return () => {
    count++;
    if (count >= max) {
      callback();
      return;
    }
  };
};

let funcWithClosure = (datas, callback) => {
  let myLoop = loop(datas.length, callback);
  for (let i = 0; i < datas.length; i++) {
    let data = datas[i];
    doAsyncJob(data, myLoop);
  }
};

let doAsyncJob = (data, loop) => {
  // do async job
  setTimeout(() => {
    console.log("wait " + data + " sec.");
    loop();
  }, data);
};

funcWithClosure(datas, () => console.log("all done!!"));
