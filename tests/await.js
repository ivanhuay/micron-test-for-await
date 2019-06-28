const limit = 100;
function getResource(){
  return new Promise((res)=>{
        setTimeout(()=>res({resourseTitle:'example'}), 5);
  });
}
module.exports = {
  test: async() => {
    for (var i = 0; i < limit; i++) {
      let elm = await getResource();
    }
  }
}
