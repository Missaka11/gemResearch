import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './3DModelView.css'

const ThreeDModelView = () => {
  const location = useLocation();
  const { item, prediction } = location.state || {}; // Retrieve item and prediction
  console.log(item, prediction);

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null); // Currently selected 3D model

  // Fetch 3D models from the backend
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/3dmodel/retrieve-models?category=${item}&subcategory=${prediction}`
        );
        const data = await response.json();

        if (response.ok) {
          setModels(data); // Store the list of models
          setSelectedModel(data[0]); // Set the first model as the default
          setLoading(false);
        } else {
          setError(data.error || 'Failed to fetch models');
          setLoading(false);
        }
      } catch (err) {
        setError('An error occurred while fetching models');
        setLoading(false);
      }
    };

    fetchModels();
  }, [item, prediction]);

  // Render GLTF/GLB Models in Three.js
  useEffect(() => {
    if (selectedModel) {
      const container = document.getElementById('threejs-container');
      container.innerHTML = ''; // Clear previous render

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(0, 2, 3); // Zoom in for a close view

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0xe0e0e0); // Light gray background
      container.appendChild(renderer.domElement);

      // Add lights for realism
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Bright ambient light
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);

      // Add OrbitControls for interaction
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.minDistance = 1;
      controls.maxDistance = 10;

      const loader = new GLTFLoader();

      const modelUrl = `http://127.0.0.1:5000${selectedModel.path}`;
      loader.load(
        modelUrl,
        (gltf) => {
          const modelScene = gltf.scene;

          // Adjust scale, position, and material for realism
          modelScene.scale.set(1.5, 1.5, 1.5);
          modelScene.position.set(0, 0, 0);
          modelScene.traverse((child) => {
            if (child.isMesh) {
              child.material.metalness = 0.9; // Enhance reflectivity
              child.material.roughness = 0.2; // Smooth the surface
              child.material.needsUpdate = true;
            }
          });

          scene.add(modelScene);
        },
        undefined,
        (error) => console.error(`Error loading model: ${selectedModel.filename}`, error)
      );

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // Update controls
        renderer.render(scene, camera);
      };

      animate();

      // Cleanup on component unmount
      return () => {
        renderer.dispose();
        controls.dispose();
      };
    }
  }, [selectedModel]);

  const handleThumbnailClick = (model) => {
    setSelectedModel(model); // Set the clicked model as the selected model
  };

  return (
    <div className="three-d-view-container">
      <h1>3D Models of {item}</h1>
      {loading && <p>Loading models...</p>}
      {error && <p>Error: {error}</p>}

      <div id="threejs-container" style={{ width: '600px', height: '400px', margin: '0 auto' }}></div>

      <div className="thumbnails-container">
        {models.map((model, index) => (
          <div
            key={index}
            className="thumbnail"
            style={{ border: selectedModel === model ? '2px solid blue' : '1px solid gray'}}
            onClick={() => handleThumbnailClick(model)}
          >
            <img
              src={`http://127.0.0.1:5000${model.thumbnailPath}`} // Backend should provide a thumbnail for each model
              alt={`Model ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDModelView;
