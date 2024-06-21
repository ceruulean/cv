function isEmpty(vbl){
  return (vbl === undefined || vbl === null || vbl === "")
}

function setAttributes(element, attrList){
  let entries = Object.entries(attrList);
  for (let en in entries){
    element.setAttribute(entries[en][0], entries[en][1]);
  }
}

/**
 * Creates elements and can set attributes with an object
 * Example: createElementAttr("div", {class:"myClass", tabIndex: 0}, "Sample Text")
 * @param {String} element - Element name
 * @param {Object} attrList - Object with key value pairs of attributes
 * @param {*} innards - inner HTML
 */
 function createElementAttr(element, attrList, innards){
  let result = document.createElement(element);
  if (!isEmpty(attrList)) {
    setAttributes(result, attrList);
  }
  if (!isEmpty(innards)) {
    result.innerHTML = innards;
  }
  return result;
}

let programs = [
["html5","k","Accessibility in HTML5","/cvage/portfolio/accessibility"],
["figma","k","",],
["adoai","k","Wordless Help Manual", "/cvage/portfolio/wordless"],
["inkscape","k","",],

["w3c","i","",],
["adops","i","",],
["gimp","i","",],

["adoindesign","t","",],
["eclipse", "t","",],

["word","t","Port forwarding user guide","/cvage/portfolio/how-to-port-forwarding/"],
["visualcode", "t","",""],

["directus","t","",],
["node","t","",],

["git","x","","https://github.com/ceruulean"],
["java","x","",],
["sql","x","",],
["linkedin", "x","","https://www.linkedin.com/in/dcwu/"],

["powershell","o","","/cvage/portfolio/powershell/"],
["gulp","o","",""],
["adopremiere","o","",],


["python","h","", "/cvage/portfolio/python"],
["xxx","h","", ""],
["webpack","h","",],

["css3","n","",""],
["js","n","JavaScript project","/cvage/portfolio/js/"],
["ts","n","",],
["vue","n","Vue project", "/cvage/portfolio/js#3d-editor"],
]

// "k . . . . . . n"
// "k i . . . o h n"
// "k i t t t o h n"
// "k i t t t o h n"
// ". x x x x . . .";

let periodic = document.getElementById('periodic');
//periodic.setAttribute('tabIndex', 0);
periodic.setAttribute('role', `figure`);
periodic.setAttribute('aria-labelledby', `caption1`);

let sect = {
  k : createElementAttr('div',
  {class:`gk`, role:`column`}),
 i : createElementAttr('div', {class:`gi`,role:`column`}),
t : createElementAttr('div', {class:`gt`,role:`rowgroup`}),
o : createElementAttr('div', {class:`go`,role:`column`}),
 h : createElementAttr('div', {class:`gh`,role:`column`}),
n : createElementAttr('div', {class:`gn`,role:`column`}),
x : createElementAttr('div', {class:`gx`,role:`row`}),
}

Object.values(sect).forEach(e => {
  //e.setAttribute('tabIndex', -1);
  periodic.appendChild(e);
})

let cells = [];


let caption = "";

let createDiv = (name, block, text, link) => {
  let c = createElementAttr('div',
  {
    id: link? name : '',
    // class: (fav ? 'fav': null),
   // tabIndex: -1,
    role: `cell`,
    'aria-label':name,
  });
  sect[block].appendChild(c);
  cells.push(c);

  if (link) {
    let uh = createElementAttr('a', {
      'aria-label': `aside`,
      'href': (link? link : "#"),
      'title': (text? text : name)
    })
    // uh.innerHTML = text;
    c.appendChild(uh);
  }
  caption += ` ${name}`;
}

for (let p in programs){
  createDiv(programs[p][0], programs[p][1],programs[p][2], programs[p][3]);
}


periodic.appendChild(createElementAttr('caption', {id: "caption1"}, caption));
// let bTabbable = false;
// periodic.addEventListener('click', function(e){
//   if (bTabbable) return;
//   tabbable(cells);
// }, {capture:false})

// let childLength = periodic.children.length-1;
// let childLength2 = periodic.children[childLength].children.length - 1;

// periodic.children[childLength].children[childLength2].addEventListener('focusout', function(e){
//   untabbable(cells);
// })

// function tabbable(eles){
//   bTabbable = true;
//   eles.forEach((c)=>{
//     c.tabIndex = 0;
//     c.addEventListener('click', function(e){
//       e.preventDefault();
//       e.stopPropagation();
//       c.children[0].focus();
//     })
//   });
// }

// function untabbable(eles){
//   eles.forEach((c)=>{
//     c.tabIndex = -1;
//   });
//   bTabbable = false;
// }