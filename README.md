# Gemora: Gem Identification and Jewelry Designs

![Imgur](https://i.imgur.com/WHoCqFA.png)

## Project Overview

**Gemora** is an innovative deep learning-based web application tailored for the gemology industry. This cutting-edge tool leverages advanced image processing techniques and machine learning models to offer precise gemstone identification, classification, and personalized jewelry recommendations. Designed for gemologists, business professionals, and gemstone enthusiasts, Gemora enhances efficiency, accuracy, and user experience.

## Features

### **User Registration and Onboarding**

- **Account Creation**: Sign up using email, phone number, or social media accounts.
- **Introduction and Instructions**: Interactive tutorials guiding users through key functionalities.

1. **Gemstone Identification and Classification**

   - Utilizes convolutional neural networks (CNN) for identifying and classifying gemstones based on unique attributes like color, clarity, and inclusions.
   - Incorporates Mask R-CNN for precise segmentation and enhanced analysis.

2. **Gem Authenticity Verification**

   - Distinguishes between natural and synthetic gemstones using high-quality zoomed image analysis.

3. **Gemstone Measurement**

   - Employs OpenCV for accurate measurement of gemstone dimensions (length and width) using live image capture.

4. **Personalized Jewelry Recommendations**

   - Recommends optimal jewelry designs based on gemstone attributes such as shape, size, and clarity.
   - Features a virtual dressing room for users to visualize gemstones with recommended jewelry using 3D modeling and augmented reality.

5. **Advanced Technologies**
   - Built using React.js for the front-end and Python with TensorFlow/Keras for the backend.
   - Real-time image processing with white-box photography for accuracy.

## Technology Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Flask, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Machine Learning**: TensorFlow/PyTorch for AI-driven features
- **Version Control**: Git, GitHub

## Architecture

![Imgur](https://imgur.com/qJuS3Hg.png)

Gemora follows a User Friendly architecture, ensuring a seamless and scalable environment for web applications. The backend manages data storage, API endpoints, and business logic, while the frontend provides an intuitive user interface. Machine learning models are integrated into the backend to process and analyze data, delivering actionable insights to users.

## Installation

### Prerequisites

- **Flask**: [Download and Install](https://flask.palletsprojects.com/en/stable/installation/)
- **MongoDB**: [Download and Install](https://www.mongodb.com/)
- **ReactJs**: [Download and Install](https://www.npmjs.com/package/react)
- **Git**: [Download and Install](https://git-scm.com/)

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Missaka11/gemResearch.git
   cd gemResearch

   ```

2. Install Dependencies
3. Configure Environment Variables
4. Run the Server

### Frontend Setup

1. Navigate to Frontend Directory
2. Install Dependencies
3. Configure Environment Variables

```bash
 npm i
```

4. Run the Frontend

## Usage

### Register an Account

### Open the application in your browser.

- Click on "Sign Up" and create a new account using your email.

### After logging in, navigate to the dashboard.

- #### Gem Identification

  - Click on "Gem Identification".
  - Connect your DSLR or Mirror Less camera.
  - Capture and upload the image.
  - Give the Name and more information of the Gem.

- #### Gem Classification

  - Click on "Gem Classification".
  - Connect your DSLR or Mirror Less camera.
  - Capture and upload the image.
  - Give the Gem category as Real Gems or Synthetic Gems.

- #### Jewelry Designing Recommendation

  - Click on "Jewelry Design".
  - Connect your DSLR or Mirror Less camera.
  - Capture and upload the image.
  - Get shape of the Gem and Recommand the Best Jewelries according to the identified gem shape.

- #### Jewelry Design Creation
  - Click on "Design Your Own Jewelry".
  - Connect your DSLR or Mirror Less camera to see the live preview.
  - Open a Live preview and attach the jewelry to the user.
  - Customize the user Jewelry image with gems.

For any further assistance or inquiries, feel free to contact the development team at gevinduinduwara28@gmail.com
