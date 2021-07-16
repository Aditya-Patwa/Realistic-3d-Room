const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    // scene.clearColor = new BABYLON.Color4(0/255, 50/255, 255/255, 1);
    scene.clearColor = new BABYLON.Color3(25/255, 25/255, 25/255);
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 4, Math.PI / 2.5, 5, new BABYLON.Vector3(-0.5, 0, 0), scene);
    camera.attachControl(canvas, true);
    camera.upperBetaLimit = Math.PI / 2.2;
    camera.lowerBetaLimit = Math.PI / 5;
    camera.lowerAlphaLimit = Math.PI / 7.5;
    camera.upperAlphaLimit = Math.PI / 2.5;
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Creating Floor
    const floor = new BABYLON.MeshBuilder.CreateGround("floon", {height: 1, width: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE})
    floor.position.z = 0.5;
    floor.position.y = -1;
    const floorMat = new BABYLON.StandardMaterial("floorMat");
    floorMat.diffuseTexture = new BABYLON.Texture("assets/textures/wall/white-wall.jpg");
    floor.material = floorMat;

    // Creating First Wall
    const leftWall = BABYLON.MeshBuilder.CreatePlane("leftWall", {height:2, width: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    const leftWallMat = new BABYLON.StandardMaterial("leftWallMat");
    leftWallMat.diffuseTexture = new BABYLON.Texture("assets/textures/wall/black-wall.jpg")
    leftWall.material = leftWallMat;

    // Creating Second Wall
    const rightWall = BABYLON.MeshBuilder.CreatePlane("rightWall", {height:2, width: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    rightWall.rotation.y = Math.PI / 2;
    rightWall.position.x = -0.5;
    rightWall.position.z = 0.5;
    const rightWallMat = new BABYLON.StandardMaterial("rightWallMat");
    rightWallMat.diffuseTexture = new BABYLON.Texture("assets/textures/wall/white-wall.jpg")
    rightWall.material = rightWallMat;

    // Creating Table
    const shape = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(1.5, 0, 0),
        new BABYLON.Vector3(1.5, .25, 0),
        new BABYLON.Vector3(.25, .25, 0),
        new BABYLON.Vector3(.25, 5, 0),
        new BABYLON.Vector3(4.75, 5, 0),
        new BABYLON.Vector3(4.75, 5.25, 0),
        new BABYLON.Vector3(0, 5.25, 0),
        new BABYLON.Vector3(0, 0, 0)
    ];

    const table = new BABYLON.MeshBuilder.CreateLathe("table", {shape: shape, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    table.scaling = new BABYLON.Vector3(.09, .1, .09);
    table.position.z = .5;
    table.position.y = -1;
    const tableMat = new BABYLON.StandardMaterial("tableMat");
    tableMat.diffuseTexture = new BABYLON.Texture("assets/textures/wood/wood3.jpg")
    table.material = tableMat;

    // Creating Flower Pot for Table
    const flowerPot = BABYLON.SceneLoader.ImportMesh(null, "/assets/models/flowerpot/", "scene.gltf", scene, function (meshes) { 
        // Editing the mesh or meshes
        const mesh = meshes[0]; // Picking all meshes
        mesh.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
        mesh.position.z = 0.5;
        mesh.position.y = -0.5;
    });

    const roomCorner = BABYLON.Mesh.MergeMeshes([floor, leftWall, rightWall, table], true, false, null, false, true);

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function() {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});