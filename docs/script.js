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

const attributeNames = ["main", "belly", "wings", "toes", "crest"];
const attributes = {
  main:
  { 
    name: "main",
    pickerName: "#js-color-1",
    pickerElt: col1,
    colorElt: mainColor,
    defaultColor: "#444F96",
  },
  belly:
  { 
    name: "belly",
    pickerName: "#js-color-2",
    pickerElt: col2,
    colorElt: belly,
    defaultColor: "#83C9D4",
  },
  wings:
  { 
    name: "wings",
    pickerName: "#js-color-3",
    pickerElt: col3,
    colorElt: wings,
    defaultColor: "#FFFFFF",
  },
  toes:
  { 
    name: "toes",
    pickerName: "#js-color-4",
    pickerElt: col4,
    colorElt: toes,
    defaultColor: "#E3BEA6",
  },
  crest:
  { 
    name: "crest",
    pickerName: "#js-color-5",
    pickerElt: col5,
    colorElt: crest,
    defaultColor: "#FFFFFF",
  },
}


attributeNames.forEach(name => {
  att = attributes[name];
  att.picker = new JSColor(att.pickerName, {
    onChange:'pickerInput(this, "' + att.name + '", true)',
    onInput:'pickerInput(this, "' + att.name + '")'
  });
});

setColorsByUrl();

window.addEventListener('popstate', readState);

function setColorsByUrl() {
  const initialSearchParams = new URLSearchParams(window.location.search);
  attributeNames.forEach(name => {
    const paramVal = initialSearchParams.get(name);
    if (paramVal) {
      updateColorByName(name, '#' + paramVal);
    } else {
      updateColorByName(name, attributes[name].defaultColor);
    }
  });
}

function readState (ev) {
  setColorsByUrl();
}

function updateColorByName(name, color, save) {
  picker = attributes[name].pickerElt;
  attributes[name].colorElt.style.fill = color;
  setTimeout(function(){attributes[name].colorElt.classList.remove("fade");}, 700); 
  if (picker && picker.jscolor) {
    picker.jscolor.fromString(color);
  }
  if (save) {
    updateUrl(name, color.slice(1,7));
  }
}

function pickerInput(picker, attribute, save) {
  const color = picker.toHEXString();
  updateColorByName(attribute, color, save);
}

// Generate random

function generateRandom() {
  const searchParams = new URLSearchParams(window.location.search);
  attributeNames.forEach(name => {
    var red = Math.floor(Math.random() * 256) ;
    var green = Math.floor(Math.random() * 256) ;
    var blue = Math.floor(Math.random() * 256) ;
    const hex = '#' + rgbToHex(red, green, blue);
    updateColorByName(name, hex);
    searchParams.set(name, hex);
    attributes[name].colorElt.classList.add("fade");
  })
  window.history.pushState("design", "", '?' + searchParams.toString());
};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
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
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(param, value);
  window.history.pushState("design", "", '?' + searchParams.toString());
};
