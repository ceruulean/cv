import * as scroll from "./src/includes/smooth-scroll.polyfills.min.js";
import * as Entoyment from "./src/includes/entoyment.js"
import * as Periodic from "./src/includes/periodic.js"
import MicroModal from 'micromodal';


 let jengas = Entoyment.init('jenga-reveal');
// jengas[1].show();
Entoyment.init('dot-menu', 1);
new SmoothScroll('a[href*="#"]',{
  easing:'easeInQuad'
});
Entoyment.init('jagger');

let u = Entoyment.init('underline-reveal', {
  rootMargin: "100px 0 0 0"
});


let blocker = document.getElementById('m-blocker');
MicroModal.init({
  onShow: modal => {blocker.classList.remove('hide')}, // [1]
  onClose: modal => {blocker.classList.add('hide')},
  disableScroll: true, // [5]
  awaitOpenAnimation: false, // [7]
  awaitCloseAnimation: false, // [8]
});
//yes the order matters, entoyment must be first f