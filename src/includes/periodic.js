import {createElementAttr} from './entoyment';

let programs = [
["html5","k",``, true],
["figma","k","", true],
["adoai","k","", true],
["inkscape","k","",],

["w3c","i","", true],
["adops","i","",],
["gimp","i","",],

["adoindesign","t","",],
["eclipse", "t","",],

["adopremiere","t","",],
["visualcode", "t","",],

["directus","t","",],
["php","t","",],

["git","x","",],
["java","x","",],
["sql","x","",],
["apache", "x","",],

["empty","o","",],
["gulp","o","",],
["electron","o","",],

["vue","h","", true],
["react","h","", true],
["webpack","h","", true],

["css3","n","", true],
["js","n","",true],
["ts","n","",],
["node","n","",],
]

// "k . . . . . . n"
// "k i . . . o h n"
// "k i t t t o h n"
// "k i t t t o h n"
// ". x x x x . . .";

let periodic = document.getElementById('periodic');
periodic.setAttribute('tabIndex', 0);
periodic.setAttribute('role', `figure`);
periodic.setAttribute('aria-label', `My Toolset`);

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
  e.setAttribute('tabIndex', -1);
  periodic.appendChild(e);
})

let cells = [];

let createDiv = (name, block, text, fav) => {
  let c = createElementAttr('div',
  {
    id: name,
    class: (fav ? 'fav': null),
    tabIndex: -1,
    role: `cell`,
    'aria-label':name,
  });
  sect[block].appendChild(c);
  cells.push(c);

  let uh = createElementAttr('aside', {
    'aria-label': `aside`,
  })

  uh.innerHTML = text;
  c.appendChild(uh);
}

for (let p in programs){
  createDiv(programs[p][0], programs[p][1],programs[p][2], programs[p][3]);
}
let bTabbable = false;
periodic.addEventListener('click', function(e){
  if (bTabbable) return;
  tabbable(cells);
}, {capture:false})

let childLength = periodic.children.length-1;
let childLength2 = periodic.children[childLength].children.length - 1;

periodic.children[childLength].children[childLength2].addEventListener('focusout', function(e){
  untabbable(cells);
})

function tabbable(eles){
  bTabbable = true;
  eles.forEach((c)=>{
    c.tabIndex = 0;
    c.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      c.children[0].focus();
    })
  });
}

function untabbable(eles){
  eles.forEach((c)=>{
    c.tabIndex = -1;
  });
  bTabbable = false;
}