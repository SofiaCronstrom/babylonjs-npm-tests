import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Material, StandardMaterial, Color3, Color4 } from "@babylonjs/core";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        const canvas = document.createElement("canvas");
        canvas.id = "gameCanvas";
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0.5, 0.8, 0.9);

        const camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 3, Math.PI / 2.5, 20, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);


         const groundColor: StandardMaterial = new StandardMaterial("groundColor", scene);
         groundColor.diffuseColor = new Color3(0.9, 0.8, 0);
         const sphereColor: StandardMaterial = new StandardMaterial("sphereColor",scene);
         sphereColor.diffuseColor = new Color3(1, 0.1, 0.1)

         const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
         sphere.position.x = 0;
         sphere.position.y = 0.40;
         sphere.material = sphereColor;
         const largeGround: Mesh = MeshBuilder.CreateGroundFromHeightMap("large Ground",
         "https://assets.babylonjs.com/environments/villageheightmap.png",
         {width:100, height:100, subdivisions: 20, minHeight: 0, maxHeight: 10})
         largeGround.material = groundColor;
        
            //hide/show the Inspector
            window.addEventListener("keydown", (ev) => {
                // Shift+Ctrl+Alt+I
                if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                    if (scene.debugLayer.isVisible()) {
                        scene.debugLayer.hide();
                        canvas.style.width = "auto"
                        canvas.style.height = "auto";
                    } else {
                        scene.debugLayer.show();
                    }
                }
            });
       
        

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();