function convert(source){
  return source && source.replace(/hello/gi,'HELLO');
}

module.exports = function(content){
  return convert(content);
}