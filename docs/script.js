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

let attributeNames = ["main", "belly", "wings", "toes", "crest"];
let attributes = {
  main:
  { name: "main",
    pickerName: "#js-color-1",
    element: col1,
  },
  belly:
  { name: "belly",
    pickerName: "#js-color-2",
    element: col2,
  },
  wings:
  { name: "wings",
    pickerName: "#js-color-3",
    element: col3,
  },
  toes:
  { name: "toes",
    pickerName: "#js-color-4",
    element: col4,
  },
  crest:
  { name: "crest",
    pickerName: "#js-color-5",
    element: col5,
  },
}

attributeNames.forEach(name => {
  att = attributes[name];
  att.picker = new JSColor(att.pickerName, {
    onChange:'pickerInput(this, "' + att.name + '", true)',
    onInput:'pickerInput(this, "' + att.name + '")'
  });
  updateColorByParam(name)
});

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

function updateColorByName(name, color, updateQuery) {
  function updateAttribute(element) {
    picker = attributes[name].element;
    element.style.fill = color;
    setTimeout(function(){element.classList.remove("fade");}, 700); 
    if (picker && picker.jscolor) {
      picker.jscolor.fromString(color);
    }
  }
  switch(name) {
    case "main":
      updateAttribute(mainColor, attributes["main"].element);
      break;
    case "belly":
      updateAttribute(belly, col2);
      break;
    case "wings":
      updateAttribute(wings, col3);
      break;
    case "toes":
      updateAttribute(toes, col4);
      break;
    case "crest":
      updateAttribute(crest, col5);
      break;
    default:
      console.error("Attribute not implemented: " + name);
      console.error("Could not set to color: " + color);
  }
  if (updateQuery) {
    updateUrl(name, color.slice(1,7));
  }
}

function pickerInput(picker, attribute, updateParams) {
  let color = picker.toHEXString();
  updateColorByName(attribute, color, updateParams);
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
  
  updateColorByName("main", hex, true);
  updateColorByName("belly", grad_1_hex, true);
  updateColorByName("wings", grad_2_hex, true);
  
    mainColor.classList.add("fade");
    belly.classList.add("fade");
    wings.classList.add("fade");
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function share() {
  /* Get the text field */
  var url = window.location.toString();

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(url);

  /* Alert the copied text */
  alert("Copied the text: " + url);
}

function updateUrl(param, value) {
  var searchParams = new URLSearchParams(window.location.search);
  searchParams.set(param, value);
  window.history.pushState("design", "", '?' + searchParams.toString());
};
