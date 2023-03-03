function configureTool(){
  var tool = fl.tools.activeTool;
  tool.setToolName("rotateStage");
  tool.setIcon("RotateStage.png");
  tool.setMenuString("RotateStage Tool");
  tool.setToolTip("RotateStage Tool");
  tool.setOptionsFile("RotateStage.xml");
}
function notifySettingsChanged(){}
function setCursor(){
  fl.tools.setCursor(0);
}
function activate(){}
function deactivate(){}

function keyDown(){}
function keyUp(){}
function mouseDoubleClick(){}



// https://flash-powertools.com/understanding-flash-8-cs6-shortcut-file/


var startingCoord   = {x:0,y:0};



function getAngleWithCenter(v){
  // var diffX = v.x - (dom.width/2);
  // var diffY = v.y - (dom.height/2);
  var diffX = v.x;
  var diffY = v.y;
  var angle = -((Math.atan2(diffX,diffY) * (180/Math.PI)) - 180);
  return angle;
}

function roundToNearest15(deg){
  return Math.round(deg/15)*15;
}

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



function mouseDown(e){
  /* store starting coord for usage when drawing starting angle */
  startingCoord = e;
  startingAngle = roundToNearest15(getAngleWithCenter(e));
}




// var globalRotation = 0;
(function(){return this})().__globalRotation = ((function(){return this})().__globalRotation||0);
var frame = 0;

function mouseMove(e){
  frame += 1;
  // run every third frame
  if(frame===3){
    if(fl.tools.mouseIsDown){
      if(fl.tools.shiftIsDown){
        (function(){return this})().__globalRotation = 0;
        rotateSymbol(0);
      }else{
        /* rotate */
        rotateSymbol(-(function(){return this})().__globalRotation);
        (function(){return this})().__globalRotation += roundToNearest15(getAngleWithCenter(e) - startingAngle);
        rotateSymbol((function(){return this})().__globalRotation);
      }
    }
    frame=0;
  }
}

function mouseUp(e){}
