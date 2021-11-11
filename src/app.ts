import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Material, StandardMaterial, Color3, Color4, SpotLight, WebXRExperienceHelper, FreeCamera, Animation} from "@babylonjs/core";



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
    
//   const camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 70, Math.PI / 2.5, 36, Vector3.Zero(), scene);
//    camera.attachControl(canvas, true);
const camera: FreeCamera = new FreeCamera("camera1", new Vector3(40, 9, 0), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);

  const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
  light1.intensity = 0.2
  
}          
     
 const buildTown = () =>{
     const ground = buildGround();
         
     const detached_house = buildBox();
     detached_house.rotation.y = -Math.PI / 2;
     detached_house.position.x = -17.6;
     detached_house.position.z = 0;
         
             
     

     const places = []; //each entry is an array [house type, rotation, x, z]
     places.push([1, -Math.PI / 1, -0, 17.38]);
     //places.push([1, -200, 9, -2]);
     //places.push([1, 300, 0.75, 6 ]);
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
    const ground: Mesh =  MeshBuilder.CreateGround('ground', {width: 35, height: 35})

    //texture
    const groundMat: StandardMaterial = new StandardMaterial('groundMat', scene);
    groundMat.diffuseColor = new Color3(0.968, 0.741, 0.568);
    ground.material = groundMat;

    return ground;
  }
  
  const buildBox = () => {
    
     //box mesh
     const box: Mesh = MeshBuilder.CreateBox('box', {height: 35, width: 35, depth: 0.25});
     box.position = new Vector3(0, 17.5, -17.38);
     box.rotation.y = 0;
     
     //material
     const boxMat: StandardMaterial = new StandardMaterial('boxMat', scene);
     boxMat.diffuseColor = new Color3(0.941, 0.796, 0.737);
     box.material = boxMat;

     return box;
  }
  const lightSpheres = () => {

    const lampLight: SpotLight = new SpotLight('lampLight', Vector3.Zero(), new Vector3(0, -1, 0), Math.PI, 1, scene)
    lampLight.diffuse = new Color3(0.756, 0.568, 0.968);
     

    const yellowMat: StandardMaterial = new StandardMaterial("yellowMat", scene);
    yellowMat.emissiveColor = new Color3(0.756, 0.568, 0.968);

    const bulb: Mesh = MeshBuilder.CreateSphere('bulb', {diameter: 17})
    bulb.position = new Vector3(-12, 10, 13);
    bulb.material = yellowMat;
    
    const bulb2 = bulb.createInstance('lamplight')
    bulb2.position = new Vector3(-12.000, 10.000, -11.571);
    
    const bulb3 = bulb.createInstance('lamplight')
    bulb3.position = new Vector3(-12.000, 18.271, 0.699);

    
    lampLight.parent = bulb3;
   

    
  

  
   
    const frameRate = 12;

    const xSlide: Animation = new Animation("xSlide", "position.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames = []; 

    keyFrames.push({
        frame: 0,
        value: 17
    });

    keyFrames.push({
        frame: frameRate,
        value: -17
    });

    keyFrames.push({
        frame: 17 * frameRate,
        value: 17
    });

    xSlide.setKeys(keyFrames);

    lampLight.animations.push(xSlide);

    scene.beginAnimation(lampLight, 0, 17 * frameRate, true);
  }


lightSpheres();
buildTown();   
buildGround();
buildBox();
createScene();
//buildTown();     
        

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
    });
  
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
          if (scene.debugLayer.isVisible()) {
              scene.debugLayer.hide();
          } else {
              scene.debugLayer.show({
                embedMode: true,
              });
          }
      }
  });