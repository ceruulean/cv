"use strict"

const TAU = Zdog.TAU;
const offWhite = '#FED';
const gold = '#EA0';
const garnet = '#C25';
const eggplant = '#636';
const mainColor = '#d11d1d';
const secColor = '#276be3'
const faceColor = '#fffefa';
const beakColor = '#2f302b'
const beakColor0 = '#deddd5'
const innerWingColor = '#ead23a'
const tongueColor = '#DB7093'
const ORIGIN = {x:0,y:0,z:0};
const SCALE = {x:1,y:1,z:1};

function isEmpty(obj){
  if (obj === undefined || obj === null) {
    return true
  }
}

//z-axis runs backwards-forwards
//y axis runs vertical
//x-axis runs lateral

class Animated{
  constructor(name, fps){
    this.name = name;
    if (fps != null || fps != undefined){ this.fps = fps;}
    else {this.fps = 30}
  }
/**
 * Abstract function; children should implement the default position for all the body parts
 * to reset to T-pose
 */
  reset(){}; 
/**
 * 
 * @param {Object} target the thing to be animated
 * @param {Array} keyframes an array of keyframes
 * @param {Number} duration in milliseconds
 */
  static animateProperty(target, keyframes, duration){
    animatePropAbs(target, keyframes, duration)
  }

  /**
 * Cumulative instead
 * @param {Object} target the thing to be animated
 * @param {Array} keyframes an array of keyframes
 * @param {Number} duration in milliseconds
 */
static animatePropertyDelta(target, keyframes, duration){
  animatePropDelta(target, keyframes, duration).bind(this);
}

/**
 * 
 * @param {Object} obj The Zdog shape
 * @param {Object} kf The keyframe object
 * {
  rotate: {x:2, y:3}, only updates listed coordinates
  translate: {x:4, y:3, z:7},
  scale: {} // no change
  }
 * @returns the object's updated position properties
 */
  static transformToKeyframe(obj, kf) {
  let objClone = {...obj};
  for (let k in kf) {
    Object.assign(objClone[k], KF[k]);
  }
  return {rotate: objClone.rotate, translate:objClone.translate, scale:objClone.scale}
}

    play(animState){
      for (let i = 0; i< animState.keyframes.length; i++) {
       // animState.keyframes[i].duration
       let parts = animState.keyframes[i].transform;
        for (let part in parts) {
          
        }
      }
    }
}

class Parrot extends Animated{
  constructor(name){
    super(name);
    this.bodyNode = {};
    this.mainColor = '#d11d1d';
    this.secColor = '#276be3';
    this.innerWingColor = '#ead23a'
    this.canvas = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  zoom: 2,
});

this.bodyNode.torso = new Zdog.Shape({
  addTo: this.canvas,
  path: [
    { x:0, y: 0 },
    {z: -10, y: 21}
  ],
  color: this.mainColor,
  stroke: 22,
});

let breast = new Zdog.Shape({
  addTo: this.bodyNode.torso,
  color: this.mainColor,
  stroke: 20,
});

this.bodyNode.neck1 = new Zdog.Ellipse({
  addTo: breast,
  width: 9,
  height: 25,
  stroke: 14,
  color: this.mainColor,
  translate: {y: -18, z:-3}
});

this.bodyNode.head = new Zdog.Anchor({
  addTo: this.bodyNode.neck1,
  translate: {z:6, y: -17}
});

new Zdog.Ellipse({
  addTo: this.bodyNode.head,
  width:6,
  height:5,
  stroke:14,
  color:this.mainColor,
  translate: {z:-2, y: 2},
  rotate:{x:0.4, y:1.57}
})

new Zdog.Ellipse({
  addTo: this.bodyNode.neck1,
  width: 4,
  height: 19,
  stroke: 11,
  color: this.mainColor,
  translate: {y: 4, z:6},
  //rotate: { x: 0.2 },
});

new Zdog.Shape({
  addTo: this.bodyNode.head,
  stroke: 4,
  color: this.mainColor,
  translate: {y: -2, z:10},
  path: [
    { x:-3, y: 0 },
    {x: 3, y: 0},
    {x: 3, y: -3, z: -10},
    {x: -3, y: -3, z: -10},
  ],
  fill:true
});

let beak0 = new Zdog.Shape({
  addTo: this.bodyNode.head,
  path: [
    { x:0, y: -1 },
    {z: 4, y: 3}
  ],
  stroke:7,
  color: beakColor0,
  translate: {y:0, z:6},

});

let beak1 = new Zdog.Cone({
  addTo: beak0,
  diameter: 5,
  length: 9,
  stroke: false,
  color: beakColor,
  backface: beakColor,
  translate: {z:5, y:4},
  rotate: {x:-1.4}
});

this.bodyNode.jaw = new Zdog.Anchor({
  addTo: this.bodyNode.head,
  translate: {z:2, y:6}
})
new Zdog.Cone({
  addTo: this.bodyNode.jaw,
  diameter: 9,
  length: 9,
  stroke: false,
  color: beakColor,
  backface: tongueColor,
});

  let createFace = (direction) =>{
    let result = new Zdog.Shape({
      addTo: this.bodyNode.head,
      path:[
        {x:3.5, y:-1.5, z:6},
        {x:6, y:-3, z:-2},
        {x:5, y:8, z:2},
      ],
      stroke: 2,
      fill:true,
      color: faceColor,
    });
    this.bodyNode[`face_${direction}`] = result;
    this.bodyNode[`eye_${direction}`] = new Zdog.Shape({
      addTo: result,
      stroke: 3,
      color: beakColor,
      path:[{x:7,y:-1,z:1}],
    })    

    return result;
  }

// let face2 = face.copy({
//   translate:{x:-6,z:1},
//   rotate: {y:1.42, z:1},
// });

// let eye2 = new Zdog.Shape({
//   addTo: head,
//   stroke: 3,
//   color: beakColor,
//   translate:{x:-7,y:-1,z:1},
// })

// Generate wing
let offsetFromAnchor = (zAnchor, transforms) => {
  let myObject = {x:0, y:0, z:0};
  for (var key in zAnchor.translate) {
    if (transforms != null && transforms.hasOwnProperty(key)) {
      myObject[key] = zAnchor.translate[key] + transforms[key];
   } else {
    myObject[key] = zAnchor.translate[key];
   }
  }
  return myObject
}

let createWing = (direction) => {
  let result = new Zdog.Group({
    addTo: breast,
  });

  this.bodyNode[`shoulder_${direction}`] = new Zdog.Anchor({
    addTo: breast,
    translate:{x:6, y:-7, z:-4},
  })
  result = this.bodyNode[`shoulder_${direction}`] ;

  this.bodyNode[`elbow_${direction}`] = new Zdog.Anchor({
    addTo: this.bodyNode[`shoulder_${direction}`],
    translate:{ x:20, z: -10, y: -10 }
  })

  this.bodyNode[`wrist_${direction}`] = new Zdog.Anchor({
    addTo: this.bodyNode[`elbow_${direction}`],
    translate:{ x:25, y: -5 }
  })
  
  this.bodyNode[`upperarm_${direction}`] = new Zdog.Shape({
    addTo: this.bodyNode[`shoulder_${direction}`],
    path: [
      { x:0, z: 0, y:0 },
      offsetFromAnchor(this.bodyNode[`elbow_${direction}`], {x:0, y:0, z:0}),
      offsetFromAnchor(this.bodyNode[`elbow_${direction}`], {x:2, y:10, z:0}),
      {x: 0, z: -2, y: 15},
    ],
    stroke:6,
    fill:true,
    color: this.mainColor,
  });
  
  this.bodyNode[`upperflight_${direction}`] = new Zdog.Shape({
    addTo: this.bodyNode[`upperarm_${direction}`],
    path: [
      { x:6, z: -4, y: 17 },
      offsetFromAnchor(this.bodyNode[`elbow_${direction}`], {x:3, y:12, z:0}),
      offsetFromAnchor(this.bodyNode[`elbow_${direction}`], {x:3, y:32, z:0}),
      {x: 12, z: -6, y: 34},
    ],
    stroke:4,
    fill:true,
    color: this.secColor,
  });

  new Zdog.Shape({
    addTo: this.bodyNode[`upperflight_${direction}`],
    path: [
      { x:9, z: -2, y: 12 },
      offsetFromAnchor(this.bodyNode[`elbow_${direction}`], {x:3, y:10, z:2}),
      offsetFromAnchor(this.bodyNode[`elbow_${direction}`], {x:3, y:20, z:5}),
      {x: 11, z: -5, y: 20},
    ],
    stroke:3,
    fill:true,
    color: this.innerWingColor,
  });

  
  this.bodyNode[`forearm_${direction}`] = new Zdog.Shape({
    addTo: this.bodyNode[`elbow_${direction}`],
    path: [
      { x:0, z: 0, y:0},
      offsetFromAnchor(this.bodyNode[`wrist_${direction}`]),
      {x: 3, z: -1, y: 12},
    ],
    stroke:6,
    fill:true,
    color: this.mainColor,
  });
  
  this.bodyNode[`foreflight_${direction}`] = new Zdog.Shape({
    addTo: this.bodyNode[`forearm_${direction}`],
    path: [
      { x:5, z: 1, y: 17 },
      offsetFromAnchor(this.bodyNode[`wrist_${direction}`]),
      offsetFromAnchor(this.bodyNode[`wrist_${direction}`], {x:3, y: 20}),
      {x: 10, z: 2, y: 30},
    ],
    stroke:4,
    fill:true,
    color: this.secColor,
  });

  new Zdog.Shape({
    addTo: this.bodyNode[`foreflight_${direction}`],
    path: [
      { x:4, z: 4, y: 13 },
      offsetFromAnchor(this.bodyNode[`wrist_${direction}`], {x:-3, y: 3, z:3}),
      offsetFromAnchor(this.bodyNode[`wrist_${direction}`], {x:0, y: 15, z:3}),
      {x: 10, z: 4, y: 20},
    ],
    stroke:3,
    fill:true,
    color: this.innerWingColor,
  });
  
  
  this.bodyNode[`primaryflight_${direction}`] = new Zdog.Shape({
    addTo: this.bodyNode[`wrist_${direction}`],
    path: [
      { x:0, z: 0, y: 0 },
      {x: 25, z: 0, y: -5},
      {x: 45, z: 0, y: 0},
      {x: 9, z: 0, y: 19},
    ],
    stroke:5,
    fill:true,
    color: this.secColor,
  });
  
  return result;
}

/*Pelvis */

this.bodyNode.hip = new Zdog.Anchor({
  //addTo: this.bodyNode.torso,
  addTo: this.canvas,
  translate: {z:0, y: 15}
});

// Generate leg
let createLeg = (direction) => {
  let result = new Zdog.Group({
    addTo: this.bodyNode.hip
  });
  this.bodyNode[`leg_${direction}`] = result;
  
  this.bodyNode[`thigh_${direction}`] = new Zdog.Cylinder({
    addTo: this.bodyNode[`leg_${direction}`],
    diameter: 8,
    length: 18,
    stroke: false,
    color: this.mainColor,
    backface: this.mainColor,
  });

  //Ankle
  this.bodyNode[`ankle_${direction}`] = new Zdog.Anchor({
    addTo: this.bodyNode[`leg_${direction}`],
    translate: {z:10}
  });

  new Zdog.Ellipse({
    addTo: this.bodyNode[`ankle_${direction}`],
    color: '#7dff81',
    // ..
  })
  
  this.bodyNode[`shin_${direction}`] = new Zdog.Shape({
    addTo: this.bodyNode[`ankle_${direction}`],
    stroke: 4,
    color: beakColor,
    path:[
      {z:0},
      {z:5},
    ]
  });
  
//FOOT
  this.bodyNode[`foot_${direction}`] = new Zdog.Anchor({
    addTo: this.bodyNode[`shin_${direction}`],
    translate: {z:5}
  });

  new Zdog.Ellipse({
    addTo: this.bodyNode[`foot_${direction}`],
    color: '#7dff81',
    // ..
  })
  //toe 1
  this.bodyNode[`toe_${direction}1_0`] = new Zdog.Shape({
    addTo: this.bodyNode[`foot_${direction}`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:0, x:0},
      {z:6, x:3},
    ]
  });
  
  this.bodyNode[`toe_${direction}1_1`] = new Zdog.Shape({
    addTo: this.bodyNode[`toe_${direction}1_0`],
    stroke: 2,
    translate:{z:6, x:3},
    color: beakColor,
    path:[
      {z:0},
      {z:6, x:1}
    ]
  });
  //toe 2
  this.bodyNode[`toe_${direction}2_0`] = new Zdog.Shape({
    addTo: this.bodyNode[`foot_${direction}`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:0, x:0},
      {z:5, x:-1},
    ]
  });
  
  this.bodyNode[`toe_${direction}2_1`] = new Zdog.Shape({
    addTo: this.bodyNode[`toe_${direction}2_0`],
    stroke: 2,
    color: beakColor,
    translate: {z:5, x:-1},
    path:[
      {z:0},
      {z:5}
    ]
  });
  //toe 3
  this.bodyNode[`toe_${direction}3`] = new Zdog.Shape({
    addTo: this.bodyNode[`foot_${direction}`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:0, x:0},
      {z:-5, x:-3},
    ]
  });
  //toe 4
  this.bodyNode[`toe_${direction}4`] = new Zdog.Shape({
    addTo: this.bodyNode[`foot_${direction}`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:0, x:0},
      {z:-6, x:4}
    ]
  });

  return result;
}

/*  TAIL */
let tail = new Zdog.Anchor({
  addTo: this.bodyNode.torso,
  translate:{y:30,z:-18},
})

this.bodyNode[`tail`] = tail;

// Tail base
let tail0 = new Zdog.Shape({
  addTo: tail,
  path: [
    {x: 0, y:-18, z:-3},
    {x:7,  z:-5},
    {x:0, y:30, z:-10},
    {x:-7,  z:-5},
  ],
  stroke:6,
  fill:true,
  color: this.secColor,
});

let tail00 = new Zdog.Shape({
  addTo: tail,
  path: [
    {x:-5, y:-8},
    {x:-10, y:0},
    {x:-11, y:40, z:-10},
  ],
  stroke:3,
  fill:true,
  color: this.secColor,
});

  tail00.copy({
    addTo: tail,
    path: this.__reflectPaths(tail00, {x:-1, y:1, z:1}),
  })

let tail1 = new Zdog.Shape({
  addTo: tail,
  path: [
    {x:4, y:-3, z:6},
    {x:-4, y:-3, z:6},
    {x:0, y:100, z:-10},
  ],
  stroke:4,
  fill:true,
  color: this.mainColor,
});

let tail000 = new Zdog.Shape({
  addTo: tail,
  path: [
    {x:8, y:0, z:2},
    {x:2, y:-6, z:2},
    {x:5, y:70, z:-10},
  ],
  stroke:3,
  fill:true,
  color: this.mainColor,
});

  tail000.copy({
    addTo: tail,
    path: this.__reflectPaths(tail000, {x:-1, y:1, z:1}),
  });

  //Symmetry
  createWing('L');
  createWing('R').scale = {x:-1, y:1, z:1};
  this.bodyNode.shoulder_R.translate = this.__reflectOverAxialPlane(this.bodyNode.shoulder_R.translate, {x:-1, y:1, z:1})
  createLeg('L').translate = {x:8, z:2};
  createLeg('R');
  this.bodyNode.leg_R.translate = {x:-8, z:2};
  this.bodyNode.leg_R.scale = {x:-1, y:1, z:1};
  createFace('L');
  createFace('R').scale = {x:-1, y:1, z:1};

  this.resetState = {};
  let defaults = Object.entries(this.bodyNode);
  defaults.forEach(part => {
    this.resetState[`${part[0]}`] = {
      translate: Object.assign({}, {...part[1].translate}),
      rotate: Object.assign({}, {...part[1].rotate}),
      scale: Object.assign({}, {...part[1].scale}),
      // renderFront: Object.assign({}, {...part[1].renderFront}),
      // renderNormal: Object.assign({}, {...part[1].renderNormal}),
      // renderOrigin: Object.assign({}, {...part[1].renderOrigin}),
      //path: Object.assign({}, {...part[1].path})
    }
  })

  //console.log(JSON.stringify(this.resetState));
  Object.freeze(this.resetState);
  sessionStorage.setItem('reset', JSON.stringify(this.resetState));
  sessionStorage.setItem('resetFace', JSON.stringify(this.bodyNode.eye_L.path));

  /**
   * ANIMATIONS LIST?
   */
  this.animation = {
    face:{
      blink:()=>{
        this.animation.face.closeEye('L')();
        this.animation.face.closeEye('R')();
        setTimeout(()=>{
          this.resetFace();
        }, 300)
      },
      closeEye:(LR)=>{
        let context = this;
        let eye = `eye_${LR}`
        return function(){
          context.bodyNode[eye].stroke = 1;
          context.bodyNode[eye].path = [{x:7,y:-1,z:0}, {x:7,y:-1,z:3}];
          context.bodyNode[eye].updatePath();
        }
      },
      blinkLoop:()=>{
        let duration;
        let rT = () => {
          duration = randomInt(4000, 8000);
          this.animation.face.STATE = window.requestTimeout(()=>{
            this.animation.face.blink()
            rT();
          }, duration)
        }
        rT();
      },
      chew:()=>{
        this.animate('jaw', 'rotate', [{x:0,y:0,z:0}, {x:TAU/-10}, ORIGIN], 1000);
      },
      STATE: null
    },
    head:{
      nod:()=>{
        if (this.animation.head.STATE) window.clearRequestInterval(this.animation.head.STATE);
        let t = {duration: 2000};
        this.animateD('neck1', 'rotate', ['INITIAL', {x:TAU/30}, 'INITIAL'], t);
        this.animateD('neck1', 'translate', ['INITIAL', {z:-1, y:-2}, 'INITIAL'], t);
        //Animated.animateProperty(Polly_.neck1.rotate, [{x:TAU/15}], timer);
        this.animateD('head','translate', ['INITIAL', {z:1,y:-1}, 'INITIAL'], t);
        this.animateD('head','rotate', ['INITIAL', {x:TAU/40}, 'INITIAL'], t);
      },
      idle:()=>{
        let t = this.animation.idle.loopDur;
        this.animation.head.STATE = window.requestInterval(()=>{

        },t)
      },
      STATE: null,
    },
    body:{
      idle:()=>{
        let t = this.animation.idle.loopDur;
      },
      STATE:null
    },
    wing:{
      L:{
        STATE: null
      },
      R:{
        STATE: null
      },
    },
    leg:{
      idle:()=>{
        let t = this.animation.idle.loopDur;

      },
      L:{
        curl:()=>{
          this.animation.leg.curl('L');
        },
        STATE: null
      },
      R:{
        curl:()=>{
          this.animation.leg.curl('R');
        },
        STATE: null
      },
      curl:(LR)=>{
        let t = 500;
        //inner forward toe
        this.animate(`toe_${LR}2_0`,'rotate', [{x:TAU/-20}], t);
        this.animate(`toe_${LR}2_1`,'rotate', [{x:TAU/-10}], t);
        //Large outer forward toe
        this.animate(`toe_${LR}1_0`,'rotate', [{x:TAU/-20, y:TAU/30}], t);
        this.animate(`toe_${LR}1_1`,'rotate', [{x:TAU/-10}], t);
        //inner back toe
        this.animate(`toe_${LR}3`,'rotate', [{x:TAU/4}], t);
        //outer back toe
        this.animate(`toe_${LR}4`,'rotate', [{x:TAU/4, y:TAU/-20}], t);
      },
      uncurl:(LR)=>{
        let t = 500;
        this.animate(`toe_${LR}2_0`,'rotate', [ORIGIN], t);
        this.animate(`toe_${LR}2_1`,'rotate', [ORIGIN], t);
        //Large outer forward toe
        this.animate(`toe_${LR}1_0`,'rotate', [ORIGIN], t);
        this.animate(`toe_${LR}1_1`,'rotate', [ORIGIN], t);
        //inner back toe
        this.animate(`toe_${LR}3`,'rotate', [ORIGIN], t);
        //outer back toe
        this.animate(`toe_${LR}4`,'rotate', [ORIGIN], t);
      },
      curlToes:function(){
        this.curl('L')
        this.curl('R')
      },
      standFlat:function(){
        this.uncurl('L');
        this.uncurl('R');
      }
    },
    tail:{
      STATE: null
    },
    idle:{
      loopDur:3000,
      default:()=>{
        let aopts = {duration: this.animation.idle.loopDur, loop:true, direction: 'alternate', easing: 'easeInSine', delay: -1000}
        let State = {
          tail: this.animateD('tail', 'rotate', ['INITIAL', {x:TAU/120}], aopts),
          torso:[
            this.animateD('torso','translate', ['INITIAL', {z:2, y:-1}, {z:-2, y:1}], aopts),
            this.animateD('torso','rotate', ['INITIAL', {x:TAU/-70}], aopts)
            ],
          hip: this.animateD('hip', 'rotate', ['INITIAL', {x:TAU/-60}], aopts),
          foot:[
            this.animateD('foot_L','rotate', ['INITIAL', {x:TAU/40}], aopts),
            this.animateD('foot_R','rotate', ['INITIAL', {x:TAU/40}], aopts)
            ],
          neck:[
            this.animateD('neck1','rotate', ['INITIAL', {x:TAU/70}, {x:TAU/-50}], aopts),
            this.animateD('neck1','translate', ['INITIAL', {z:-1}, {z:1}], aopts)
            ],
          head:this.animateD('head','translate', ['INITIAL', {z:-1}, {z:1}], aopts),
          }
        this.animation.idle.STATE = State;
      },
      STATE: null
      },
      transition:{
        standFlat:()=>{
          // this.resetIntervals();
          this.animate('hip','rotate', [{x:TAU/-6}], timer);
          this.animate('hip','translate', [{y:11, z:-8}], timer);
          this.animate('torso','rotate', [{x:TAU/-8}], timer);
          this.animate('tail','rotate', [{x:TAU/-15}], timer);
        
          this.animate('shin_L','rotate', [{x:TAU/30}], timer);
          this.animate('shin_R','rotate', [{x:TAU/30}], timer);

          this.animate('foot_L','rotate', [{x:TAU/8}], timer);
          this.animate('foot_R','rotate', [{x:TAU/8}], timer);
        
          this.animate('neck1','translate', [{y:-13}], timer);
          this.animate('neck1','rotate', [{x:TAU/15}], timer);
        
          this.animate('head','rotate', [{x:TAU/20}], timer);
          this.animate('head','translate', ['RESET'], timer);

          this.animation.leg.standFlat();
        },
        STATE:null
      }
    }
  } // END CONSTRUCTOR

  animate(part, property, keyframes, duration, easing, bLoop){
    let target = this.bodyNode[part][property];
    anime.remove(target);
    //animatePropAbs(target, keyframes, duration)
    let kfTEMP = keyframes.map(val =>{
      if (val == 'RESET') {
        return this.resetState[part][property];
      }
      return val;
    })
    anime({
      targets: target,
      easing: (easing? easing : 'linear'),
      //round: 1,
      keyframes: kfTEMP,
      duration: duration,
      loop: (bLoop? true : false),
      // update: function() {
      //   //console.log(Polly_.hip.rotate.x);
      //  }
    });
  }
  /**
   * Animate by defining keyframes that are relative deltas instead of absolute values.
   * @param {String} part Name of the skeleton/bone
   * @param {String} property rotate | transform | translate (Zdog transforms)
   * @param {Array<Object>} keyframes An array of objects containing XYZ values to transform
   * @param {*} animeOptions Additional options for anime library, such as {duration:100, easing: 'linear', loop:false},
   * @returns anime object
   */
  animateD(part, property, keyframes, animeOptions={duration:1, easing: 'linear', loop:false}){
    let target = this.bodyNode[part][property];
    anime.remove(target);
    let INITIAL = Object.assign({}, target);
    let p = INITIAL;
    let kfTEMP = keyframes.map((val, index) =>{
      if (val == 'RESET') {
        return this.resetState[part][property];
      }
      if (val == 'INITIAL') {
        return INITIAL;
      }
      let delta = {
        x: (p.x? p.x: 0) + (val.x? val.x: 0),
        y: (p.y? p.y: 0) + (val.y? val.y: 0),
        z: (p.z? p.z: 0) + (val.z? val.z: 0)
          }   
      p = delta;
      return delta;
    })
    return anime(
      Object.assign(
      {
        targets: target,
        keyframes: kfTEMP,
        easing: animeOptions.easing? animeOptions.easing : 'linear'
      }, animeOptions));
  }

  __zDeepCopy(zEle, attachTo){
  let clone = zEle.copy({
    addTo: attachTo
  });
  zEle.children.forEach(child => {
    this.__zDeepCopy(child, clone)
  })
  return clone;
}

__reflectPaths(zEle, plane) {
  if (zEle.path != undefined || zEle.path != null) {
    let uh = zEle.path.map(path => {
      return this.__reflectOverAxialPlane(path, plane);
    })
    return uh;
  }
}

// Only for XY, YZ, XZ planes
//paint is Ojbect like {x:19, y:-12, z:34}
//plane should be an Object {x:1, y:1, z:-1} = reflect over xy plane
__reflectOverAxialPlane(point, plane){
  /* identity = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ] */

  let test = {
    x: point.x * plane.x,
    y: point.y * plane.y,
    z: point.z * plane.z,
  };

  return {
    x: point.x * plane.x,
    y: point.y * plane.y,
    z: point.z * plane.z,
  }
}

  toggleAnchors(){
    a = ["jaw", "head", "elbow_L", "elbow_R", "hip","shoulder_L","shoulder_R", "wrist_R","wrist_L", "ankle_R","ankle_L", "foot_L","foot_R"]
    new Zdog.Shape({
      addTo: this.bodyNode.hip,
      stroke: 20,
      color: "#b1ffad",
    })

    new Zdog.Shape({
      addTo: this.bodyNode.head,
      stroke: 20,
      color: "#b1ffad",
    })
  }

  updateRenderGraph() {
    this.canvas.updateRenderGraph();
  }

  reset(){
    let nodes = Object.entries(this.bodyNode);
    let resetState = JSON.parse(sessionStorage.getItem('reset'));
    nodes.forEach(node => {
      Object.assign(node[1], Object.assign({}, resetState[node[0]]));
    })

    this.resetFace();
    if (this.INTERVALSTORE != null){this.INTERVALSTORE = null}
    // delete all animejs instances
    let m = anime.running.length;
    for (let i = 0; i < m; i++){
      delete anime.running.pop();
    }
    this.resetIntervals();
  }

  resetIntervals(){
    Object.keys(this.animation).forEach(anim=>{
      if (!this.animation[anim]) return;
      let temp = this.animation[anim]['STATE'];
      if (temp){
        window.clearRequestInterval(temp);
        //clearInterval(anim['STATE']);
      }
    })
  }

  resetFace(){
    let resetState = JSON.parse(sessionStorage.getItem('resetFace'));
    //Reset eyes
    this.bodyNode.eye_L.stroke = 3;
    this.bodyNode.eye_L.path = resetState;
    this.bodyNode.eye_L.updatePath();

    this.bodyNode.eye_R.stroke = 3;
    this.bodyNode.eye_R.path = resetState;
    this.bodyNode.eye_R.updatePath();
  }

  resetWings(){
    let resetState = JSON.parse(sessionStorage.getItem('reset'));
    let list = ['elbow', 'wrist', 'shoulder', 'upperarm', 'forearm', 'foreflight', 'primaryflight', 'upperflight'];
    list.forEach((part) => {
      Object.assign(this.bodyNode[`${part}_L`], resetState[`${part}_L`])
      Object.assign(this.bodyNode[`${part}_R`], resetState[`${part}_R`])
    })
  }

}
// END PARROT 


let Polly = new Parrot("Polly");

function animate(){
  Polly.updateRenderGraph();
  requestAnimationFrame(animate);
  
}

function foldL(){
  Polly.updateRenderGraph();
}

let timer = 1000;

let Polly_ = Polly.bodyNode;

function foldWings(){
  Animated.animateProperty(Polly_.shoulder_L.rotate, [{x:TAU/-10, y:TAU/4, z:TAU/4}], timer);
  Animated.animateProperty(Polly_.elbow_L.rotate, [{y:TAU/-2, x:TAU/40}], timer);
  Animated.animateProperty(Polly_.wrist_L.rotate, [{y:TAU/2, z:TAU/20}], timer);
  
  Animated.animateProperty(Polly_.shoulder_R.rotate, [{x:TAU/-10, y:TAU/-4, z:TAU/-4}], timer);
  Animated.animateProperty(Polly_.elbow_R.rotate, [{y:TAU/-2, x:TAU/40}], timer);
  Animated.animateProperty(Polly_.wrist_R.rotate, [{y:TAU/2, z:TAU/20}], timer);
  
  Animated.animateProperty(Polly_.upperflight_L.scale, ['INITIAL', {y:0.3, z:0.5}], timer);
  Animated.animateProperty(Polly_.upperflight_R.scale, ['INITIAL', {y:0.3, z:0.5}], timer);

  Animated.animateProperty(Polly_.foreflight_L.scale, ['INITIAL',{y:0.3, z:0.5}], timer);
  Animated.animateProperty(Polly_.foreflight_R.scale, ['INITIAL',{y:0.3, z:0.5}], timer);

  Animated.animateProperty(Polly_.upperarm_L.scale, ['INITIAL',{y:0.3, z:0.5}], timer);
  Animated.animateProperty(Polly_.upperarm_R.scale, ['INITIAL',{y:0.3, z:0.5}], timer);
}

function flightForm(){
  Animated.animateProperty(Polly_.hip.rotate, [{x:TAU/-2.5}], timer);
  Animated.animateProperty(Polly_.hip.translate, [{y:10, z:-14}], timer);
  Animated.animateProperty(Polly_.torso.rotate, [{x:TAU/-7}], timer);
  Animated.animateProperty(Polly_.tail.rotate, [{x:TAU/-100}], timer);

  //symmetricRotate(Polly_, 'shin', [{x:TAU/30}])
  symmetricRotate(Polly_, 'foot', [{x:TAU/8}])

  Animated.animateProperty(Polly_.neck1.translate, [{y:-13}], timer);
  Animated.animateProperty(Polly_.neck1.rotate, [{x:TAU/-15}], timer);

  Animated.animateProperty(Polly_.head.rotate, [{x:TAU/5}], timer);
  Animated.animateProperty(Polly_.head.translate, ['INITIAL', {z:2, y:-20}], timer);
  Polly.animation.leg.curlToes();
}

let flapT = 200

function flap(){
  setTimeout(()=>{
    flap1()
    setTimeout(()=>{
      flap2()
      setTimeout(()=>{
        flap3()
        setTimeout(()=>{
          flap4()
          setTimeout(()=>{
            flap5()
          },flapT)
        },flapT)
      },flapT)
    },flapT)
  }, flapT)
}

function flapLoop(){
  let reset = {x:0,y:0,z:0};
  let duration = 1800;
  anime({
    targets: Polly_.shoulder_L.rotate,
    duration: duration,
    keyframes: [
      {x:TAU/7, y:TAU/-40, x:TAU/-10},
      {x:TAU/-20, y:TAU/-10, z:TAU/10},
      {x:TAU/10, y:TAU/10, z:TAU/10},
      {x:TAU/20, y:TAU/5, z:TAU/10},
      {y:TAU/4},
      {x:TAU/7, y:TAU/-40, x:TAU/-10},
    ],
    easing: 'linear',
    loop: true
  });

  anime({
    targets: Polly_.elbow_L.rotate,
    duration: duration,
    keyframes: [
      {x:TAU/-20, y:TAU/5, z:TAU/-10},
      {x:TAU/-50, y:TAU/-10, z:TAU/-40},
      {x:TAU/-40, y:TAU/-10, z:TAU/-40},
      {x:TAU/-40, y:TAU/-10, z:TAU/-40},
      reset,
      {x:TAU/-20, y:TAU/5, z:TAU/-10},
    ],
    easing: 'linear',
    loop: true
  });

  anime({
    targets: Polly_.wrist_L.rotate,
    duration: duration,
    keyframes: [
      {y:TAU/14, z:TAU/-20},
      {y:TAU/-30},
      {y:TAU/-30},
      {y:TAU/-30},
      {y:TAU/30},
      {y:TAU/14, z:TAU/-20},
    ],
    easing: 'linear',
    loop: true
  });

  anime({
    targets: Polly_.shoulder_L.translate,
    duration: duration,
    keyframes: [
      reset,
      {x:11},
      {x:11},
      {x:11},
      {x:11},
      reset
    ],
    easing: 'linear',
    loop: true
  });

  anime({
    targets: Polly_.upperarm_L.rotate,
    duration: duration,
    keyframes: [
      reset,
      reset,
      {z:TAU/30, x:TAU/-10},
      {z:TAU/30, x:TAU/-10},
      reset,
      reset,
    ],
    easing: 'linear',
    loop: true
  });

  anime({
    targets: Polly_.foreflight_L.rotate,
    duration: duration,
    keyframes: [
      reset,
      reset,
      {x:TAU/-20},
      {x:TAU/-20},
      {x:TAU/-20},
      reset,
    ],
    easing: 'linear',
    loop: true
  });

  anime({
    targets: Polly_.primaryflight_L.rotate,
    duration: duration,
    keyframes: [
      reset,
      {y:TAU/-30},
      {y:TAU/-30},
      {y:TAU/-30},
      reset,
      reset
    ],
    easing: 'linear',
    loop: true
  });
}

function flap1(){
 Animated.animateProperty(Polly_.shoulder_L.rotate, [{x:TAU/7, y:TAU/-40, x:TAU/-10}], flapT);
 Animated.animateProperty(Polly_.elbow_L.rotate, [{x:TAU/-20, y:TAU/5, z:TAU/-10}], flapT);
Animated.animateProperty(Polly_.wrist_L.rotate, [{y:TAU/14, z:TAU/-20}], flapT);
}

function flap2(){
 Animated.animateProperty(Polly_.shoulder_L.rotate, [{x:TAU/-20, y:TAU/-10, z:TAU/10}], flapT);
  Animated.animateProperty(Polly_.shoulder_L.translate, [{x:11}], flapT);
  Animated.animateProperty(Polly_.elbow_L.rotate, [{x:TAU/-50, y:TAU/-10, z:TAU/-40}], flapT);
  Animated.animateProperty(Polly_.wrist_L.rotate, [{y:TAU/-30}], flapT);
}


function flap3(){
  Animated.animateProperty(Polly_.shoulder_L.rotate, [{x:TAU/10, y:TAU/10, z:TAU/10}], flapT);
 Animated.animateProperty(Polly_.shoulder_L.translate, [{x:11}],flapT);
  Animated.animateProperty(Polly_.upperarm_L.rotate, [{z:TAU/30, x:TAU/-10}], flapT);

  Animated.animateProperty(Polly_.elbow_L.rotate, [{x:TAU/-40, y:TAU/-10, z:TAU/-40}], flapT);
 Animated.animateProperty(Polly_.foreflight_L.rotate, [{x:TAU/-20}], flapT);

  Animated.animateProperty(Polly_.wrist_L.rotate, [{y:TAU/-30}], flapT);
}

function flap4(){
  Animated.animateProperty(Polly_.shoulder_L.rotate, [{x:TAU/20, y:TAU/5, z:TAU/10}], flapT);
  Animated.animateProperty(Polly_.primaryflight_L.rotate, [{y:TAU/-30}], flapT);
  Animated.animateProperty(Polly_.elbow_L.rotate, [{x:TAU/-40, y:TAU/-10, z:TAU/-40}], flapT);
 Animated.animateProperty(Polly_.wrist_L.rotate, [{y:TAU/-30}], flapT);
}

function flap5(){
 Polly.resetWings();
 let reset = {x:0,y:0,z:0};
 console.log("fap5");
 Animated.animateProperty(Polly_.shoulder_L.rotate, [{y:TAU/4}], flapT);
 Animated.animateProperty(Polly_.primaryflight_L.rotate, [reset], flapT);
 Animated.animateProperty(Polly_.elbow_L.rotate, [reset], flapT);
 Animated.animateProperty(Polly_.upperarm_L.rotate, [reset], flapT);

  Animated.animateProperty(Polly_.wrist_L.rotate, [{y:TAU/30}], flapT);
}

function symmetricRotate(target, partName, keyframes){
  Animated.animateProperty(target[`${partName}_L`].rotate, keyframes, timer);
  Animated.animateProperty(target[`${partName}_R`].rotate, keyframes, timer);
}


/*
For each p in transformParts
Animated.animateProperty(Polly_.`${transformParts[p].part}`.`${transformParts[p].transform}`, 
  transformParts[p].keyframes, transformParts[p].time);

JSON structure for an animation?
{
  name: "wing_tuck_anim"
  looping:false,
  direction:normal
  transformParts: {
      part: "shoulder_L",
      transform: rotate,
      keyframes: [
        {x: y: z:},
        {x: y: z:},
      ],
      time: 1000
    },
    {
      part: "elbow_L",
      transform: rotate,
      keyframes: [
        {x: y: z:},
        {x: y: z:},
      ],
      time: 1000
    }
}

{
  name: "chew_anim"
  looping:true,
  direction:alternate-reverse,
  transformParts: {
      part: "jaw",
      transform: rotate,
      keyframes: [
        ORIGIN,
        {x:TAU/-10},
      ],
      time: 1000
    },
    {
      part: "head",
      transform: translate,
      keyframes: [
        ORIGIN,
        {x:-1,y:1,z:1},
        {x:1,y:0,z:-1}
      ],
      time: 1000
    }
}


 */

function animatePropDelta(target, keyframes, duration){
  interpolate(target, keyframes, duration)(true)();
}

function animatePropAbs(target, keyframes, duration){
  interpolate(target, keyframes, duration)(false)();
}

function interpolate(target, keyframes, duration, promise){
  let FPS = 30;
  let o;
  let intvl = setInterval(() => {
    // It will update every time it's read
    Object.assign(target, {x: o.x, y: o.y, z: o.z});
    // target.x = o.x;
    // target.y = o.y;
    // target.z = o.z;
  }, (1000 / FPS));
  //clear setInterval

  setTimeout(()=>{
    clearInterval(intvl);
    if (promise) {promise.resolve()};
  }, duration);

  return function(bDelta){
    if (keyframes == null || keyframes == undefined) {
      throw new Error("Keyframes must not be empty")
    } 
    let f;
    let time = duration / keyframes.length;
    let initPos = {}
    const INITPOS = {};
    Object.assign(initPos, target);
    Object.assign(INITPOS, initPos);
    if (!isEmpty(keyframes.length) && keyframes.length == 1) { //only 1 keyframe... assume it is the end frame
      //o = Ola({x:0,y:0,z:0})
  
      o = Ola(initPos, time);
      f = 0;
    } else {
      if (keyframes[0] === 'INITIAL'){
        o = Ola(initPos);
      } else{
        let t = Object.assign({}, keyframes[0]);
        o = Ola(t);
      }
      f = 1
    }
      if (bDelta){
        return function(){
          let p = INITPOS;
          for (let i = f; i < keyframes.length; i++) {
            if (keyframes[i] === 'INITIAL'){
              p = INITPOS;
            setTimeout(()=>{
              o.set(INITPOS, time); 
              }, time*(i));
            } else {
              let delta = {
                x: (p.x? p.x: 0) + (keyframes[i].x? keyframes[i].x: 0),
                y: (p.y? p.y: 0) + (keyframes[i].y? keyframes[i].y: 0),
                z: (p.z? p.z: 0) + (keyframes[i].z? keyframes[i].z: 0)
                            }     
            setTimeout(()=>{
              o.set(delta, time); 
              }, time*(i));
      
              p = delta;
            }
          }
        }
      } else {
        return function(){
          for (let i = f; i < keyframes.length; i++) {
            if (keyframes[i] === 'INITIAL'){
             setTimeout(()=>{
               o.set(INITPOS, time); 
              }, time*(i));
            } else {
             setTimeout(()=>{
               o.set(keyframes[i], time); 
              }, time*(i));
            }
          }
        }
      }
  }
}

animate()