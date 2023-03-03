
  /*
   * weird little thing i noticed while playing around with flash 8 - 
   * calling window or this will give you a copy of the global scope that is
   * read-only, but there is a workaround. you can actually add properties
   * to the global scope to be used across both commands and tools by doing
   * the following:
   *                     (function(){return this})()
   *
   * the above expression only works if this iife is enclosed within another
   * iife like so:
   * 
   *   !function(){
   * 
   *     // code you want to stay private goes in here obviously
   *
   *     //...
   *
   *     // write a property to the global scope to be read by other commands or tools
   *     (function(){return this})().myProperty = myValue;
   *
   *     //...
   *
   *     // do not return anything!!
   *
   *   }()
   *
   * anyways, i am not sure why this is. actionscript is weird. 
   *
   */


!function(){

  
  (function(){return this})().__globalRotation = ((function(){return this})().__globalRotation||0) - 15;

  function degToMatrix(deg){
    var radians = deg * (Math.PI / 180);
    var matrix = {};
    matrix.a = Math.cos(radians);
    matrix.b = Math.sin(radians);
    matrix.c = -matrix.b;
    matrix.d = matrix.a;
    matrix.tx = 0;
    matrix.ty = 0;
    return matrix;
  }

  function rotateSymbol(deg){
    var dom     = fl.getDocumentDOM();
    var item    = dom.timelines[0].layers[0].frames[0].elements[0];
    var matrix  = degToMatrix(deg);
    matrix.tx   = item.matrix.tx;
    matrix.ty   = item.matrix.ty;
    item.matrix = matrix;
  }

  rotateSymbol((function(){return this})().__globalRotation);

}();
