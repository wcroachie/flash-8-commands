!function(){


  (function(){return this})().__globalRotation = ((function(){return this})().__globalRotation||0) + 15;


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
