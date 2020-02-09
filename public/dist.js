(function(){'use strict';/*! smooth-scroll v16.1.2 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;0<=--t&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(function(){if("function"==typeof window.CustomEvent)return;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e;})(),(function(){for(var r=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),o=Math.max(0,16-(n-r)),a=window.setTimeout((function(){e(n+o);}),o);return r=n+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e);});})(),(function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e);})("undefined"!=typeof global?global:"undefined"!=typeof window?window:undefined,(function(q){var I={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},F=function(){var n={};return Array.prototype.forEach.call(arguments,(function(e){for(var t in e){if(!e.hasOwnProperty(t))return;n[t]=e[t];}})),n},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===i?r+="\\"+t.toString(16)+" ":r+=128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(a):"\\"+n.charAt(a);}return "#"+r},L=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},x=function(e){return e?(t=e,parseInt(q.getComputedStyle(t).height,10)+e.offsetTop):0;var t;},H=function(e,t,n,o){if(t.emitEvents&&"function"==typeof q.CustomEvent){var a=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:o}});document.dispatchEvent(a);}};return function(o,e){var A,a,O,C,M={};M.cancelScroll=function(e){cancelAnimationFrame(C),C=null,e||H("scrollCancel",A);},M.animateScroll=function(i,c,e){M.cancelScroll();var s=F(A||I,e||{}),u="[object Number]"===Object.prototype.toString.call(i),t=u||!i.tagName?null:i;if(u||t){var l=q.pageYOffset;s.header&&!O&&(O=document.querySelector(s.header));var n,o,a,m,r,d,f,h,p=x(O),g=u?i:(function(e,t,n,o){var a=0;if(e.offsetParent)for(;a+=e.offsetTop,e=e.offsetParent;);return a=Math.max(a-t-n,0),o&&(a=Math.min(a,L()-q.innerHeight)),a})(t,p,parseInt("function"==typeof s.offset?s.offset(i,c):s.offset,10),s.clip),y=g-l,v=L(),w=0,S=(n=y,a=(o=s).speedAsDuration?o.speed:Math.abs(n/1e3*o.speed),o.durationMax&&a>o.durationMax?o.durationMax:o.durationMin&&a<o.durationMin?o.durationMin:parseInt(a,10)),E=function(e,t){var n,o,a,r=q.pageYOffset;if(e==t||r==t||(l<t&&q.innerHeight+r)>=v)return M.cancelScroll(!0),o=t,a=u,0===(n=i)&&document.body.focus(),a||(n.focus(),document.activeElement!==n&&(n.setAttribute("tabindex","-1"),n.focus(),n.style.outline="none"),q.scrollTo(0,o)),H("scrollStop",s,i,c),!(C=m=null)},b=function(e){var t,n,o;m||(m=e),w+=e-m,d=l+y*(n=r=1<(r=0===S?0:w/S)?1:r,"easeInQuad"===(t=s).easing&&(o=n*n),"easeOutQuad"===t.easing&&(o=n*(2-n)),"easeInOutQuad"===t.easing&&(o=n<.5?2*n*n:(4-2*n)*n-1),"easeInCubic"===t.easing&&(o=n*n*n),"easeOutCubic"===t.easing&&(o=--n*n*n+1),"easeInOutCubic"===t.easing&&(o=n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1),"easeInQuart"===t.easing&&(o=n*n*n*n),"easeOutQuart"===t.easing&&(o=1- --n*n*n*n),"easeInOutQuart"===t.easing&&(o=n<.5?8*n*n*n*n:1-8*--n*n*n*n),"easeInQuint"===t.easing&&(o=n*n*n*n*n),"easeOutQuint"===t.easing&&(o=1+--n*n*n*n*n),"easeInOutQuint"===t.easing&&(o=n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n),t.customEasing&&(o=t.customEasing(n)),o||n),q.scrollTo(0,Math.floor(d)),E(d,g)||(C=q.requestAnimationFrame(b),m=e);};0===q.pageYOffset&&q.scrollTo(0,0),f=i,h=s,u||history.pushState&&h.updateURL&&history.pushState({smoothScroll:JSON.stringify(h),anchor:f.id},document.title,f===document.documentElement?"#top":"#"+f.id),"matchMedia"in q&&q.matchMedia("(prefers-reduced-motion)").matches?q.scrollTo(0,Math.floor(g)):(H("scrollStart",s,i,c),M.cancelScroll(!0),q.requestAnimationFrame(b));}};var t=function(e){if(!e.defaultPrevented&&!(0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey)&&"closest"in e.target&&(a=e.target.closest(o))&&"a"===a.tagName.toLowerCase()&&!e.target.closest(A.ignore)&&a.hostname===q.location.hostname&&a.pathname===q.location.pathname&&/#/.test(a.href)){var t,n;try{t=r(decodeURIComponent(a.hash));}catch(e){t=r(a.hash);}if("#"===t){if(!A.topOnEmptyHash)return;n=document.documentElement;}else n=document.querySelector(t);(n=n||"#top"!==t?n:document.documentElement)&&(e.preventDefault(),(function(e){if(history.replaceState&&e.updateURL&&!history.state){var t=q.location.hash;t=t||"",history.replaceState({smoothScroll:JSON.stringify(e),anchor:t||q.pageYOffset},document.title,t||q.location.href);}})(A),M.animateScroll(n,a));}},n=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(A)){var t=history.state.anchor;"string"==typeof t&&t&&!(t=document.querySelector(r(history.state.anchor)))||M.animateScroll(t,null,{updateURL:!1});}};M.destroy=function(){A&&(document.removeEventListener("click",t,!1),q.removeEventListener("popstate",n,!1),M.cancelScroll(),C=O=a=A=null);};return (function(){if(!("querySelector"in document&&"addEventListener"in q&&"requestAnimationFrame"in q&&"closest"in q.Element.prototype))throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";M.destroy(),A=F(I,e||{}),O=A.header?document.querySelector(A.header):null,document.addEventListener("click",t,!1),A.updateURL&&A.popstate&&q.addEventListener("popstate",n,!1);})(),M}}));//Auto Mounty Version

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
      console.log("WTF");
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
    }    header.className = 'title';
    this.root.setAttribute('aria-labelledby', header.id);
    this.header = header;
    return header;
  }
}

class UnderlineReveal extends Reveal{
  constructor(root, IntersectionObsOptions){
    super(root, true);
    root.setAttribute('aria-label', `More Info`);

    //Setup IntersectionObserver
    let auto = root.classList.contains('auto');
    if (auto || !isEmpty(IntersectionObsOptions)){
      let appear = (entries, observer) =>{
        entries.forEach((entry)=>{
          let bottomWindow = entry.boundingClientRect.bottom;
          let bottomDocument = document.body.offsetHeight;
          let rockBottom = (window.innerHeight + window.pageYOffset) >= bottomDocument;
          let showing = entry.intersectionRatio > 0;
          if (rockBottom || showing) {
            this.show();
          } else if (bottomWindow > 0 && !showing && document.activeElement != this.caption){
            this.hide();
          }
        });
      };
      if (auto){
        IntersectionObsOptions = {
          threshold:[0, 1],
          rootMargin: "0px 0px -50% 0px"
        };
      }
      this.observer = new IntersectionObserver(appear, IntersectionObsOptions);

      this.observer.observe(root);
      addClickHandler(root, function(e){
          this.show();
      }.bind(this));
    }

    // CREATE
    let h = this.accessibleHeading();
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
    this.header.onclick = this.toggleHandler;
    this.header.style.cursor = 'pointer';
  }
  show(){
    if (this.active || this.transitioning) return;
    if (this.defer(this.show, this.timing)) return;
    this.active = true;
    this.transitioning = true;
    this.caption.setAttribute('aria-hidden', false);
    this.root.classList.add('extend');
    setTimeout(()=>{
      this.root.style.height = `${this.caption.clientHeight}px`;
      this.transitioning = false;
    }, this.timing);
  }
  hide(){
    if (!this.active || this.transitioning) return;
    if (this.defer(this.hide, this.timing)) return;
    this.active = false;
    this.transitioning = true;
    this.caption.blur();
    this.root.style.height = "4px";
    setTimeout(()=>{
      this.root.classList.remove('extend');
      this.caption.setAttribute('aria-hidden', true);
      this.transitioning = false;
    }, this.timing);
  }
 defer(fn, interval){
    if (this.transitioning === true){
      let c = this;
        setTimeout(()=>{
          fn.call(c, ...arguments);
        }, interval);
      return true;
    } return false
  }
  get toggleHandler(){
    return () => {
      if (!this.active){
        this.show();
      } else {
        this.hide();
      }
    }
  }
}

class JengaReveal extends Reveal{
  constructor(root){
    super(root, true);
    let classes = root.classList;
    for (let c in classes) {
      if (classes[c] == 'top'){
        this.direction = 'top';
        break;
      } else if (classes[c] == 'right'){
        this.direction = 'right';
        break;
      } else if (classes[c] == 'top'){
        this.direction = 'top';
        break;
      } else if (classes[c] == 'bottom'){
        this.direction = 'bottom';
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
    //default open/active
    if (classes.contains('active')){
      this.active = true;
      this.root.classList.remove(this.direction);
      this.note.setAttribute("aria-disabled", false);
      this.button.setAttribute("aria-label", `Close note`);
    } else {
      this.active = false;
    }
    this.button.onclick = this.toggleHandler;
  }

  show(){
    this.root.classList.add('active');
    this.note.setAttribute("aria-disabled", false);
    this.button.setAttribute("aria-label", `Close note`);
    this.root.classList.remove(this.direction);
    setTimeout(()=>{
      this.note.focus();
    }, 1000); // setting the focus makes the CSS transition act weird, so just gonna delay it
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
        query += `,h${q}`;
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
      });
    };

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
        name = node.innerText;
      }
      let a2 = createElementAttr('li');
      a2.appendChild(createElementAttr('span', {class:'ghost'}, name));
      a1.appendChild(a2);
      this.ul.appendChild(a1);
      this.observer.observe(node);
    });

    this.root.appendChild(this.ul);
  }
}

/** Jagger Aside Displays */
class Jagger extends Component{
  constructor(root){
    super(root, true);
    this.sections = root.querySelectorAll('section');
    for (let s of this.sections.values()){
      s.appendChild(createElementAttr('div'));
    }
  }
}


const COMPONENTS = {
  'jenga-reveal' : function(ele){
    return new JengaReveal(ele);
  },
  'underline-reveal' : function(ele, InterObserverOptions){
    return new UnderlineReveal(ele, InterObserverOptions);
  },
  'dot-menu' : function(ele, headingLevel){
    return new DotMenu(ele, headingLevel);
  },
  'jagger': function(ele){
    return new Jagger(ele);
  }
};

/** ALL CLASS Declarations ABOVE*/

function init(){
  let otherargs = [...arguments];
  let classNam = otherargs.shift();
  let comps = document.getElementsByClassName(classNam);
  let objects = [];
  let loopOver = (callback, args) => {
    for (let i = 0; i < comps.length; i++) {
      objects.push(callback(comps.item(i), ...args));
    }
  };
  loopOver(COMPONENTS[classNam], otherargs);
  return objects;
}

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
  for (let en in entries){
    element.setAttribute(entries[en][0], entries[en][1]);
  }
}

function isEmpty(vbl){
  return (vbl === undefined || vbl === null || vbl === "")
}

//Thanks man: https://gist.github.com/gordonbrander/2230317
function randomID(initial) {
  return `${initial}${Math.random().toString(36).substr(2, 9)}`;
}
function a11yClick(event){
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
});
}

/**
 * Gets a :root var value; cleans the endings off of time units for JS use
 * @param {*} varName name of CSS var without hypens
 */
function getCSSVar(varName){
  let val = getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`);
  let intify = (val) => {
    return parseInt(val.match(/\d+/));
  };
  if (/\d+[ms]*[s]+/g.test(val)) { // testing for time units 'ms' and 's'
    return intify(val);
  } else {
    return val;
  }}let programs = [
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
];

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
};

Object.values(sect).forEach(e => {
  e.setAttribute('tabIndex', -1);
  periodic.appendChild(e);
});

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
  });

  uh.innerHTML = text;
  c.appendChild(uh);
};

for (let p in programs){
  createDiv(programs[p][0], programs[p][1],programs[p][2], programs[p][3]);
}
let bTabbable = false;
periodic.addEventListener('click', function(e){
  if (bTabbable) return;
  tabbable(cells);
}, {capture:false});

let childLength = periodic.children.length-1;
let childLength2 = periodic.children[childLength].children.length - 1;

periodic.children[childLength].children[childLength2].addEventListener('focusout', function(e){
  untabbable(cells);
});

function tabbable(eles){
  bTabbable = true;
  eles.forEach((c)=>{
    c.tabIndex = 0;
    c.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      c.children[0].focus();
    });
  });
}

function untabbable(eles){
  eles.forEach((c)=>{
    c.tabIndex = -1;
  });
  bTabbable = false;
}const MicroModal = (() => {

  const FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

  class Modal {
    constructor({
      targetModal,
      triggers = [],
      onShow = () => {},
      onClose = () => {},
      openTrigger = 'data-micromodal-trigger',
      closeTrigger = 'data-micromodal-close',
      disableScroll = false,
      disableFocus = false,
      awaitCloseAnimation = false,
      awaitOpenAnimation = false,
      debugMode = false
    }) {
      // Save a reference of the modal
      this.modal = document.getElementById(targetModal); // Save a reference to the passed config

      this.config = {
        debugMode,
        disableScroll,
        openTrigger,
        closeTrigger,
        onShow,
        onClose,
        awaitCloseAnimation,
        awaitOpenAnimation,
        disableFocus // Register click events only if pre binding eventListeners

      };
      if (triggers.length > 0) this.registerTriggers(...triggers); // pre bind functions for event listeners

      this.onClick = this.onClick.bind(this);
      this.onKeydown = this.onKeydown.bind(this);
    }
    /**
     * Loops through all openTriggers and binds click event
     * @param  {array} triggers [Array of node elements]
     * @return {void}
     */


    registerTriggers(...triggers) {
      triggers.filter(Boolean).forEach(trigger => {
        trigger.addEventListener('click', event => this.showModal(event));
      });
    }

    showModal() {
      this.activeElement = document.activeElement;
      this.modal.setAttribute('aria-hidden', 'false');
      this.modal.classList.add('is-open');
      this.scrollBehaviour('disable');
      this.addEventListeners();

      if (this.config.awaitOpenAnimation) {
        const handler = () => {
          this.modal.removeEventListener('animationend', handler, false);
          this.setFocusToFirstNode();
        };

        this.modal.addEventListener('animationend', handler, false);
      } else {
        this.setFocusToFirstNode();
      }

      this.config.onShow(this.modal, this.activeElement);
    }

    closeModal() {
      const modal = this.modal;
      this.modal.setAttribute('aria-hidden', 'true');
      this.removeEventListeners();
      this.scrollBehaviour('enable');

      if (this.activeElement) {
        this.activeElement.focus();
      }

      this.config.onClose(this.modal);

      if (this.config.awaitCloseAnimation) {
        this.modal.addEventListener('animationend', function handler() {
          modal.classList.remove('is-open');
          modal.removeEventListener('animationend', handler, false);
        }, false);
      } else {
        modal.classList.remove('is-open');
      }
    }

    closeModalById(targetModal) {
      this.modal = document.getElementById(targetModal);
      if (this.modal) this.closeModal();
    }

    scrollBehaviour(toggle) {
      if (!this.config.disableScroll) return;
      const body = document.querySelector('body');

      switch (toggle) {
        case 'enable':
          Object.assign(body.style, {
            overflow: '',
            height: ''
          });
          break;

        case 'disable':
          Object.assign(body.style, {
            overflow: 'hidden',
            height: '100vh'
          });
          break;
      }
    }

    addEventListeners() {
      this.modal.addEventListener('touchstart', this.onClick);
      this.modal.addEventListener('click', this.onClick);
      document.addEventListener('keydown', this.onKeydown);
    }

    removeEventListeners() {
      this.modal.removeEventListener('touchstart', this.onClick);
      this.modal.removeEventListener('click', this.onClick);
      document.removeEventListener('keydown', this.onKeydown);
    }

    onClick(event) {
      if (event.target.hasAttribute(this.config.closeTrigger)) {
        this.closeModal();
        event.preventDefault();
      }
    }

    onKeydown(event) {
      if (event.keyCode === 27) this.closeModal(event);
      if (event.keyCode === 9) this.maintainFocus(event);
    }

    getFocusableNodes() {
      const nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS);
      return Array(...nodes);
    }

    setFocusToFirstNode() {
      if (this.config.disableFocus) return;
      const focusableNodes = this.getFocusableNodes();
      if (focusableNodes.length) focusableNodes[0].focus();
    }

    maintainFocus(event) {
      const focusableNodes = this.getFocusableNodes(); // if disableFocus is true

      if (!this.modal.contains(document.activeElement)) {
        focusableNodes[0].focus();
      } else {
        const focusedItemIndex = focusableNodes.indexOf(document.activeElement);

        if (event.shiftKey && focusedItemIndex === 0) {
          focusableNodes[focusableNodes.length - 1].focus();
          event.preventDefault();
        }

        if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
          focusableNodes[0].focus();
          event.preventDefault();
        }
      }
    }

  }
  /**
   * Modal prototype ends.
   * Here on code is responsible for detecting and
   * auto binding event handlers on modal triggers
   */
  // Keep a reference to the opened modal


  let activeModal = null;
  /**
   * Generates an associative array of modals and it's
   * respective triggers
   * @param  {array} triggers     An array of all triggers
   * @param  {string} triggerAttr The data-attribute which triggers the module
   * @return {array}
   */

  const generateTriggerMap = (triggers, triggerAttr) => {
    const triggerMap = [];
    triggers.forEach(trigger => {
      const targetModal = trigger.attributes[triggerAttr].value;
      if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = [];
      triggerMap[targetModal].push(trigger);
    });
    return triggerMap;
  };
  /**
   * Validates whether a modal of the given id exists
   * in the DOM
   * @param  {number} id  The id of the modal
   * @return {boolean}
   */


  const validateModalPresence = id => {
    if (!document.getElementById(id)) {
      console.warn(`MicroModal: \u2757Seems like you have missed %c'${id}'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.');
      console.warn(`%cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<div class="modal" id="${id}"></div>`);
      return false;
    }
  };
  /**
   * Validates if there are modal triggers present
   * in the DOM
   * @param  {array} triggers An array of data-triggers
   * @return {boolean}
   */


  const validateTriggerPresence = triggers => {
    if (triggers.length <= 0) {
      console.warn(`MicroModal: \u2757Please specify at least one %c'micromodal-trigger'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.');
      console.warn(`%cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<a href="#" data-micromodal-trigger="my-modal"></a>`);
      return false;
    }
  };
  /**
   * Checks if triggers and their corresponding modals
   * are present in the DOM
   * @param  {array} triggers   Array of DOM nodes which have data-triggers
   * @param  {array} triggerMap Associative array of modals and their triggers
   * @return {boolean}
   */


  const validateArgs = (triggers, triggerMap) => {
    validateTriggerPresence(triggers);
    if (!triggerMap) return true;

    for (var id in triggerMap) validateModalPresence(id);

    return true;
  };
  /**
   * Binds click handlers to all modal triggers
   * @param  {object} config [description]
   * @return void
   */


  const init = config => {
    // Create an config object with default openTrigger
    const options = Object.assign({}, {
      openTrigger: 'data-micromodal-trigger'
    }, config); // Collects all the nodes with the trigger

    const triggers = [...document.querySelectorAll(`[${options.openTrigger}]`)]; // Makes a mappings of modals with their trigger nodes

    const triggerMap = generateTriggerMap(triggers, options.openTrigger); // Checks if modals and triggers exist in dom

    if (options.debugMode === true && validateArgs(triggers, triggerMap) === false) return; // For every target modal creates a new instance

    for (var key in triggerMap) {
      let value = triggerMap[key];
      options.targetModal = key;
      options.triggers = [...value];
      activeModal = new Modal(options); // eslint-disable-line no-new
    }
  };
  /**
   * Shows a particular modal
   * @param  {string} targetModal [The id of the modal to display]
   * @param  {object} config [The configuration object to pass]
   * @return {void}
   */


  const show = (targetModal, config) => {
    const options = config || {};
    options.targetModal = targetModal; // Checks if modals and triggers exist in dom

    if (options.debugMode === true && validateModalPresence(targetModal) === false) return; // stores reference to active modal

    activeModal = new Modal(options); // eslint-disable-line no-new

    activeModal.showModal();
  };
  /**
   * Closes the active modal
   * @param  {string} targetModal [The id of the modal to close]
   * @return {void}
   */


  const close = targetModal => {
    targetModal ? activeModal.closeModalById(targetModal) : activeModal.closeModal();
  };

  return {
    init,
    show,
    close
  };
})();let jengas = init('jenga-reveal');
// jengas[1].show();
init('dot-menu', 1);
new SmoothScroll('a[href*="#"]',{
  easing:'easeInQuad'
});
init('jagger');

let u = init('underline-reveal', {
  rootMargin: "100px 0 0 0"
});


let blocker = document.getElementById('m-blocker');
MicroModal.init({
  onShow: modal => {blocker.classList.remove('hide');}, // [1]
  onClose: modal => {blocker.classList.add('hide');},
  disableScroll: true, // [5]
  awaitOpenAnimation: false, // [7]
  awaitCloseAnimation: false, // [8]
});
//yes the order matters, entoyment must be first f
}());