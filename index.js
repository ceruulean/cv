import "./src/includes/smooth-scroll.polyfills.min.js";
import * as Entoyment from "./src/includes/entoyment.js";
//import "./src/includes/periodic.js";
import 'social-icon/dile-social-icon.js';
import '@riverside/form-serialize';
import MicroModal from 'micromodal';


Entoyment.init('jagger');
Entoyment.init('dot-menu', 1);
new SmoothScroll('a[href*="#"]',{
  easing:'easeInQuad'
});
/*
 let jengas = Entoyment.init('jenga-reveal');
let u = Entoyment.init('underline-reveal', {
  threshold:[0,1],
});
*/

// function loadSrc(ele, callback) {
//   new Promise((resolve, reject) => {
//     let req = new XMLHttpRequest();
//     req.onload = () => resolve(req.responseText);
//     req.onerror = () => reject(req.statusText);
//     req.open("GET", ele.dataset.src, true);
//     req.setRequestHeader('Content-type', 'text/html');
//     req.send();
//   }).then((res) => {
//     callback(...arguments);
//   }).catch(err=>{
//     console.log(err);
//   })
// }

// function observeLazyLoaders(){
//   let removePlaceholder = (ele) =>{
//     ele.classList.add('transition');
//     setTimeout(()=>{
//       ele.classList.remove('transition');
//       setTimeout(()=>{
//         ele.classList.remove('placeholder');
//       })
//     }, 500)
//   }

//   let onintersect = (entries, observer) => {
//     entries.forEach(entry=>{
//       if (entry.isIntersecting) {
//         let ele = entry.target;
//         loadSrc(ele, function(){
//           ele.src = ele.dataset.src;
//           ele.onload = removePlaceholder(ele);
//         });
//         // no more lazy load observation
//         ob.unobserve(entry.target);
//       }
//     })
//   }
//   let ob = new IntersectionObserver(onintersect, {
//     threshold:[0,0.10,0.25,0.5,0.8,1]
//   })

//   let lazie = document.querySelectorAll('.lazy');
//   for (let l of lazie.values()){
//     ob.observe(l);
//   };
// }

// observeLazyLoaders();

let blocker = document.getElementById('m-blocker');
MicroModal.init({
  onShow: (modal, trigger) => {
    blocker.classList.remove('hide');
    modal.focus();
    document.body.classList.add('noscroll');
  }, // [1]
  onClose: modal => {
    blocker.classList.add('hide')
    modal.focus();
    document.body.classList.remove('noscroll');
  },
  disableScroll: false, // [5]
  awaitOpenAnimation: false, // [7]
  awaitCloseAnimation: false, // [8]
});
//yes the order matters, entoyment must be first f

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
let modal3Div = document.getElementById('modal3').querySelector('div');
// window.onscroll = throttle(function(e){
//   let distance = modal3.getBoundingClientRect().bottom;
//   let ratio = window.innerHeight / distance;
//   modal3Div.style.backgroundPosition = `0% ${-5*ratio}vh`;
// }, 150)


const form = document.getElementById('contactform');
const validatorMsgArea = document.getElementById('validation');
const loader = document.getElementById('loader');
form.addEventListener('submit', async function(e){ onContactSubmit(e)});

async function onContactSubmit(e) {
  e.preventDefault();
let urlStr = serialize(form);
urlStr += "&subject=contactdefault"

  new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.open("POST", "/scripts/send_email.php", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onload = () => resolve(req.responseText);
    req.onerror = () => reject(req.statusText);
    req.send(urlStr);
    loader.classList.add('loading')
  }).then(res=>{
    validatorMsgArea.innerHTML = `<h2>Sent!</h2>`
    validatorMsgArea.className = "show"
    loader.classList.remove('loading')
    setTimeout(()=>{
      validatorMsgArea.className = "";
    }, 4000)
  }).catch(err=>{
    validatorMsgArea.className = "show"
    validatorMsgArea.innerHTML = `<h2>Error</h2> :${err}`
    loader.classList.remove('loading')
    console.log(err)
    setTimeout(()=>{
      validatorMsgArea.className = "";
    }, 4000)

  })

}