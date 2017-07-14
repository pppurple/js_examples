const datas = [200, 30, 100, 80];

let funcWithAsync = async (datas) => {
  return await Promise.all(datas.map(function(data){
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

let exec = async () => {
  await funcWithAsync(datas);
  console.log("all done!!");
}

exec();

