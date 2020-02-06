//Auto Mounty Version
class Component{
  constructor(root, tabbable){
    this.root = root;
    if (tabbable) {
      this.root.setAttribute('tabIndex', 0);
    }
  }
}

class Reveal extends Component{
  constructor(root, tabbable, activated){
    super(root, tabbable);
    this.active = (activated? true: false);
  }
  show(){} //Abstract method need to implement
  hide(){} //Abstract method; needs implement
  get toggleHandler(){
    return () => {
      if (!this.active){
        this.show();
        this.active = true;
      } else {
        this.hide();
        this.active = false;
      }
    }
  }
  accessibleHeading(header){
    if (!header) header = this.root.querySelector("h1, h2, h3, h4, h5, h6");
    if (!header) throw new Error(`${this.constructor.name} requires a Header tag within its section`);
    let hid = randomID("r");
    header.setAttribute('id', hid);
    header.className = 'title';
    this.root.setAttribute('aria-labelledby', hid);
    return header;
  }
}

class UnderlineReveal extends Reveal{
  constructor(root, header){
    super(root, true);
    root.setAttribute('aria-label', 'More Info');
    // CREATE
    let h = this.accessibleHeading(header);
    root.removeChild(h);
    this.caption = createElementAttr('caption', {"disabled":true,class:'inner'}, root.innerHTML);
    //CLEAR inner
    root.innerHTML = null;
    //APPEND
    root.parentNode.insertBefore(h, root);
    root.appendChild(this.caption);

    this.timing = getCSSVar('underlineRevealTransitionDuration');
    this.transitioning = false;
  }
  show(){
    if (this.defer(this.show, this.timing)) return;
    this.transitioning = true;
    this.caption.setAttribute('disabled', false);
    this.root.classList.add('extend');
    setTimeout(()=>{
      this.root.style.height = `${this.caption.clientHeight}px`;
      this.transitioning = false;
    }, this.timing)
  }
  hide(){
    if (this.defer(this.hide, this.timing)) return;
    this.transitioning = true;
    this.root.style.height = "4px";
    setTimeout(()=>{
      this.root.classList.remove('extend');
      this.caption.setAttribute('disabled', true);
      this.transitioning = false;
    }, this.timing)
  }
 defer(fn, interval){
    if (this.transitioning === true){
      let c = this;
        setTimeout(()=>{
          fn.call(c, ...arguments);
        }, interval)
      return true;
    } return false
  }
}

class JengaReveal extends Reveal{
  constructor(root){
    super(root, true);
    let classes = root.classList;
    console.log(classes.contains('top'));
    for (let c in classes) {
      if (classes[c] == 'top'){
        this.direction = 'top';
        break;
      } else if (classes[c] == 'right'){
        this.direction = 'right';
        break;
      } else if (classes[c] == 'top'){
        this.direction = 'top'
        break;
      } else if (classes[c] == 'bottom'){
        this.direction = 'bottom'
        break;
      }
    }
    if (!this.direction) this.direction = 'left';
    classes.add(this.direction);


    //CREATE ELEMENTS
    let h = this.accessibleHeading();
    let swatch = createElementAttr('div', {class: "swatch"});
    this.note = root.querySelector('.inner');
    if (!this.note) throw new Error(`${this.constructor.name} requires a child element with class '.inner'`);

    setAttributes(this.note, {role:"note", "aria-disabled":true, 'tabIndex':-1});
    this.root.removeChild(this.note);
    this.button = createElementAttr('button', {
      class:`tabby ${this.direction}`,
      "aria-label": `Open to read`,
      'tabIndex':0,
    });

    //APPEND ELEMENTS
    swatch.appendChild(this.note);
    swatch.appendChild(this.button);
    this.root.appendChild(swatch);

    // EVENTS
    this.active = false;
    this.button.onclick = this.toggleHandler;
  }

  show(){
    this.root.classList.remove(this.direction);
    this.root.classList.add('active');
    this.note.setAttribute("aria-disabled", false);
    this.note.focus();
    this.button.setAttribute("aria-label", `Close note`);
  }
  hide(){
    this.slide(this.direction);
  }

  slide(direction){
    this.root.classList.add(direction);
    this.root.classList.remove('active');
    this.note.setAttribute("aria-disabled", true);
    this.button.setAttribute("aria-label", `Open to read`);
  }
}

const COMPONENTS = {
  'jenga-reveal' : function(ele){
    return new JengaReveal(ele);
  },
  'underline-reveal' : function(ele){
    return new UnderlineReveal(ele);
  },
}

/** ALL CLASS Declarations ABOVE*/

function init(classNam){
  let comps = document.getElementsByClassName(classNam);

  let loopOver = (callback) => {
    for (let i = 0; i < comps.length; i++) {
      callback(comps.item(i));
    }
  }

  loopOver(COMPONENTS[classNam]);
}

let appear = (entries, observer) =>{
  entries.forEach((entry)=>{
    let topWindow =  entry.boundingClientRect.top;
    let topDocument = entry.rootBounds.height;
    let bottomWindow = entry.boundingClientRect.bottom;
    let bottomDocument = document.body.offsetHeight;
    let rockBottom = (window.innerHeight + window.pageYOffset) >= bottomDocument;
    let showing = entry.intersectionRatio > 0;
    if (bottomWindow > 0 && !showing){
      u.hide();
    } else if (rockBottom || (topWindow < (topDocument + topWindow / 2)) && showing) {
      u.show();
    }
  })
}

let observer = new IntersectionObserver(appear, {
  threshold:[0, 1]
});


init('jenga-reveal');

let u = new UnderlineReveal(document.querySelector('.underline-reveal'));
observer.observe(u.root);


// ================================================
// =========== UTILITY FUNCTIONS
// ================================================

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

function setAttributes(element, attrList){
  let entries = Object.entries(attrList);
  for (en in entries){
    element.setAttribute(entries[en][0], entries[en][1]);
  }
}

function isEmpty(vbl){
  return (vbl === undefined || vbl === null)
}

//Thanks man: https://gist.github.com/gordonbrander/2230317
function randomID(initial) {
  return `${initial}${Math.random().toString(36).substr(2, 9)}`;
};

function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function delayDisable(time, ele) {
  setTimeout(()=>{
    ele.setAttribute('disabled', true);
  }, time);
}

function a11yClick(event){
  console.log('wtf')
  if(event.type === 'keydown'){
      var code = event.charCode || event.keyCode;
      if((code === 32)|| (code === 13)){ //Space and Enter
          return true;
      }
  }
  else{
      return false;
  }
}
/**
 * DO NOT USE IF YOUR ELEMENT ALREADY HAS A tabIndex or is a button/native html spec!!!! (causes conflicts)
 * @param {*} ele element to attach event
 * @param {*} callback function to deal with event
 */
function addClickHandler(ele, callback = (event) => {}){
  ele.addEventListener('click', function(event) {
      callback(event);
  });
  ele.addEventListener('keydown', function(event) {
    if (!a11yClick(event)) return;
    callback(event);
})
}

/**
 * Gets a :root var value; cleans the endings off of time units for JS use
 * @param {*} varName name of CSS var without hypens
 */
function getCSSVar(varName){
  let val = getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`);
  let intify = (val) => {
    return parseInt(val.match(/\d+/));
  }
  if (/\d+[ms]*[s]+/g.test(val)) { // testing for time units 'ms' and 's'
    return intify(val);
  } else {
    return val;
  };
}