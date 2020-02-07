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
    if (isEmpty(header.getAttribute('id'))){
      let hid = randomID("r");
      header.setAttribute('id', hid);
    };
    header.className = 'title';
    this.root.setAttribute('aria-labelledby', header.id);
    return header;
  }
}

class UnderlineReveal extends Reveal{
  constructor(root, header){
    super(root, true);
    root.setAttribute('aria-label', `More Info`);
    if (root.classList.contains('auto')){
      
      let appear = (entries, observer) =>{
        entries.forEach((entry)=>{
          let bottomWindow = entry.boundingClientRect.bottom;
          let bottomDocument = document.body.offsetHeight;
          let rockBottom = (window.innerHeight + window.pageYOffset) >= bottomDocument;
          let showing = entry.intersectionRatio > 0;
          if (bottomWindow > 0 && !showing && document.activeElement != this.caption){
            this.hide();
          } else if (rockBottom ||  showing) {
            this.show();
          }
        })
      }

      this.observer = new IntersectionObserver(appear, {
        threshold:[0, 1],
        rootMargin: "0px 0px -50% 0px"
      });

      this.observer.observe(root);
      addClickHandler(root, function(e){
          this.show();
      }.bind(this))
    }
    // CREATE
    let h = this.accessibleHeading(header);
    root.removeChild(h);
    this.caption = createElementAttr('caption',
    {"aria-hidden":true,
      class:'inner',
    tabIndex: 0}, root.innerHTML);
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
    this.caption.setAttribute('aria-hidden', false);
    this.root.classList.add('extend');
    setTimeout(()=>{
      this.root.style.height = `${this.caption.clientHeight}px`;
      this.transitioning = false;
    }, this.timing)
  }
  hide(){
    if (this.defer(this.hide, this.timing)) return;
    this.transitioning = true;
    this.caption.blur();
    this.root.style.height = "4px";
    setTimeout(()=>{
      this.root.classList.remove('extend');
      this.caption.setAttribute('aria-hidden', true);
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
    this.root.classList.add('active');
    this.note.setAttribute("aria-disabled", false);
    this.button.setAttribute("aria-label", `Close note`);
    this.root.classList.remove(this.direction);
    setTimeout(()=>{
      this.note.focus();
    }, 1000) // setting the focus makes the CSS transition act weird, so just gonna delay it
  }
  hide(){
    this.slide(this.direction);
    this.note.blur();
  }

  slide(direction){
    this.root.classList.add(direction);
    this.root.classList.remove('active');
    this.note.setAttribute("aria-disabled", true);
    this.button.setAttribute("aria-label", `Open to read`);
  }
}

/**
 * headingLevels is an optional int anywhere from 1-n for which headings (h1 - hn) should autogenerate a menu link
 */
class DotMenu extends Component{
  constructor(root, headingLevels){
    super(root, true);
    this.ul = createElementAttr('ul');
    this.active = null;

    //on default only <h1> become links
    let query = "h1";
    if (headingLevels > 1) {
      for (let q = 2; q <= headingLevels; q++){
        query += ` h${q}`;
      }
    }
    
    //Get anchors     
    this.anchors = document.querySelectorAll(query);

    // IntersectionObserver init
    
    let appear = (entries, observer) =>{
      entries.forEach((entry)=>{
        let correLink = this.ul.children[entry.target.getAttribute('index')];

          let dTop = entry.boundingClientRect.top;
        if (dTop > 0) { //has gone below the viewport
          correLink.classList.remove('visited');
        } else {
          correLink.classList.add('visited');
        }
        if ((entry.intersectionRatio > 0.5)) {
          if (this.active) {
            correLink.classList.add('visited');
            this.active.classList.remove('active');
          }
          this.active = correLink;
          this.active.classList.add('active');
        }
      })
    }

    this.observer = new IntersectionObserver(appear, {
      threshold:[0, 0.5, 1],
     rootMargin: "0% 0px -50% 0px"
    });


    this.anchors.forEach((node, index)=>{
      if (isEmpty(node.getAttribute('id'))){
        node.setAttribute('id', randomID('n'));
      }
      node.setAttribute('index', index);
      let a1 = createElementAttr('a', {href:`#${node.id}`});

      let name = node.getAttribute('name');
      if (isEmpty(name)){
        name = node.innerText
      }
      let a2 = createElementAttr('li');
      a2.appendChild(createElementAttr('span', {class:'ghost'}, name))
      a1.appendChild(a2);
      this.ul.appendChild(a1);
      this.observer.observe(node);
    })

    this.root.appendChild(this.ul);
  }
}

const COMPONENTS = {
  'jenga-reveal' : function(ele){
    return new JengaReveal(ele);
  },
  'underline-reveal' : function(ele){
    return new UnderlineReveal(ele);
  },
  'dot-menu' : function(ele){
    return new DotMenu(ele);
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



init('jenga-reveal');
init('dot-menu');
var scroll = new SmoothScroll('a[href*="#"]',{
  easing:'easeInQuad'
});

let u = new UnderlineReveal(document.querySelector('.underline-reveal'));


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
  return (vbl === undefined || vbl === null || vbl === "")
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