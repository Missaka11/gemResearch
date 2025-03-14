import React, { useState } from "react";
import { ProgressBar, Button, Container, Row, Col } from "react-bootstrap";
import '../styles/Instructions.css'; // Optional for custom styling
import { Header } from "../components/Header";

const InstructionsPage = () => {
  // Set the current step (0-5) to control the progress bar
  const [step, setStep] = useState(0);

  // Instructions for each step
  const instructions = [
    "Step 1: Connect your camera using an HDMI to mini-HDMI cable. Connect the mini-HDMI part to the camera and the HDMI part to the capture card.",
    "Step 2: Connect the capture card to your device. This will allow you to see the live preview of the camera.",
    "Step 3: Set up the white box with white background light. Position the camera correctly, focusing on the white box light for stability. Use a tripod if needed for better focus.",
    "Step 4: Decide which path to take for gem identification: choose whether you want to identify the gem or classify it.",
    "Step 5: If you want to identify whether the gem is synthetic or real, choose the 'Gem Classification' path.",
    "Step 6: If you want to identify the gem shape and get relevant 3D jewelry designs, choose the 'Gem Shape Identification' path.",
    "Step 7: If you want to create your own jewelry, proceed to the 'AR' path for augmented reality options."
  ];

  // Handle progressing to the next step
  const handleNext = () => {
    if (step < instructions.length - 1) {
      setStep(step + 1);
    }
  };

  // Handle going to the previous step
  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <>
     <Header />
    <div className="instructions-container">
      <Row className="my-5">
        <Col>
          <h2 className="instruction-topic">How it Works</h2>
          {/* <p>Follow the steps below to set up your camera and decide on your gem-related tasks.</p> */}

          <ProgressBar now={(step / instructions.length) * 100} label={`${step + 1} / ${instructions.length}`} />

          <div className="instruction-step">
            <h4>Step {step + 1}</h4>
            <p>{instructions[step]}</p>
          </div>

          <div className="button-container">
            <Button variant="secondary" onClick={handlePrev} disabled={step === 0}>
              Previous
            </Button>

            <Button variant="primary" onClick={handleNext} disabled={step === instructions.length - 1}>
              Next
            </Button>
          </div>

          {/* Final Path Selection */}
          {step === instructions.length - 1 && (
            <div className="final-step">
              <h3>Choose Your Next Step</h3>
              <Button variant="success" className="m-2">Gem Identification</Button>
              <Button variant="success" className="m-2">Gem Classification</Button>
              <Button variant="success" className="m-2">Gem Shape Identification</Button>
              <Button variant="success" className="m-2">AR Jewelry Creation</Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
    </>
  );
};

export default InstructionsPage;
