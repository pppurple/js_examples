const datas = [200, 30, 100, 80];

recursiveFunc = (datas, callback) => {
  let count = 0;
  let done = 0;

  let func = (count) => {
    let data = datas[count];
    // do async job
    setTimeout(() => {
      console.log("wait " + data + " sec.");
      if (++done >= datas.length) {
        callback();
      }
    }, data);

    if (count >= datas.length - 1) {
      return;
    }

    func(count + 1);
  };

  func(count);
};

recursiveFunc(datas, () => console.log("all done!!"));
