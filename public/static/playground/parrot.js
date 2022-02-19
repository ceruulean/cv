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
    if (keyframes == null || keyframes == undefined) {
      throw new Error("Keyframes must not be empty")
    }
    let o;
    let f;
    if (!isEmpty(keyframes.length) && keyframes.length == 1) { //only 1 keyframe... assume it is the end frame
      o = Ola({x:0,y:0,z:0})
      f = 0;
    } else {
      o = Ola(keyframes[0]);
      f = 1
    }

     for (let i = f; i < keyframes.length; i++) {
       setTimeout(()=>{
        o.set(keyframes[i], duration); 
       }, duration*(i-1));
     }

    let intvl = setInterval(() => {
      // It will update every time it's read
      Object.assign(target, {x: o.x, y: o.y, z: o.z});
      // target.x = o.x;
      // target.y = o.y;
      // target.z = o.z;
    }, (1000 / this.fps));
    //clear setInterval
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
    {z: -10, y: 27}
  ],
  color: this.mainColor,
  stroke: 25,
});

let breast = new Zdog.Shape({
  addTo: this.bodyNode.torso,
  color: this.mainColor,
  stroke: 29,
});

this.bodyNode.neck1 = new Zdog.Ellipse({
  addTo: breast,
  width: 9,
  height: 25,
  stroke: 14,
  color: this.mainColor,
  translate: {y: -20, z:-5}
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
  addTo: this.bodyNode.head,
  width: 4,
  height: 10,
  stroke: 13,
  color: this.mainColor,
  translate: {y: 20, z:2},
  rotate: { x: 0.2 },
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
  addTo: this.bodyNode.torso,
  translate: {z:0, y: -8}
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
  
  this.bodyNode[`shin_${direction}`] = new Zdog.Shape({
    addTo: this.bodyNode[`thigh_${direction}`],
    stroke: 4,
    color: beakColor,
    path:[
      {z:10},
      {z:15},
    ]
  });
  
  this.bodyNode[`foot_${direction}`] = new Zdog.Anchor({
    addTo: this.bodyNode[`shin_${direction}`],
  });
  //toe 1
  this.bodyNode[`toe_${direction}1_0`] = new Zdog.Shape({
    addTo: this.bodyNode[`foot_${direction}`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:15},
      {z:20, x:3},
    ]
  });
  
  this.bodyNode[`toe_${direction}1_1`] = new Zdog.Shape({
    addTo: this.bodyNode[`toe_${direction}1_0`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:20, x:3},
      {z:25, x:3}
    ]
  });
  //toe 2
  this.bodyNode[`toe_${direction}2_0`] = new Zdog.Shape({
    addTo: this.bodyNode[`foot_${direction}`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:15},
      {z:20, x:-1},
    ]
  });
  
  this.bodyNode[`toe_${direction}2_1`] = new Zdog.Shape({
    addTo: this.bodyNode[`toe_${direction}2_0`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:20, x:-1},
      {z:25, x:-1}
    ]
  });
  //toe 3
  this.bodyNode[`toe_${direction}3_0`] = new Zdog.Shape({
    addTo: this.bodyNode[`foot_${direction}`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:15, x:-1},
      {z:12, x:-2},
    ]
  });
  //toe 4
  this.bodyNode[`toe_${direction}4_1`] = new Zdog.Shape({
    addTo: this.bodyNode[`foot_${direction}`],
    stroke: 2,
    color: beakColor,
    path:[
      {z:15, x:1},
      {z:12, x:4}
    ]
  });

  return result;
}

/*  TAIL */
let tail = new Zdog.Anchor({
  addTo: this.bodyNode.torso,
  translate:{y:34,z:-20},
})

// Tail base
let tail0 = new Zdog.Shape({
  addTo: tail,
  path: [
    {x: 0, y:-10, z:-3},
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
    {x:-2},
    {x:-10},
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
    {x:4, z:4},
    {x:-4, z:4},
    {x:0, y:100, z:-10},
  ],
  stroke:4,
  fill:true,
  color: this.mainColor,
});

let tail000 = new Zdog.Shape({
  addTo: tail,
  path: [
    {x:8, z:2},
    {x:2, z:2},
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
  createLeg('L').translate = {x:8, y:35};
  createLeg('R');
  this.bodyNode.leg_R.translate = {x:-8, y:35};
  this.bodyNode.leg_R.scale = {x:-1, y:1, z:1};
  createFace('L');
  createFace('R').scale = {x:-1, y:1, z:1};

  this.resetState = {};
  let defaults = Object.entries(this.bodyNode);
  defaults.forEach(part => {
    this.resetState[`${part[0]}`] = {
      translate: Object.assign({}, {...part[1].translate}),
      rotate: Object.assign({}, {...part[1].rotate}),
      scale: Object.assign({}, {...part[1].scale})
    }
  })

  sessionStorage.setItem('reset', JSON.stringify(this.resetState));
  } // END CONSTRUCTOR

  
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

  updateRenderGraph() {
    this.canvas.updateRenderGraph();
  }

  reset(){
    let nodes = Object.entries(this.bodyNode);
    let resetState = JSON.parse(sessionStorage.getItem('reset'));
    nodes.forEach(node => {
      Object.assign(node[1], Object.assign({}, resetState[node[0]]));
    })
    //this.resetState
  }
}
// END PARROT 


let Polly = new Parrot("Polly");
document.querySelector('.zdog-canvas').style.height = "auto";

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
  Animated.animateProperty(Polly_.shoulder_L.rotate, [{x:TAU/-20, y:TAU/4, z:TAU/4}], timer);
  Animated.animateProperty(Polly_.elbow_L.rotate, [{y:TAU/-2, x:TAU/40}], timer);
  Animated.animateProperty(Polly_.wrist_L.rotate, [{y:TAU/2, z:TAU/20}], timer);
  
  Animated.animateProperty(Polly_.shoulder_R.rotate, [{x:TAU/-20, y:TAU/-4, z:TAU/-4}], timer);
  Animated.animateProperty(Polly_.elbow_R.rotate, [{y:TAU/-2, x:TAU/40}], timer);
  Animated.animateProperty(Polly_.wrist_R.rotate, [{y:TAU/2, z:TAU/20}], timer);
  
  Animated.animateProperty(Polly_.upperflight_L.scale, [{y:1,x:1,z:1}, {y:0.5}], timer);
  Animated.animateProperty(Polly_.upperflight_R.scale, [{y:1}, {y:0.5}], timer);
  
  Animated.animateProperty(Polly_.jaw.rotate, [{x:0,y:0,z:0}, {x:TAU/-10}, ORIGIN], 2000);
}

function flapWings(){
   Animated.animateProperty(Polly_.shoulder_L.rotate, [{x:TAU/-20, y:TAU/4, z:TAU/4}], timer);
  // Animated.animateProperty(Polly_.elbow_L.rotate, [{y:TAU/-2, x:TAU/40}], timer);
  // Animated.animateProperty(Polly_.wrist_L.rotate, [{y:TAU/2, z:TAU/20}], timer);
  
  // Animated.animateProperty(Polly_.shoulder_R.rotate, [{x:TAU/-20, y:TAU/-4, z:TAU/-4}], timer);
  // Animated.animateProperty(Polly_.elbow_R.rotate, [{y:TAU/-2, x:TAU/40}], timer);
  // Animated.animateProperty(Polly_.wrist_R.rotate, [{y:TAU/2, z:TAU/20}], timer);
  
  // Animated.animateProperty(Polly_.upperflight_L.scale, [{y:1,x:1,z:1}, {y:0.5}], timer);
  // Animated.animateProperty(Polly_.upperflight_R.scale, [{y:1}, {y:0.5}], timer);
  
  // Animated.animateProperty(Polly_.jaw.rotate, [{x:0,y:0,z:0}, {x:TAU/-10}, ORIGIN], 2000);
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

animate()