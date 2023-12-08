"use strict";
import * as THREE from 'three';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
// TODO: importer les modules nécessaires
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';


// Kim Trinh
// Miliya Ai

//Chrome
//Lien vers le skybox: https://www.humus.name/index.php?page=Cubemap&item=Tantolunden

let scene, camera, renderer, canvas;  // Bases pour le rendu Three.js
// TODO: ajouter les variables nécessaires
let mesh, material, outlineEffect, controlsArcball;
let gl;   // The webgl context.
let ambientLight, directionalLight;

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
    }
    return result;
}

/* Création de la scène 3D */
function createScene() {
    scene = new THREE.Scene();
    // TODO: Compléter cette fonction
    ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera = new THREE.PerspectiveCamera( 100, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );
    camera.position.z = 5;


    outlineEffect = new OutlineEffect(renderer, { defaultThickness: 0.01, defaultColor: [0, 0, 0] });
    loadCubemapTexture(scene);
}

function loadCubemapTexture(scene) {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        "textures/negx.jpg",
        "textures/posx.jpg",
        "textures/negy.jpg",
        "textures/posy.jpg",
        "textures/negz.jpg",
        "textures/posz.jpg"
    ]);
    scene.background = texture;
}

function createMaterial(vertShader, fragShader){
    // TODO: Création du matériau Shader
    let meshMaterial = new THREE.ShaderMaterial({
        vertexShader: vertShader,
        fragmentShader: fragShader
        });
    return meshMaterial;
}

function animate() {     
    requestAnimationFrame(animate);
    
    renderer.render(scene, camera);
    // TODO: modifier pour utiliser un postprocessing
    outlineEffect.render(scene, camera);
}

function init() {
    try {
        canvas = document.getElementById("canvas");
        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
        renderer.setSize( canvas.clientWidth, canvas.clientHeight );
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML="<p><b>Sorry, an error occurred:<br>" +
            e + "</b></p>";
        return;
    }

    // TODO: Importation des textures
    const vertexShaderSource = loadFile("./tp3.vert");
    const fragmentShaderSource = loadFile("./tp3.frag");

    // Création de la scène 3D
    createScene();

    // Création du matériau shader
    material = new THREE.ShaderMaterial({
    uniforms: {
        lightPosition: { type: 'v4', value: new THREE.Vector4(0, 0, 0, 1) },
        diffuseColor: { type: 'v4', value: new THREE.Vector4(0.1, 0.5, 2, 1) },
	},
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
    transparent: true
    });

    // TODO: Importation du modèle 3D
    const loader = new STLLoader();
    loader.load('./model/AnnaElsaOlafUnion.stl', function (geometry) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(0, -2, 0);
        mesh.scale.set(0.03, 0.03, 0.03);
        scene.add(mesh);
    });

    // TODO: Ajout de l'interactivité avec la souris
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsArcball = new ArcballControls( camera, renderer.domElement, scene );

    //enlever trackball
    controlsArcball.addEventListener( 'passive', function () {
    
        renderer.render( scene, camera );
    
    } );
    
    controlsArcball.update();

    // TODO: Postprocessing

    // Animation de la scèene (appelée toutes les 30 ms)
    animate();
}

init();