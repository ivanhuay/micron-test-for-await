let data;
const limit = 100;
function getResource(){
  return new Promise((res)=>{
        setTimeout(()=>res({resourseTitle:'example'}), 5);
  });
}

module.exports = {
  beforeAll: () => {
    data = {
      [Symbol.asyncIterator]() {
        return {
          i: 0,
          next() {
            if (this.i < limit) {
              this.i++;
              return getResource()
                  .then((value)=>({value, done: false}));
            }
            return Promise.resolve({ done: true });
          }
        };
      }
    };
  },
  test: async() => {
    for await (let prom of data) {
    }
  }
}
