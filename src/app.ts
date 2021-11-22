import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as GUI from "@babylonjs/gui";
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
  scene.clearColor = new Color4(0, 0, 0);     
  


const createScene = () => {
    
  // const camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 120, Math.PI / 2.3, 100, Vector3.Zero(), scene);
  //  camera.attachControl(canvas, true);
const camera: FreeCamera = new FreeCamera("camera1", new Vector3(150, 20, -70), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);

const light = new SpotLight("spotLight", new Vector3(0, 30, -10), new Vector3(0, -1, 0), Math.PI / 3, 2, scene);
light.diffuse = new Color3(1, 0.945, 0.058);
light.position = new Vector3(0, 100,0);

  return camera;
  
}          
     
 const buildTown = () =>{
     const ground = buildGround();
         
     const detached_house = buildBox();
     detached_house.rotation.y = -Math.PI / 2;
     detached_house.position.x = -45;
     detached_house.position.z = 0;
         
             
     

     const places = []; //each entry is an array [house type, rotation, x, z]
     places.push([1, -Math.PI / 1, 87, 65.65]);
     places.push([1,-Math.PI / 1.5 ,-36 , -32.5]);
     places.push([1,Math.PI / 1.5 ,-36 , 32.5]);
     places.push([1, -Math.PI / 1, 87, 60.65]);
     places.push([1,-Math.PI / 1 ,87 , -55.43]);
     places.push([1,Math.PI / 1 ,87, 55.5]);
     places.push([1, Math.PI/1, 87, -65.65 ]);
 
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
         }
}
 const buildCapsule = () =>{
  
  const ground = buildGround().ground;
  const boxCopy = buildGround().box;
  

  boxCopy.position = new Vector3(4, 14, 3);

  const places = [];
  places.push([new Vector3(-1, 20, 28)]);
  places.push([new Vector3(-4.7, 30, 26)]);
  places.push([new Vector3(4.7, 32, 20)]);
  places.push([new Vector3(-1, 20, 15)]);
  places.push([new Vector3(-4.7, 30, 11)]);
  places.push([new Vector3(4.7, 32, 4)]);

  const boxes = [];
  for (let i = 0; i <places.length; i++){
   boxes[i] = boxCopy.createInstance('boxCopy' + i);

   boxes[i].position = places[i][0];
   
  }

  
 }



const buildGround = () =>{
  
    //ground
    const ground: Mesh =  MeshBuilder.CreateGround('ground', {width: 150, height: 111})
    
    //texture
    const groundMat: StandardMaterial = new StandardMaterial('groundMat', scene);
    groundMat.diffuseColor = new Color3(0.807, 0.568, 0.933);
    ground.position = new Vector3(30,0,0);
    ground.material = groundMat;
    

    const orangeMat: StandardMaterial = new StandardMaterial("yellowMat", scene);
    orangeMat.emissiveColor = new Color3(0.807, 0.568, 0.933);
    
    const greenMat: StandardMaterial = new StandardMaterial("yellowMat", scene);
    greenMat.emissiveColor = new Color3(1, 0.968, 0.058);
    greenMat.alpha = 0.5
    const boxMat: StandardMaterial = new StandardMaterial('boxMat', scene);
    boxMat.emissiveColor = new Color3(0.807, 0.568, 0.933);
    
    

    //Mesh
    const box: Mesh = MeshBuilder.CreateCapsule('box', {radius:2, capSubdivisions: 6, subdivisions:6, tessellation:36, height:17})
    box.position = new Vector3(-2.7, 9, 0);
    box.rotation = new Vector3(133.3, 11, 0)
    box.material = greenMat;

    const torus: Mesh = MeshBuilder.CreateTorusKnot('torus',{tube: 0.3, radialSegments: 170, p:8, q:5, radius: 15} )
    torus.position = new Vector3(0, 22, -1.3);
    torus.rotation = new Vector3(0, 11, 0)
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
        
    })
    
    torus.addBehavior(pointerDragBeh)

   

    return {ground, box};



  }
  const createCapsule = () =>{
    


    const light = new SpotLight("potLight", new Vector3(0, 30, -10), new Vector3(0, -1, 0), Math.PI / 3, 2, scene);
    light.diffuse = new Color3(0.729, 0.058, 1);
    light.position = new Vector3(90, 90, 41);
  
    //emissive color
    const capMaterial: StandardMaterial = new StandardMaterial('capMat', scene);
    capMaterial.emissiveColor = new Color3(0.807, 0.568, 0.933)
  
    const capsule: Mesh = MeshBuilder.CreateCapsule('capsule', {radius:1, capSubdivisions: 6, subdivisions:6, tessellation:36, height:17});
    capsule.position = new Vector3(90 ,10 , -40)
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
        
  }
  
  const buildBox = () => {
    
     //box mesh
     const box: Mesh = MeshBuilder.CreateBox('box', {height: 35, width: 35, depth: 0.25});
     box.position = new Vector3(87, 17.41, -60.65);
     box.rotation.y = 0;
     
     //material
     const boxMat: StandardMaterial = new StandardMaterial('boxMat', scene);
     boxMat.diffuseColor = new Color3(0.807, 0.568, 0.933);
     box.material = boxMat;

     return box;
  }
  const lightSpheres = () => {
    
    const yellowMat: StandardMaterial = new StandardMaterial("yellowMat", scene);
    yellowMat.emissiveColor = new Color3(0.917, 0.792, 0.968);
    

    const bulb: Mesh = MeshBuilder.CreateSphere('bulb', {diameter: 13})
    bulb.position = new Vector3(0, 70, 0);
    bulb.material = yellowMat;
    
    return bulb;

  }



  const createCylinder = () => {

    const light = new SpotLight("otLight", new Vector3(0, 30, -10), new Vector3(0, -1, 0), Math.PI / 3, 2, scene);
    light.diffuse = new Color3(1, 0.568, 0.058);
    light.position = new Vector3(90, 90, -41);
   
  const manager = new GUI.GUI3DManager(scene);


  const cylMaterial: StandardMaterial = new StandardMaterial('capMat', scene);
  cylMaterial.emissiveColor = new Color3(0.807, 0.568, 0.933);

  const greenMat: StandardMaterial = new StandardMaterial('greenMat',scene );
  greenMat.emissiveColor = new Color3(0.572, 0.964, 0.596);

  const cylinder: Mesh = MeshBuilder.CreateCylinder("cylinder", {tessellation: 3, diameter: 10, height: 5}) 
  cylinder.position = new Vector3(90 ,5 , 40);
  cylinder.material = cylMaterial;

  const cyl2 = cylinder.createInstance('cylinder');
  cyl2.position = new Vector3(90 ,15 , 40);

  const cyl3 = cylinder.createInstance('cylinder');
  cyl3.position = new Vector3(90 ,25 , 40);
  const cyls = [];
  cyls.push([cylinder, cyl2, cyl3]);
  
  // const panel = new GUI.CylinderPanel();
  //   panel.margin = 0.75;
 
  //   manager.addControl(panel);
  //   panel.linkToTransformNode(anchor);
  //   panel.position.z = -1.5;
  const button = new GUI.MeshButton3D(cylinder, "button");
 
  manager.addControl(button);
  button.pointerDownAnimation = () => {
    cylinder.material = greenMat;
  };
  button.pointerUpAnimation = () => {
    cylinder.material = cylMaterial;
  };
  // button.pointerOutAnimation = () => {
  //   //cylinder.material = new Color3(0.5, 0.19, 0);
  // };

  

  console.log(button)
  
  } 

  // const guiButton = () => {

  //   const manager = new GUI.GUI3DManager(scene);

  //   const panel = new GUI.StackPanel3D();
  //   panel.margin = 0.05;

  //   manager.addControl(panel);
  //   panel.position = new Vector3(90 ,5 , 20);
  //   panel.scaling = new Vector3(5, 5, 5)
  //   const addButton = function () {

  //   const cylMaterial: StandardMaterial = new StandardMaterial('capMat', scene);
  //   cylMaterial.emissiveColor = new Color3(0.807, 0.568, 0.933);

  //   const button = new GUI.Button3D("orientation");
    
  //   panel.addControl(button);
  //   button.onPointerUpObservable.add(() =>{
  //   panel.isVertical = !panel.isVertical;
  //   });

  //   const text = new GUI.TextBlock();
  //   text.text = "*";
  //   text.fontSize = 54;
  //   text.color = "red";
  //   button.content = text;
    
  // }
  // addButton();
  // addButton();
  // addButton();
  // }

//guiButton();
buildCapsule();
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
    