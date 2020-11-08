"use strict"

const LOADERGRAPHIC = '/static/loader.svg'
const GALLERYROOT = document.getElementById("galleries");

class Gallery{
  constructor(selector){
    this.items = [];
    if (selector) {
      this.root = document.querySelector(selector);
      let existingItems = this.root.querySelectorAll('.dgallery-item');

      existingItems.forEach((item) => {
        let n = item.querySelector('img');
        this.addItem(n.src, item);
      })
    } else {
      this.root = Gallery.createDiv('dgallery');
    }
    this.current_i = 0;

    // this.__bind(Gallery.OVERLAY, 'click', this.close);
    // this.__bind(Gallery.CLOSE, 'click', this.close);

    // this.__bind(Gallery.NEXT, 'click', this.next);
    // this.__bind(Gallery.PREV, 'click', this.prev);

    this.__bind(this.root, 'keydown', this.__galleryKeyHander);
  }

  static createDiv(classN){
    let newDiv = document.createElement("div");
    newDiv.classList.add(classN);
    return newDiv;
  }

  static KEYHANDLER
  static OVERLAYHANDLER
  static CLOSEHANDLER
  static NEXTHANDLER
  static PREVHANDLER


  __bind(target, listener, fn){
    let namefn = fn.bind(this)
    target.addEventListener(listener, namefn);
    return namefn;
  }

  __registerKeys(){
    Gallery.KEYHANDLER = this.__keyHandler.bind(this);
    document.addEventListener('keydown', Gallery.KEYHANDLER);
  }

  __keyHandler(e){
      let k = e.key;
      if (k == "ArrowLeft"){
        //previous
        this.prev();
      } else if (k == "ArrowRight" || k == " " || k == "Spacebar") {
        //next
        e.stopPropagation();
        e.preventDefault();
        this.next();
      } else if (k == "Escape"){
        //close
        this.close();
      }
  }

  __unregisterKeys(){
    document.removeEventListener('keydown', Gallery.KEYHANDLER);
  }

  addItem(src, node, alt){
    let newItem = new GalleryItem(src, alt, node);
    this.items.push(newItem);
    let index = this.items.length - 1;
    let context = this;

    let fn = function(){
      context.open(index);
      context.current_i = index;
    };
    newItem.node.addEventListener('click', fn);
    newItem.node.addEventListener('keydown', function(e){
      let k = e.key;
      if (k == "Enter" || k == " " || k == "Spacebar"){
        e.stopPropagation();
        e.preventDefault();
        fn();
      }
    });

    return newItem;
  }

  __show(index){
    Gallery.IMAGE.setAttribute('src', LOADERGRAPHIC);
    let i = new Image();
    let s = this.items[index].src;
    i.onload = function(){
      Gallery.IMAGE.setAttribute('src', s);
    }
    i.src = s
  }

  open(index){
    if (!index) index = 0;
    this.__show(index);
    Gallery.OVERLAY.classList.add("show");
    Gallery.MODAL.classList.add("show");
    this.__registerKeys();
    Gallery.MODAL.focus();
    document.body.style.overflow = "hidden";
  
    Gallery.OVERLAYHANDLER = this.__bind(Gallery.OVERLAY, 'click', this.close);
    Gallery.CLOSEHANDLER = this.__bind(Gallery.CLOSE, 'click', this.close);
    Gallery.NEXTHANDLER = this.__bind(Gallery.NEXT, 'click', this.next);
    Gallery.PREVHANDLER = this.__bind(Gallery.PREV, 'click', this.prev);
  }

  close(){
    Gallery.OVERLAY.classList.remove("show");
    Gallery.MODAL.classList.remove("show");
    this.__unregisterKeys()
    this.items[this.current_i].node.focus();
    document.body.style.overflow = "auto";

    Gallery.OVERLAY.removeEventListener('click', Gallery.OVERLAYHANDLER);
    Gallery.CLOSE.removeEventListener('click',Gallery.CLOSEHANDLER);
    Gallery.NEXT.removeEventListener('click', Gallery.NEXTHANDLER);
    Gallery.PREV.removeEventListener('click', Gallery.PREVHANDLER);
  }

  next(){
    let i = indexNextHelper(this.current_i, this.items.length - 1);
    this.__show(i);
    this.current_i = i;
  }

  prev(){
    let i = indexPrevHelper(this.current_i, this.items.length - 1);
    this.__show(i);
    this.current_i = i;
  }

  get rowCount(){
   // let w = this.items[0].node.getBoundingClientRect().right - this.items[0].node.getBoundingClientRect().left;
   let w = this.items[0].node.offsetWidth;
    let x = Math.floor(this.root.offsetWidth / w);
    return x
  }

  get colCount(){
    //let h = this.items[0].node.getBoundingClientRect().bottom - this.items[0].node.getBoundingClientRect().top;
    let h = this.items[0].node.offsetHeight;
    let y = Math.round(this.root.offsetHeight / h);
    return y;
  }

  get galleryFocusInd(){
    return Array.from(this.root.children).indexOf(document.activeElement)
  }

  __galleryKeyHander(e){
      let k = e.key;
      if (k == "ArrowLeft"){
        //previous
        let ni = this.galleryFocusInd;
        ni = indexPrevHelper(ni, this.items.length - 1);
        this.items[ni].node.focus();
      } else if (k == "ArrowRight"){
        let ni = this.galleryFocusInd;
        ni = indexNextHelper(ni, this.items.length - 1);
        this.items[ni].node.focus();
      } else if (k == "ArrowUp"){
        let rc = this.rowCount;
        let cc = this.colCount;
        e.preventDefault();
        let ni = this.galleryFocusInd;
        if (ni < rc) { // first row
          ni += rc*(cc - 1);
          if (ni >= this.items.length){
            ni -= rc;
          }
        } else {
            ni -= rc;
        }
        this.items[ni].node.focus();
      } else if (k == "ArrowDown"){
        e.preventDefault();
        let ni = this.galleryFocusInd;
        let rc = this.rowCount;
        let cc = this.colCount;
        let suppTotal = rc*cc //supposed total;
        let lastrowCheck = suppTotal - rc;
        if (ni >= lastrowCheck) { // last row

          let missing = suppTotal - this.items.length;

          ni = (ni + rc - this.items.length) - missing;
          if (ni < 0){
            ni = 0;
          }
        } else {
          if (ni + rc > this.items.length - 1){
            ni -= rc*(cc - 2);
          } else {
            ni += rc;
          }
        }
        this.items[ni].node.focus();
      }
  }
}

function indexNextHelper(current, max){
  let c = current;
  if (c >= (max)){
    c = 0;
  } else {
    c += 1;
  }
  return c;
}

function indexPrevHelper(current, max){
  let c = current;
  if (c <= 0){
    c = max;
  } else {
    c -= 1;
  }
  return c;
}

Gallery.OVERLAY = document.querySelector(".overlay");
Gallery.CLOSE = document.querySelector(".close");
Gallery.NEXT = document.querySelector(".next");
Gallery.PREV = document.querySelector(".prev");
Gallery.MODAL = document.querySelector(".modal");
Gallery.IMAGE = document.getElementById("image");

class GalleryItem{
  constructor(fullSRC, alt, ele){
    this.src = fullSRC;
    this.node = ele;
    if (!ele) {this.node = GalleryItem.render(fullSRC, alt)}
  }

  static thumbnailer(fullSRC){
      if (fullSRC == null || fullSRC == undefined || fullSRC == "") {return};
      if (fullSRC.includes("http")) {
        fullSRC = fullSRC.substring(fullSRC.lastIndexOf("/")+1, fullSRC.length);
      }
      return "https://api.the-gale.com/thumbnail/_/200/200/crop/good/"+fullSRC;
  }

  static render(fullSRC, altText, thumbnailSRC){
    let newItem = Gallery.createDiv('dgallery-item');
    newItem.setAttribute('tabIndex', 0);
    let newImg = document.createElement('img');
    newImg.alt = altText;
    newImg.classList.add('lazy');
    newImg.setAttribute('data-src', fullSRC);
    if (!thumbnailSRC) {
      newImg.src = GalleryItem.thumbnailer(fullSRC);
    } else {
      newImg.src = thumbnailSRC;
    }
    newItem.appendChild(newImg);
    return newItem;
  }

  appendTo(target){
    target.appendChild(this.node);
  }
}


let g = new Gallery('.dgallery');
let fetchedItems = [];
getItems();

function getItems(){
  fetch(`https://api.the-gale.com/_/items/static_pages?filter[static_slug][eq]=gallery&offset=0`)
  .then(response => response.json())
  .then(data => {
    let temp = data.data[0].code.split(/[\r\n]+/);
    let currentGallery = null;
    temp.map(ea => {
      let header = parseMarkdown(ea);
      if (header !== undefined && header !== null) {
        currentGallery = new Gallery()
        let newH = document.createElement(header.h);
        newH.innerHTML = header.text;
        GALLERYROOT.appendChild(newH);
        GALLERYROOT.appendChild(currentGallery.root);
      } else {
        if (arrayI.length == arrayC.length){
          let newI = currentGallery.addItem(arrayI.shift(), null, arrayC.shift());
          newI.appendTo(currentGallery.root);
        }
      }
    })

  });
}


var arrayI = [];
var arrayC = [];

function parseMarkdown(string) {

      var obj;
      if (string.includes("###") ) {
        var obj={h: "h3", text: string.replace("###", "").trim() }
        return obj;
      } else if (string.includes("##") ) {
          var obj={h: "h2", text: string.replace("##", "").trim() }
          return obj
      } else if ((string.includes("[") )) {
        let url = string.substring(string.indexOf("[") + 1, string.indexOf("]"));
        arrayI.push(url);
        if ((string.includes("(") )) {
        let caption = string.substring(string.indexOf("(") + 1, string.lastIndexOf(")"));
        arrayC.push(caption);
        }
      } else if ((string.includes("(") )) {
        let caption = string.substring(string.indexOf("(") + 1, string.lastIndexOf(")"));
        arrayC.push(caption);
      }
}