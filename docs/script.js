var background = ["#24243e", "#302b63"];
const body = document.getElementsByTagName("body")[0];
const mainColor = document.getElementById("js-mainColor");
const belly = document.getElementById("js-belly");
const wings = document.getElementById("js-wings");
const toes = document.getElementById("js-toes");
const crest = document.getElementById("js-crest");
const col1 = document.getElementById("js-color-1");
const col2 = document.getElementById("js-color-2");
const col3 = document.getElementById("js-color-3");
const col4 = document.getElementById("js-color-4");
const col5 = document.getElementById("js-color-5");

function getQueryStringParam(param) {
  var url = window.location.toString();
  url.match(/\?(.+)$/);
  var params = RegExp.$1;
  params = params.split("&");
  var queryStringList = {};
  for(var i = 0; i < params.length; i++) {
    var tmp = params[i].split("=");
    queryStringList[tmp[0]] = unescape(tmp[1]);
  }
  return queryStringList[param];
}

function updateColorByParam(param) {
  let color = getQueryStringParam(param);
  if (color) {
    updateColorByName(param, color);
  }
}

function updateColorByName(attribute, color) {
  function updateAttribute(attribute) {
    attribute.style.fill = color;
    setTimeout(function(){attribute.classList.remove("fade");}, 700); 
  }
  switch(attribute) {
    case "main":
      updateAttribute(mainColor);
      break;
    case "belly":
      updateAttribute(belly);
      break;
    case "wings":
      updateAttribute(wings);
      break;
    case "toes":
      updateAttribute(toes);
      break;
    case "crest":
      updateAttribute(crest);
      break;
    default:
      console.log("Attribute not implemented: " + attribute);
      console.log("Could not set to color: " + color);
  }
}

expectedParams = ["main", "belly", "wings", "toes", "crest"];
expectedParams.forEach(a => updateColorByParam(a));

function updateMain(picker, string) {
  if (!string) {
  mainColor.style.fill = picker.toHEXString();
    } else {
      // Used when generating random
      mainColor.style.fill = string;
     setTimeout(function(){mainColor.classList.remove("fade");}, 700); 
      
    }
}

function updateBelly(picker, string) {
  if (!string) {
  belly.style.fill = picker.toHEXString();
    } else {
      // Used when generating random
      belly.style.fill = string;
     setTimeout(function(){belly.classList.remove("fade");}, 700); 
    }
}

function updateWings(picker, string) {
  if (!string) {
  wings.style.fill = picker.toHEXString();
    } else {
      // Used when generating random
      wings.style.fill = string;
     setTimeout(function(){wings.classList.remove("fade");}, 700); 
    }
}
function updateToes(picker, string) {
  if (!string) {
  toes.style.fill = picker.toHEXString();
    } else {
      // Used when generating random
      toes.style.fill = string;
     setTimeout(function(){toes.classList.remove("fade");}, 700); 
    }
}
function updateCrest(picker, string) {
  if (!string) {
  crest.style.fill = picker.toHEXString();
    } else {
      // Used when generating random
      crest.style.fill = string;
     setTimeout(function(){crest.classList.remove("fade");}, 700); 
    }
}

function updateBackgroundD(picker, randArray) {
 if (!randArray) {
  background[0] = picker.toHEXString();
  } else {
    background[0] = randArray[0];
  }
  body.style.background =
    "linear-gradient(to right, " +
    background[0] +
    " , " +
    background[1] +
    " , " +
    background[0] +
    ")";
}

function updateBackgroundL(picker, randArray) {
 if (!randArray) {
  background[1] = picker.toHEXString();
  } else {
    background[1] = randArray[1];
  }
  
  body.style.background =
    "linear-gradient(to right, " +
    background[0] +
    " , " +
    background[1] +
    " , " +
    background[0] +
    ")";
}


// Generate random



function generateRandom() {
// dragon  
var red = Math.floor(Math.random() * 256) ;
var green = Math.floor(Math.random() * 256) ;
var blue = Math.floor(Math.random() * 256) ;
// Grad 1
var grad_1_r = Math.floor(Math.random() * 256) ;
var grad_1_g = Math.floor(Math.random() * 256) ;
var grad_1_b = Math.floor(Math.random() * 256) ;
// Grad 2  
var grad_2_r = grad_1_r >= 206 ? grad_1_r : grad_1_r + 50;
var grad_2_g = grad_1_g >= 206 ? grad_1_g : grad_1_g + 50;
var grad_2_b = grad_1_b >= 206 ? grad_1_b : grad_1_b + 50;
  
let hex = rgbToHex(red, green, blue);
let grad_1_hex = rgbToHex(grad_1_r, grad_1_g, grad_1_b);
let grad_2_hex = rgbToHex(grad_2_r, grad_2_g, grad_2_b);
  
let gradient = [grad_1_hex, grad_2_hex];
  
  updateMain(null, hex);
  updateBelly(null, grad_1_hex);
  updateWings(null, grad_2_hex);
  updateBackgroundD(null, gradient);
  updateBackgroundL(null, gradient);
  
    mainColor.classList.add("fade");
    belly.classList.add("fade");
    wings.classList.add("fade");
  
 document.getElementById('js-color-1')
    .jscolor.fromString(hex);
  
 document.getElementById('js-color-2')
    .jscolor.fromString(grad_1_hex);
  
   document.getElementById('js-color-3')
    .jscolor.fromString(grad_2_hex);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
