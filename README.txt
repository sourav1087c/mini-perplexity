# Mini Perplexity Q&A System

## Table of Contents
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
9. [Error Handling](#error-handling)
10. [Code Structure](#code-structure)
    - [Backend Code Explanation](#backend-code-explanation)
    - [Frontend Code Explanation](#frontend-code-explanation)
11. [Testing](#testing)
12. [Potential Areas for Improvement](#potential-areas-for-improvement)
13. [Conclusion](#conclusion)

## Project Overview
The Mini Perplexity Q&A System is a web application that allows users to ask questions and receive concise, accurate answers along with source citations. Inspired by Perplexity AI, this system integrates web search capabilities with advanced language models to provide users with informative responses backed by reliable sources.

## Features
- **User-Friendly Interface**: A clean and intuitive interface for users to input queries and view results.
- **Web Search Integration**: Utilizes the Google Custom Search API to fetch relevant search results.
- **Language Model Integration**: Employs OpenAI's GPT-3.5-turbo model to generate concise answers based on search results.
- **Source Citations**: Provides source references for each piece of information in the generated answer.
- **Light/Dark Theme Toggle**: Allows users to switch between light and dark themes for better accessibility.
- **Popular Questions Sidebar**: Features a sidebar with dynamically fetched popular questions to enhance user engagement.

## Technology Stack
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

## Architecture
The application follows a client-server architecture:
- **Frontend**: The React application handles the user interface, including input forms, displaying answers, and managing themes.
- **Backend**: The Express server processes user queries, performs web searches, interacts with the OpenAI API to generate answers, and returns the response to the frontend.

## Setup and Installation
### Prerequisites
- Node.js (v14.x or later)
- npm or yarn
- OpenAI API Key
- Google Custom Search API Key
- Google Search Engine ID

### Backend Setup
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/mini-perplexity-qa-system.git
    ```
2. **Navigate to Backend Directory**:
    ```bash
    cd mini-perplexity-qa-system/backend
    ```
3. **Install Dependencies**:
    ```bash
    npm install
    ```
4. **Create a `.env` File** in the backend directory with the following content:
    ```env
    OPENAI_API_KEY=your-openai-api-key
    GOOGLE_API_KEY=your-google-api-key
    SEARCH_ENGINE_ID=your-google-search-engine-id
    PORT=5000
    ```
5. **Run the Backend Server**:
    ```bash
    npm start
    ```
    The server should be running on `http://localhost:5000`.

### Frontend Setup
1. **Navigate to Frontend Directory**:
    ```bash
    cd ../frontend
    ```
2. **Install Dependencies**:
    ```bash
    npm install
    ```
3. **Create a `.env` File** in the frontend directory with the following content:
    ```env
    REACT_APP_API_BASE_URL=http://localhost:5000
    ```
4. **Run the Frontend Application**:
    ```bash
    npm start
    ```
    The application should be running on `http://localhost:3000`.

## Deployment
### Backend Deployment on Render
1. **Create a Render Account**: Sign up at [Render.com](https://render.com).
2. **Connect GitHub Repository**: Link your GitHub account and select the repository.
3. **Create a New Web Service**:
    - **Name**: `mini-perplexity-backend`
    - **Root Directory**: Set to `backend`
4. **Set Build and Start Commands**:
    - **Build Command**: 
        ```bash
        npm install
        ```
    - **Start Command**: 
        ```bash
        npm start
        ```
5. **Set Environment Variables**:
    - `OPENAI_API_KEY`
    - `GOOGLE_API_KEY`
    - `SEARCH_ENGINE_ID`
    - `PORT` (Optional, default is `5000`)
6. **Deploy the Service**: Click "Create Web Service" and wait for the deployment to complete.

### Frontend Deployment on Netlify
1. **Create a Netlify Account**: Sign up at [Netlify.com](https://netlify.com).
2. **Import Your Repository**: Choose your GitHub repository.
3. **Configure Build Settings**:
    - **Base Directory**: `frontend`
    - **Build Command**: 
        ```bash
        npm install && npm run build
        ```
    - **Publish Directory**: `build`
4. **Set Environment Variables**:
    - `REACT_APP_API_BASE_URL` set to your Render backend URL (e.g., `https://mini-perplexity-backend.onrender.com`)
5. **Deploy the Site**: Start the deployment and wait for it to complete.

## Usage Guidelines
1. **Access the Application**: Visit the deployed frontend URL (e.g., `https://your-site-name.netlify.app`).
2. **Ask a Question**:
    - Enter your query in the input field.
    - Click the "Submit" button.
3. **View the Answer**:
    - The generated answer will appear below the input field.
    - Source citations are provided with links to the original content.
4. **Use the Popular Questions Sidebar**:
    - Click on any popular question to populate it in the input field.
    - Optionally, the question can auto-submit.
5. **Toggle Theme**:
    - Use the theme toggle button in the header to switch between light and dark modes.

## Design Decisions and Challenges
### API Integration
- **Google Custom Search API** was chosen for its reliability and ease of use.
    - **Challenge**: Managing API quotas and ensuring efficient use of requests.
    - **Solution**: Implemented caching to store search results for repeated queries.

### Language Model Selection
- **OpenAI's GPT-3.5-turbo** model was used for answer generation.
    - **Challenge**: Handling API rate limits and costs.
    - **Solution**: Implemented error handling for rate limits and optimized prompts to minimize token usage.

### Source Citation
- **Approach**: Parsed search results to include titles and URLs.
    - **Challenge**: Ensuring the language model includes source numbers in the generated answer.
    - **Solution**: Crafted system prompts instructing the model to cite sources in square brackets.

## Error Handling
Implemented comprehensive error messages for user feedback. Used specific status codes and messages to differentiate between user and system errors.

## Code Structure
### Backend Code Explanation
- **File**: `backend/index.js`
    - **Imports**:
        - `dotenv` for environment variables.
        - `express` for server handling.
        - `cors` for Cross-Origin Resource Sharing.
        - `axios` for HTTP requests.
        - `openai` for interacting with OpenAI API.
    - **Environment Configuration**: Environment variables are loaded conditionally to avoid conflicts in production.
    - **Express App Setup**: Middleware includes `cors` and `express.json()`.
    - **Cache Implementation**: In-memory cache using a `Map` to store search results.
    - **Search Function**: `performSearch(query)` fetches search results from Google Custom Search API and caches results.
    - **Answer Generation Function**: `generateAnswer(question, searchResults)` interacts with OpenAI API.
    - **API Endpoint**: `POST /api/question` handles incoming queries and orchestrates search and answer generation.

### Frontend Code Explanation
- **File**: `frontend/src/App.js`
    - **Imports**: React hooks, Material-UI components, and custom components.
    - **State Management**: Manages question input, answer, sources, error messages, loading state, and theme mode.
    - **Theme Configuration**: Dynamic theme switching using Material-UI's theming.
    - **Event Handlers**: `handleSubmit` processes user questions, and `handleSelectPopularQuestion` updates question input.
    - **Rendering**: Uses grid layout with conditional rendering based on state.

## Testing
- **Unit Testing**: Tested functions like `performSearch` and `generateAnswer`.
- **Integration Testing**: Simulated full user interactions.
- **Error Scenarios**: Tested with invalid inputs, API failures, and network errors.
- **Responsive Design**: Verified the application across screen sizes.

## Potential Areas for Improvement
- **Database Integration**: Store popular questions dynamically based on user activity.
- **Enhanced Caching**: Use a more robust caching mechanism.
- **Pagination of Sources**: Implement pagination for source listings.
- **Improved Error Messages**: Provide more detailed feedback.
- **Security Enhancements**: Implement rate limiting.
- **Accessibility Improvements**: Meet WCAG standards.

## Conclusion
The Mini Perplexity Q&A System integrates web search capabilities with advanced language models to provide users with concise answers backed by reliable sources. Thoughtful design decisions and careful implementation offer a user-friendly experience, handling complexities like API integrations and error management effectively.
