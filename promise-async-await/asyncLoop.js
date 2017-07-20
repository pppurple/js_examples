const datas = [200, 30, 100, 80];

let func = (datas) => {
  for (let i = 0; i < datas.length; i++) {
    let data = datas[i];
    doAsyncJob(data);
  }
};

let doAsyncJob = (data) => {
  // do async job
  setTimeout(() => {
    console.log("wait " + data + " sec.");
  }, data);
};

func(datas);
