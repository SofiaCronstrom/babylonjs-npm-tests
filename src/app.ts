import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Material, StandardMaterial, Color3, Color4, SpotLight, WebXRExperienceHelper, FreeCamera, Animation, PointerDragBehavior, ActionManager, InterpolateValueAction, PositionGizmo, PointLight, ShadowGenerator, DirectionalLight} from "@babylonjs/core";
import { standardPixelShader } from "@babylonjs/core/Shaders/standard.fragment";




// class App {
//     constructor(){
const canvas = document.createElement("canvas");
canvas.id = "gameCanvas";
canvas.style.width = "99%";
canvas.style.height = "100%";
canvas.style.zIndex = "-20";
document.body.appendChild(canvas);

// initialize babylon engine
const engine = new Engine(canvas, true);
  // create the canvas html element and attach it to the webpage
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.1, 0, 0.1);     
  


const createScene = () => {
    
  // const camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 100, Math.PI / 2.5, 120, Vector3.Zero(), scene);
  //  camera.attachControl(canvas, true);
const camera: FreeCamera = new FreeCamera("camera1", new Vector3(80, 9, -30), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);

// var light1 = new DirectionalLight("dir01", new Vector3(-1, -2, -1), scene);
// light1.position = new Vector3(20, 40, 20);
// light1.intensity = 0.5;

  return camera;
  
}          
     
 const buildTown = () =>{
     const ground = buildGround();
         
     const detached_house = buildBox();
     detached_house.rotation.y = -Math.PI / 2;
     detached_house.position.x = -17.6;
     detached_house.position.z = 0;
         
             
     

     const places = []; //each entry is an array [house type, rotation, x, z]
     places.push([1, -Math.PI / 1, -0, 17.38]);
     places.push([1,-Math.PI / 1.5 ,-9 , -32.5]);
     places.push([1,Math.PI / 1.5 ,-9 , 32.5]);
     places.push([1, -Math.PI / 1, 58, 0]);
     places.push([1,-Math.PI / 1.5 ,48 , -40]);
     places.push([1,Math.PI / 1.5 ,48 , 40]);
     //places.push([1, 140, 4.5, 6 ]);
 
         //Create instances from the first two that were built 
     const houses = [];
         for (let i = 0; i < places.length; i++) {
             if (places[i][0] === 1) {
                 houses[i] = detached_house.createInstance("house" + i);
             }
             else {
                 return;
             }
             houses[i].rotation.y = places[i][1];
             houses[i].position.x = places[i][2];
             houses[i].position.z = places[i][3];
             console.log(places[i][3])
         }
}


const buildGround = () =>{
  
    
    
 //ground
    const ground: Mesh =  MeshBuilder.CreateGround('ground', {width: 95, height: 111})

    //texture
    const groundMat: StandardMaterial = new StandardMaterial('groundMat', scene);
    groundMat.diffuseColor = new Color3(0.968, 0.741, 0.568);
    ground.position = new Vector3(30,0,0);
    ground.material = groundMat;

    const boxMat: StandardMaterial = new StandardMaterial('boxMat', scene);
    boxMat.diffuseColor = new Color3(0.756, 0.568, 0.968);
    
    const lampLight = new SpotLight("spotLight", new Vector3(0, 30, -10), new Vector3(0, -1, 0), Math.PI / 3, 2, scene);
    lampLight.diffuse = new Color3(0.187, 0.129, 0.129);
    lampLight.position = new Vector3(0, 70,0);

    const box: Mesh = MeshBuilder.CreateCapsule('box', {radius:5, capSubdivisions: 6, subdivisions:6, tessellation:36, height:17})
    box.position = new Vector3(-2.7, 9, 0);
    box.rotation = new Vector3(133.3, 0, 0)
    box.material = boxMat;
    
  
    const shadowGenerator00 = new ShadowGenerator(1024, lampLight);
    shadowGenerator00.getShadowMap().renderList.push(box);
    
    ground.receiveShadows = true;

    return ground;
  }
  
  const buildBox = () => {
    
     //box mesh
     const box: Mesh = MeshBuilder.CreateBox('box', {height: 35, width: 35, depth: 0.25});
     box.position = new Vector3(0, 17.5, -17.38);
     box.rotation.y = 0;
     
     //material
     const boxMat: StandardMaterial = new StandardMaterial('boxMat', scene);
     boxMat.diffuseColor = new Color3(0.941, 0.839, 0.839);
     box.material = boxMat;

     return box;
  }
  const lightSpheres = () => {
    
    
    

   

   
    const yellowMat: StandardMaterial = new StandardMaterial("yellowMat", scene);
    yellowMat.emissiveColor = new Color3(0.756, 0.568, 0.968);
    const greenMat: StandardMaterial = new StandardMaterial('greenMat',scene );
    greenMat.emissiveColor = new Color3(0.572, 0.964, 0.596);

    const bulb: Mesh = MeshBuilder.CreateSphere('bulb', {diameter: 13})
    bulb.position = new Vector3(0, 50, 0);
    bulb.material = yellowMat;
    
    const bulb2 = bulb.clone('lamplight')
    bulb2.position = new Vector3(-12, 30, 13);
    bulb2.parent = bulb;

    const bulb3 = bulb.createInstance('lamplight')
    bulb3.position = new Vector3(-12.000, 30, -11.571);
    bulb3.parent = bulb;

   
   
  
    
    //animation on lampLight
    // const frameRate = 12;

    // const xSlide: Animation = new Animation("xSlide", "position.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

    // const keyFrames = []; 

    // keyFrames.push({
    //     frame: 0,
    //     value: 17
    // });

    // keyFrames.push({
    //     frame: frameRate,
    //     value: -17
    // });

    // keyFrames.push({
    //     frame: 17 * frameRate,
    //     value: 17
    // });
    
    // xSlide.setKeys(keyFrames);
    
    // lampLight.animations.push(xSlide);
    

    // scene.beginAnimation(lampLight, 0, 17 * frameRate, true);
  
    return bulb;

  }

  const createTorus = () => {

    const orangeMat: StandardMaterial = new StandardMaterial("yellowMat", scene);
    orangeMat.emissiveColor = new Color3(0.274, 0.850, 0.945);

    const torus: Mesh = MeshBuilder.CreateTorusKnot('torus',{tube: 0.3, radialSegments: 150, p:5, q:2, radius: 10} )
    torus.position = new Vector3(0, 13, -30);
    torus.material = orangeMat;

    //drag behavior on torus knot in the z-axis
    const pointerDragBeh = new PointerDragBehavior({dragAxis: new Vector3(0,0,1)});

       // Listen to drag events
       pointerDragBeh.onDragStartObservable.add((event)=>{
        console.log("dragStart");
        console.log(event);
    })
    pointerDragBeh.onDragObservable.add((event)=>{
        console.log("drag");
        console.log(event);
    })
    pointerDragBeh.onDragEndObservable.add((event)=>{
        console.log("dragEnd");
        console.log(event);
    })
    
    torus.addBehavior(pointerDragBeh)
    return torus;
  }

  const createCapsule = () =>{

    const lampLight = createScene();
    const ground = buildBox();
    //emissive color
    const capMaterial: StandardMaterial = new StandardMaterial('capMat', scene);
    capMaterial.emissiveColor = new Color3(1, 0.549, 0.121)

    const capsule: Mesh = MeshBuilder.CreateCapsule('capsule', {radius:1, capSubdivisions: 6, subdivisions:6, tessellation:36, height:17});
    capsule.position = new Vector3(5, 9, 30)
    capsule.material = capMaterial;
    
   
    //putting action on capsule
    //fading visibility on click
    capsule.actionManager = new ActionManager(scene);

    capsule.actionManager.registerAction(
        new InterpolateValueAction(
            ActionManager.OnPickTrigger,
            capsule,
            "visibility",
            0.1,
            1000
            )
        )
        .then(new InterpolateValueAction(
            ActionManager.OnPickTrigger,
            capsule,
            "visibility",
            1.0,
            1000
            )
        );
    
    return capsule;
  }

  const createCylinder = () => {

    const cylMaterial: StandardMaterial = new StandardMaterial('capMat', scene);
    cylMaterial.emissiveColor = new Color3(0.176, 0.745, 0.572);

  const cylinder: Mesh = MeshBuilder.CreateCylinder("cylinder", {tessellation: 3, diameter: 10, height: 5}) 
  cylinder.position = new Vector3(50 ,5 , 40);
  cylinder.material = cylMaterial;

  

  const cyl2 = cylinder.createInstance('cylinder');
  cyl2.position = new Vector3(50 ,15 , 40);

  const cyl3 = cylinder.createInstance('cylinder');
  cyl3.position = new Vector3(50 ,25 , 40);

  return {cylinder};
  
  } 



createTorus();
lightSpheres();
buildTown();   
buildGround();
buildBox();
createScene();
createCapsule();
createCylinder();
        

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
    });
  
 
              scene.debugLayer.show({
                embedMode: true,
              });
    