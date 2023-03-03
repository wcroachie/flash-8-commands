!function(){

  function flipSymbol(){
    var dom     = fl.getDocumentDOM();
    var item    = dom.timelines[0].layers[0].frames[0].elements[0];
    // var matrix  = degToMatrix(deg);
    // matrix.tx   = item.matrix.tx;
    // matrix.ty   = item.matrix.ty;
    var matrix = {
      a : -item.matrix.a,
      b : item.matrix.b,
      c : item.matrix.c,
      d : item.matrix.d,
      tx : item.matrix.tx,
      ty : item.matrix.ty,
    }
    item.matrix = matrix;
  }

  flipSymbol();

}();
