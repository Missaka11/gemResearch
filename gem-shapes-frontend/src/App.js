import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Result from './components/Result';
import Livereview from './components/Livereview'
import Preview from './components/Preview'
import ThreeDModelView from './components/3DModelView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/live-review" element={<Livereview/>} />
        <Route path="/preview" element={<Preview/>} />
        <Route path="/3d-view" element={<ThreeDModelView />} />
      </Routes>
    </Router>
  );
}

export default App;
