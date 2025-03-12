import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../styles/GemShape3DModel.css';
import { Header } from "../components/Header";

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
      renderer.setClearColor(0xefefef); // Light gray background
      container.appendChild(renderer.domElement);

      // Add lights for realism
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.1); // Bright ambient light
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 4.0); // Strong directional light
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);

      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2.2); // Additional illumination
      scene.add(hemisphereLight);

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
              child.material.metalness = 0.8; // Enhance reflectivity
              child.material.roughness = 0.1; // Smooth the surface
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

  const getModelDescription = (item) => {
    switch (item) {
      case 'Earrings':
        return "Explore these beautifully crafted earrings, designed to add elegance to your look. Our earrings are made from high-quality materials, featuring unique designs that range from classic to contemporary styles. Whether you're looking for a statement piece or something more subtle, our earrings will complement any outfit and enhance your natural beauty. Ideal for both casual wear and special occasions.";
      
      case 'Necklace':
        return "Discover our stunning necklaces, each one made with precision and care for ultimate elegance. From delicate chains to bold pendants, our collection offers a variety of designs that are perfect for every occasion. Whether you prefer timeless gold or modern, minimalistic pieces, our necklaces are crafted to be a reflection of your style and personality. Make a lasting impression with these exquisite pieces that speak sophistication.";
      
      case 'Ring':
        return "A timeless symbol of commitment, explore the intricacy of these ring designs. Our rings feature intricate craftsmanship with attention to detail, combining traditional and modern styles. From engagement rings to fashion pieces, each ring is made with the finest materials, including diamonds, gemstones, and precious metals. Whether for a proposal, anniversary, or just because, these rings are the perfect expression of love and elegance.";
      
      case 'Bracelet':
        return "Elegant bracelets that complement every outfit, with designs that shine. Our bracelets are designed to bring a touch of sophistication and grace to your wrist. From simple bangles to detailed charm bracelets, each piece is made with the utmost care and high-quality materials. Whether you're looking for a casual piece to wear every day or a bold statement bracelet for a special occasion, you'll find the perfect match here.";
      
      default:
        return "Explore our 3D models of exquisite jewelry items! Each piece is designed with precision and crafted with the finest materials. From rings to bracelets, necklaces to earrings, every model allows you to view these beautiful creations from every angle and envision how they will complement your style.";
    }
  };
  

  return (
    <>
       <Header />
    <div className="three-d-view-container">
  <h1 className="synonymtopic">3D Models of {item}</h1>
  
  {loading && <p>Loading models...</p>}
  {error && <p>Error: {error}</p>}

  <div className="three-d-view">
    {/* Left section: 3D model container */}
    <div className="model-container">
      <div
        id="threejs-container"
        style={{
          width: '800px',
          height: '600px', 
          margin: '0 auto',
          backgroundColor: '#efefef',
          border: '1px solidrgba(109, 111, 112, 0.82)'
        }}
      ></div>
      
      {/* Description based on selected item */}
      <p className="model-description">{getModelDescription(item)}</p>
    </div>

    {/* Right section: Thumbnails container */}
    <div className="thumbnails-container">
      {models.map((model, index) => (
        <div
          key={index}
          className="thumbnail"
          style={{ border: selectedModel === model ? '3px solid rgb(12, 189, 36)' : '1px solid gray'}}
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
</div>
    </>
  );
};

export default ThreeDModelView;
