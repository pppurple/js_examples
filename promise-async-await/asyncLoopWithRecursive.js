const datas = [200, 30, 100, 80];

recursiveFunc = (datas, callback) => {

  let func = (count) => {
    let data = datas[count];
    // do async job
    setTimeout(() => {
      console.log("wait " + data + " sec.");
    }, data);

    if (count >= datas.length - 1) {
      callback();
      return;
    }

    func(count + 1);
  };

  func(0);
};

recursiveFunc(datas, () => console.log("all done!!"));
