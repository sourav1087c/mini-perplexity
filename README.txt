# **Mini Perplexity Q&A System**

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [Setup and Installation](#setup-and-installation)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
6. [Deployment](#deployment)
   - [Backend Deployment on Render](#backend-deployment-on-render)
   - [Frontend Deployment on Netlify](#frontend-deployment-on-netlify)
7. [Usage Guidelines](#usage-guidelines)
8. [Design Decisions and Challenges](#design-decisions-and-challenges)
   - [API Integration](#api-integration)
   - [Language Model Selection](#language-model-selection)
   - [Source Citation](#source-citation)
   - [Error Handling](#error-handling)
9. [Code Structure](#code-structure)
   - [Backend Code Explanation](#backend-code-explanation)
   - [Frontend Code Explanation](#frontend-code-explanation)
10. [Testing](#testing)
11. [Potential Areas for Improvement](#potential-areas-for-improvement)
12. [Conclusion](#conclusion)
13. [Additional Notes](#additional-notes)
14. [License](#license)
15. [Acknowledgments](#acknowledgments)
16. [Contact](#contact)

---

## **Project Overview**

The **Mini Perplexity Q&A System** is a web application that allows users to ask questions and receive concise, accurate answers along with source citations. Inspired by [Perplexity AI](https://www.perplexity.ai/), this system integrates web search capabilities with advanced language models to provide users with informative responses backed by reliable sources.

---

## **Features**

- **User-Friendly Interface**: A clean and intuitive interface for users to input queries and view results.
- **Web Search Integration**: Utilizes the Google Custom Search API to fetch relevant search results.
- **Language Model Integration**: Employs OpenAI's GPT-3.5-turbo model to generate concise answers based on search results.
- **Source Citations**: Provides source references for each piece of information in the generated answer.
- **Light/Dark Theme Toggle**: Allows users to switch between light and dark modes for better accessibility.
- **Popular Questions Sidebar**: Features a sidebar with dynamically fetched popular questions to enhance user engagement.

---

## **Technology Stack**

- **Frontend**:
  - React.js
  - Material-UI (MUI) for UI components
- **Backend**:
  - Node.js with Express.js
  - OpenAI API
  - Google Custom Search API
- **Deployment**:
  - Backend on Render
  - Frontend on Netlify

---

## **Architecture**

The application follows a client-server architecture:

- **Frontend**: The React application handles the user interface, including input forms, displaying answers, and managing themes.
- **Backend**: The Express server processes user queries, performs web searches, interacts with the OpenAI API to generate answers, and returns the response to the frontend.

---

## **Setup and Installation**

### **Prerequisites**

- **Node.js** (v14.x or later)
- **npm** or **yarn**
- **OpenAI API Key**
- **Google Custom Search API Key**
- **Google Search Engine ID**

### **Backend Setup**

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/mini-perplexity-qa-system.git
