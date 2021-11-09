import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Material, StandardMaterial, Color3, Color4} from "@babylonjs/core";



// class App {
//     constructor(){
const canvas = document.createElement("canvas");
canvas.id = "gameCanvas";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
document.body.appendChild(canvas);

// initialize babylon engine
const engine = new Engine(canvas, true);
  // create the canvas html element and attach it to the webpage
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.5, 0.8, 0.9);     
  

  const createScene = () => {
    
  const camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 19, Math.PI / 2.5, 20, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
   
}          
     
 const buildTown = () =>{
     const ground = buildGround();
         
     const detached_house = buildBox();
     detached_house.rotation.y = -Math.PI / 2;
     detached_house.position.x = -7.6;
     detached_house.position.z = 0;
         
             
     

     const places = []; //each entry is an array [house type, rotation, x, z]
     places.push([1, -Math.PI / 1, -0, 7.38]);
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
    const ground: Mesh =  MeshBuilder.CreateGround('ground', {width: 15, height: 15})

    //texture
    const groundMat: StandardMaterial = new StandardMaterial('groundMat', scene);
    groundMat.diffuseColor = new Color3(0.941, 0.796, 0.737);
    ground.material = groundMat;
  }
  
  const buildBox = () => {
    
     //world materials
     const box: Mesh = MeshBuilder.CreateBox('box', {height: 5, width: 15, depth: 0.25});
     box.position = new Vector3(0, 2.5, -7.38);
     box.rotation.y = 0;
     

     return box;
  }

 

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
