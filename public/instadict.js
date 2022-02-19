"use strict";

let isTyping = false;
let arr = []; // stores img URLs
let placeholdersOnPage = 0;
let currentPage = 1;

let insertionNode = document.getElementById("cardInsertion");
let searchBar = document.getElementById('searchBar');
let searchLoader = document.getElementById('searchLoader');
let endDetector = document.getElementById('endDetector');

/* 
* Initializing
*/

  loadPlaceholders(40);
  getTagMedia(searchBar.value);

/* 
* Event Listeners
*/
searchBar.onkeydown = function(e) {
  if (isTyping) return;
  isTyping = true;
  searchLoader.classList.add("loading");
}

searchBar.onkeyup = debounce(function() {
    searchLoader.classList.remove("loading");
    isTyping = false;
    searchBarGo();
  }, 1000);

  
window.onresize = throttle(function() {
     console.log("resized!!!")
  }, 2000);


let ObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadPlaceholders(30);
      if ((arr.length - placeholdersOnPage) >= 30) {
        shiftPlaceholders();
      } else {
        currentPage += 1;
        getTagMedia(searchBar.value, currentPage);
      }
    }
  })
}

let observer = new IntersectionObserver(ObserverCallback);
observer.observe(endDetector);


/* 
* Function Limiters
*/

  function debounce(callback, wait) {
    var timeout;
  
    return () => {

      clearTimeout(timeout);
  
      timeout = setTimeout(() => callback(...arguments), wait);
    };
  };



function throttle(callback, interval) {
  var isRunning

  return () => {
    if (!isRunning) {
      isRunning = true;
      callback(...arguments);
      setTimeout(()=> {isRunning = false}, interval);
    }
  }
}

/* 
* Ping Instagram with current value of the searchbar (also cleans the value to have no hashtags/whitespace before querying)
*/
function searchBarGo(){

  endDetector.classList.add("no-display");
  let cleanedValue = searchBar.value.replace(/\s|#/g, '');

  if (cleanedValue.length > 0) {
    insertionNode.innerHTML = ""; // clear

    window.scrollTo(0,0);
    currentPage = 1;
    arr = [];
    loadPlaceholders(40);
    getTagMedia(cleanedValue);
  }
}

/* 
* Inserts however many placeholders you want
*/
function loadPlaceholders(amount){
  let placeholderTemplate = document.importNode(document.getElementById('phCard').content, true);

  for (let i = 0; i < amount; i++) {
    insertionNode.appendChild(placeholderTemplate.cloneNode(true));
  }

  placeholdersOnPage += amount;
}

/* 
* string source - desired image src
* returns an HTML element
*/
function generateCard(source) {

 var guts = `
     <div class="image">
         <img src="${source}">
       </div>
       <div class="content">
         dfasfda
       </div>`

 var card = document.createElement("div");
 card.className = "ui card";
 card.innerHTML = guts;
 
 return card;
}

/* Replaces placeholder elements with final content
* string source - desired image src
* returns an HTML element
*/
function shiftPlaceholders() {

  let max = placeholdersOnPage;

  for (let i = 0; i < max; i++) {
    let e = arr.shift();
    let myImage = new Image();

    myImage.onload = () => {
      let toRemove = document.querySelector(".placeholder.lazy");
      toRemove.parentNode.appendChild(myImage);
      toRemove.remove();

      toRemove = document.querySelector(".placeholder.caption");
      let guts = `<p>${e.caption.substring(0, 70)}${e.caption.length > 70? "..." : ""}</p>`
      toRemove.parentNode.innerHTML = guts;

      placeholdersOnPage -= 1;
      }
    
      myImage.src = e.url;
    }
}

/* 
* string tagName, number page (optional)
* returns a Promise object
*/
function getTagMedia(tagName, page) {

  let req = new XMLHttpRequest();
  return new Promise((resolve, reject)=> {
    if (!page) {
      req.open("get", `https://www.instagram.com/explore/tags/${tagName}/?__a=1`);
    } else {
      req.open("get", `https://www.instagram.com/explore/tags/${tagName}/?__a=1&page=${page}`);
    }
    req.onload = () => resolve(req.responseText);
    req.onerror = () => reject(req.statusText);
    req.send();
  })
  
  .then((response) => {
    let j = JSON.parse(response);
    let pictures = j.graphql.hashtag.edge_hashtag_to_media.edges;

    pictures.forEach((e, i) => {
      try {
        arr.push({url: e.node.display_url, caption: e.node.edge_media_to_caption.edges[0].node.text, shortcode: e.node.shortcode});
      } catch(err) {
        console.log(err + "i dont know why javascript cannot parse it but ok")
      }

    })

    endDetector.classList.remove("no-display");
    shiftPlaceholders();

  }).catch((err) => {
    endDetector.classList.add("no-display");
    insertionNode.innerHTML = `Cannot search for "${searchBar.value}. Error: ${err}."`;
    placeholdersOnPage = 0;
  })
}