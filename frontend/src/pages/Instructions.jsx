import React, { useState } from "react";
import { ProgressBar, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/Instructions.css"; // Optional for custom styling
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

const InstructionsPage = () => {
  // Set the current step (0-5) to control the progress bar
  const [step, setStep] = useState(0);

  const navigate = useNavigate();
  // Instructions for each step
  const instructions = [
    "Step 1: Decide which path to take for gem identification: choose whether you want to identify the gem or classify it.",
    "Step 2: If you want to identify whether the gem is synthetic or real, choose the 'Gem Authentication' path.",
    "Step 3: If you want to identify the gem shape and get relevant 3D jewelry designs, choose the 'Jewelry Designs' path.",
    "Step 4: If you want to create your own jewelry, proceed to the 'Jewelry Customization' path for augmented reality options.",
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

            {/* <ProgressBar className="progress-bar"
              now={(step / instructions.length) * 100}
              label={`${step + 1} / ${instructions.length}`}
            /> */}

            <div className="instruction-step">
              <h4>Step {step + 1}</h4>
              <p>{instructions[step]}</p>
            </div>

            <div className="button-container">
              <Button
                variant="secondary"
                onClick={handlePrev}
                disabled={step === 0}
              >
                Previous
              </Button>

              <Button
                variant="primary"
                onClick={handleNext}
                disabled={step === instructions.length - 1}
              >
                Next
              </Button>
            </div>

            {/* Final Path Selection */}
            {step === instructions.length - 1 && (
              <div className="final-step">
                <h3>Choose Your Next Step</h3>
                <Button
                  variant="success"
                  onClick={() => navigate("/GemIdentification")}
                  className="m-2"
                >
                  Gem Identification
                </Button>
                <Button
                  variant="success"
                  onClick={() => navigate("/GemAuthenticate")}
                  className="m-2"
                >
                  Gem Authentication
                </Button>
                <Button
                  variant="success"
                  onClick={() => navigate("/GemShapeCapture")}
                  className="m-2"
                >
                  Jewelry Desings
                </Button>
                <Button variant="success" className="m-2">
                  Jewelry Customization
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InstructionsPage;
