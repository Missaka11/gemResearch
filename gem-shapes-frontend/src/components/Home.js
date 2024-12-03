import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Home = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('imagefile', image);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-gem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      setPrediction(response.data);
    
      setLoading(false);

      // Use navigate to redirect to the result page
      navigate('/result', { state: { prediction: response.data } });  // navigate() replaces history.push()
    } catch (error) {
      setLoading(false);
      setError('Failed to classify the gem. Please try again.');
    }
  };

  return (
    <div>
      <h1>Upload Gem Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Classifying...' : 'Classify Gem'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prediction && (
        <div>
          <h2>Predicted Gem Shape: {prediction}</h2>
        </div>
      )}
    </div>
  );
};

export default Home;

