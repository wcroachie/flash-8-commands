!function(){



  /* polyfills */
  Array.prototype.map = function(callbackFn){
    var arr = [];
    for(var i=0;i<this.length;i++){ 
      arr.push(callbackFn(this[i],i,this));
    }
    return arr;
  };
  Array.prototype.forEach = function(callbackFn){
    for(var i=0;i<this.length;i++){
      callbackFn(this[i],i,this);
    }
  };
  Array.prototype.filter = function(callbackFn){
    var arr = [];
    for(var i=0;i<this.length;i++){
      if(callbackFn.call(this,this[i],i,this)){
        arr.push(this[i]);
      }
    }
    return arr;
  };
  Array.prototype.reduce = function(callbackFn,initialValue){
    var accumulator=initialValue;
    for (var i=0;i<this.length;i++){
      if(accumulator!==undefined){
        accumulator=callbackFn.call(undefined,accumulator,this[i],i,this);
      }else{
        accumulator=this[i];
      }
    }
    return accumulator;
  };

  Array.prototype.indexOf = function(searchElement /*, fromIndex */ ){
    var t = Object(this);
    var len = t.length | 0;
    if (len === 0) {
      return -1;
    }
    var n = 0;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n !== n || !isFinite(n)) {
        n = 0;
      } else if (n !== 0) {
        n = Math.floor(n);
        if (n < 0) {
          n = Math.max(len - Math.abs(n), 0);
        }
      }
    }
    for (; n < len; n++) {
      if (n in t && t[n] === searchElement) {
        return n;
      }
    }
    return -1;
  };


  Array.prototype.map.__enumerable      = false;
  Array.prototype.forEach.__enumerable  = false;
  Array.prototype.filter.__enumerable   = false;
  Array.prototype.reduce.__enumerable   = false;
  Array.prototype.indexOf.__enumerable  = false;




  function revealAllPropertyNames(obj){
    try{
      var set = {};
      do{
        for(var key in obj){
          set[key] = "";
        }
        obj = obj.__proto__;
      }while(obj !== null);
      var result = [];
      for(var key in set){
        result.push(key);
      }
      return result;
    }catch(e){
      console.error(e);
    }
  }


  function formatConsoleArg(arg){
    if(typeof arg==="undefined"){ return "<not defined>";
    }else if(arg===undefined){    return "<undefined>";
    }else if(arg===null){         return "<null>";
    }else if(arg===""){           return "<empty string>";
    }else if(typeof arg==="object"){
      var isArray = Object.prototype.toString.call(arg) === "[object Array]";
      var stringToPrint = Object.prototype.toString.call(arg)+"{";
      var propNames = revealAllPropertyNames(arg);
      for(var i=0;i<propNames.length;i++){
        var key   = propNames[i];
        var value = Object.prototype.toString.call(arg) === "[object Tools]" ? "<error getting value>" : arg[key];
        if(typeof value==="undefined"){ stringToPrint += "\n  " + key + " : <not defined>,";
        }else if(value===undefined){    stringToPrint += "\n  " + key + " : <undefined>,";
        }else if(value===null){         stringToPrint += "\n  " + key + " : <null>,";
        }else if(value===""){           stringToPrint += "\n  " + key + " : <empty string>,";
        }else if(typeof value==="object"){
          if(Object.prototype.toString.call(value) === "[object Array]"){
            stringToPrint += "\n  " + key + " : " + (value.length ? " [...]," : "[],");
          }else{
            stringToPrint += "\n  " + key + " : " + Object.prototype.toString.call(value) + " {...},";
          }
        }else if(typeof value==="string"){    
          stringToPrint += "\n  " + key + " : " + value+",";
          
        }else if(typeof value==="function"){
          if(value.__enumerable !== false){
            stringToPrint += "\n  " + key + " : function(){...},";
          }
        }else{
          stringToPrint += "\n  " + key + " : " + String(value) + ",";
        }
      }
      stringToPrint+="\n}";
      if(isArray){
        stringToPrint = "[ "+arg.join(" , ")+" ]";
      }
      return stringToPrint;
    }else if(typeof arg==="string"){
      return arg;
    }else if(typeof arg==="function"){
      return arg.toString();
    }else{
      return String(arg);
    }
  }


  // console polyfill
  var console = {
    log : function(){
      for(var i=0;i<arguments.length;i++){
        var currArg = arguments[i];
        var stringToPrint = formatConsoleArg(currArg);
        fl.trace(">> "+stringToPrint);
      }
    },
    error : function(){
      for(var i=0;i<arguments.length;i++){
        var currArg = arguments[i];
        var stringToPrint = formatConsoleArg(currArg);
        fl.trace("*Error* : "+stringToPrint);
      }
    },
  };



  try{

    var dom  = fl.getDocumentDOM();
    var timeline  = dom.getTimeline();
    var layers    = timeline.layers;


    function goToLayer(n){
      if(typeof n === "number"){
        timeline.currentLayer = n;
      }else{
        throw "arg must be a number";
      }
    }
    function goToFrame(n){
      if(typeof n === "number"){
        timeline.currentFrame = n;
      }else{
        throw "arg must be a number";
      }
    }
    function getCurrentLayer(){
      return timeline.layers[timeline.currentLayer];
    }
    function getCurrentFrame(){
      return timeline.layers[timeline.currentLayer].frames[timeline.currentFrame];
    }


    function updateKeyframes(layer){
      layer.__keyframeIndices = [];
      layer.frames.forEach(function(e){
        if(layer.__keyframeIndices.indexOf(e.startFrame)===-1){
          layer.__keyframeIndices.push(e.startFrame);
        }
      });
      layer.__keyframes = layer.__keyframeIndices.map(function(e){return layer.frames[e]});
    }




    function doForAllDrawings(callback){
      var currentFrame = timeline.currentFrame;
      var currentLayer = timeline.currentLayer;
      timeline.layers.forEach(function(layer){
        updateKeyframes(layer);
        layer.__locked = layer.locked;
        layer.__visible = layer.visible;
        layer.locked = true;
        layer.visible = false;
      });
      timeline.layers.forEach(function(layer){
        layer.locked = false;
        layer.visible = true;
        layer.__keyframeIndices.forEach(function(keyframeIndex){
          goToFrame(keyframeIndex);
          if(typeof callback === "function"){
            callback();
          }else{
            throw "callback must be a function";
          }
        });
        layer.locked = true;
        layer.visible = false;
      });
      timeline.layers.forEach(function(layer){
        layer.locked = layer.__locked;
        layer.visible = layer.__visible;
        delete layer.__locked;
        delete layer.__visible;
      });
      timeline.currentFrame = currentFrame;
      timeline.currentLayer = currentLayer;
    }

    function horizontalFlipAll(){
      doForAllDrawings(function(){
        dom.selectAll();
        dom.setTransformationPoint({
          x: dom.width/2,
          y: dom.height/2,
        });
        dom.scaleSelection(-1,1);
        dom.selectNone();
      });
    }

    function rotateAll(degrees){
      doForAllDrawings(function(){
        dom.selectAll();
        dom.setTransformationPoint({
          x: dom.width/2,
          y: dom.height/2,
        });
        dom.rotateSelection(degrees);
        dom.selectNone();
      });
    }


    rotateAll(15);


  }catch(e){
    console.error(e);
  }
}()