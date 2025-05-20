import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../styles/GemShape3DModel.css";
import { Header } from "../components/Header";

const ThreeDModelView = () => {
  const location = useLocation();
  const { item, prediction, imageDataUrl } = location.state || {}; // Retrieve item and prediction
  const navigate = useNavigate();

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null); // Currently selected 3D model
  const [selectedColor, setSelectedColor] = useState(null);
  const jewelryMeshesRef = useRef([]);

  const paletteColors = [
    { name: "Gold", hex: "#D4AF37" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Rose Gold", hex: "#B76E79" },
    { name: "Platinum", hex: "#E5E4E2" },
    { name: "White Gold", hex: "#F5F5F5" },
    { name: "Bronze", hex: "#CD7F32" },
  ];

  // Fetch 3D models from the backend
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5005/3dmodel/retrieve-models?category=${item}&subcategory=${prediction}`
        );
        const data = await response.json();

        if (response.ok) {
          setModels(data); // Store the list of models
          setSelectedModel(data[0]); // Set the first model as the default
          setLoading(false);
        } else {
          setError(data.error || "Failed to fetch models");
          setLoading(false);
        }
      } catch (err) {
        setError("An error occurred while fetching models");
        setLoading(false);
      }
    };

    fetchModels();
  }, [item, prediction]);

  // Render GLTF/GLB Models in Three.js
  useEffect(() => {
    if (selectedModel) {
      const container = document.getElementById("threejs-container");
      container.innerHTML = ""; // Clear previous render

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
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

      const hemisphereLight = new THREE.HemisphereLight(
        0xffffff,
        0x444444,
        2.2
      ); // Additional illumination
      scene.add(hemisphereLight);

      // Add OrbitControls for interaction
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.minDistance = 1;
      controls.maxDistance = 10;

      const loader = new GLTFLoader();

      const modelUrl = `http://127.0.0.1:5005${selectedModel.path}`;
      loader.load(
        modelUrl,
        (gltf) => {
          const modelScene = gltf.scene;

          modelScene.scale.set(1.5, 1.5, 1.5);
          modelScene.position.set(0, 0, 0);

          let gemMesh = null;
          jewelryMeshesRef.current = []; // Clear previous mesh list

          modelScene.traverse((child) => {
            if (child.isMesh) {
              if (
                child.name === "base001" ||
                child.name === "model001" ||
                child.name === "model003"
              ) {
                gemMesh = child;
              } else {
                // Store non-gem meshes
                jewelryMeshesRef.current.push(child);
              }

              child.material.metalness = 0.8;
              child.material.roughness = 0.1;
              child.material.needsUpdate = true;
            }
          });

          // Apply uploaded image as texture to gemMesh only
          if (gemMesh && imageDataUrl) {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = imageDataUrl;

            image.onload = () => {
              const zoomFactor = 1.5;

              // Define the size of the cropped area
              const targetSize = 512;
              const canvas = document.createElement("canvas");
              canvas.width = targetSize;
              canvas.height = targetSize;
              const ctx = canvas.getContext("2d");

              // Calculate center crop and zoom
              const cropWidth = image.width / zoomFactor;
              const cropHeight = image.height / zoomFactor;
              const sx = (image.width - cropWidth) / 2;
              const sy = (image.height - cropHeight) / 2;

              ctx.drawImage(
                image,
                sx,
                sy,
                cropWidth,
                cropHeight, // source rect (zoomed area)
                0,
                0,
                targetSize,
                targetSize // destination rect (canvas full size)
              );

              const zoomedDataUrl = canvas.toDataURL("image/png");

              const textureLoader = new THREE.TextureLoader();
              textureLoader.load(zoomedDataUrl, (texture) => {
                gemMesh.material = new THREE.MeshStandardMaterial({
                  map: texture,
                  metalness: 0.4,
                  roughness: 0.2,
                  transparent: true,
                });
                gemMesh.material.needsUpdate = true;
              });
            };
          }

          scene.add(modelScene);
        },
        undefined,
        (error) => {
          console.error(
            `Error loading model: ${selectedModel.filename}`,
            error
          );
        }
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

  useEffect(() => {
    if (selectedColor && jewelryMeshesRef.current.length > 0) {
      jewelryMeshesRef.current.forEach((mesh) => {
        mesh.material.color = new THREE.Color(selectedColor);
        mesh.material.needsUpdate = true;
      });
    }
  }, [selectedColor]);

  const renderPreviewInCanvas = (canvas, modelUrl) => {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xefefef, 0); // transparent background

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, -0.1, 2);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(light);

    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.3);
        scene.add(model);

          model.traverse((child) => {
      if (child.isMesh) {
        // Apply gold or any default color
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#ffffff"), // Default gold
          metalness: 0.8,
          roughness: 0.1,
        });
        child.material.needsUpdate = true;
      }
    });

    scene.add(model);

        function animate() {
          requestAnimationFrame(animate);
          model.rotation.y += 0.01;
          renderer.render(scene, camera);
        }

        animate();
      },
      undefined,
      (error) => {
        console.error("Preview model loading error:", error);
      }
    );
  };

  const handleThumbnailClick = (model) => {
    setSelectedModel(model); // Set the clicked model as the selected model
  };

  const getModelDescription = (item) => {
    switch (item) {
      case "Earrings":
        return "Explore these beautifully crafted earrings, designed to add elegance to your look. Our earrings are made from high-quality materials.";

      case "Necklace":
        return "Discover our stunning necklaces, each one made with precision and care for ultimate elegance. From delicate chains to bold pendants.";

      case "Ring":
        return "A timeless symbol of commitment, explore the intricacy of these ring designs. Our rings feature intricate craftsmanship with attention to detail, combining traditional and modern styles.";

      case "Bracelet":
        return "Elegant bracelets that complement every outfit, with designs that shine. Our bracelets are designed to bring a touch of sophistication and grace to your wrist.";

      default:
        return "Explore our 3D models of exquisite jewelry items! Each piece is designed with precision and crafted with the finest materials. From rings to bracelets, necklaces to earrings, every model allows you to view these beautiful creations from every angle and envision how they will complement your style.";
    }
  };

  return (
    <>
      <Header />
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
      <div className="jewelry-detail-container">
        <h1 className="jewelry-title">
          <span className="title-highlight">{item}</span> Collection
        </h1>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your exquisite pieces...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        <div className="jewelry-view-layout">
          {/* Left section: 3D model viewer */}
          <div className="model-showcase">
            <div className="model-viewer" id="threejs-container"></div>

            <div className="model-controls">
              <div className="metal-selector">
                <h3>Select Metal Finish</h3>
                <div className="color-options">
                  {paletteColors.map((color) => (
                    <div
                      key={color.name}
                      className={`color-option ${
                        selectedColor === color.hex ? "selected" : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color.hex)}
                      title={color.name}
                    >
                      {selectedColor === color.hex && (
                        <span className="checkmark">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedModel && (
                <div className="model-info">
                  <p style={{ color: "rgb(7, 4, 53)" }}>
                    {getModelDescription(item)}
                  </p>
                  <button className="add-to-wishlist">
                    <span className="heart-icon">♥</span> Add to Wishlist
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right section: Model selection gallery */}
          <div className="model-selection">
            <h3>Available Designs</h3>
            <div className="thumbnails-grid">
              {models.map((model, index) => (
                <div
                  key={index}
                  className={`thumbnail-card ${
                    selectedModel === model ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(model)}
                >
                  <div className="thumbnail-image">
                    <canvas
                      ref={(el) => {
                        if (el) {
                          renderPreviewInCanvas(
                            el,
                            `http://127.0.0.1:5005${model.path}`
                          );
                        }
                      }}
                      width={200}
                      height={160}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                      }}
                    />
                    {selectedModel === model && (
                      <div className="selected-indicator"></div>
                    )}
                  </div>
                  <p className="thumbnail-name">
                    {model.name || `Design ${index + 1}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreeDModelView;
