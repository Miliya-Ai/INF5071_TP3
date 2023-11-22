"use strict";
import * as THREE from 'three';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
// TODO: importer les modules nécessaires

let scene, camera, renderer;  // Bases pour le rendu Three.js
// TODO: ajouter les variables nécessaires

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
}

function createMaterial(vertShader, fragShader){
    // TODO: Création du matériau Shader
    meshMaterial = null;
    return meshMaterial;
}

function animate() {     
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // TODO: modifier pour utiliser un postprocessing
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
    
    // Création de la scène 3D
    createScene();

    // Création du matériau shader
    const vertexShaderSource = loadFile("./tp3.vert");
    const fragmentShaderSource = loadFile("./tp3.frag");
    let material = createMaterial(vertexShaderSource, fragmentShaderSource);

    // TODO: Importation du modèle 3D
    
    // TODO: Ajout de l'interactivité avec la souris

    // TODO: Postprocessing

    // Animation de la scèene (appelée toutes les 30 ms)
    animate();
}

init();