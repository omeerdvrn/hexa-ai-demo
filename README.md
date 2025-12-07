# Hexa AI Demo

## Features

- **Real-time Generation Workflow:** Handles `Idle` -> `Processing` -> `Done/Failed` states using Firestore listeners.
- **Surprise Me Feature:** Random prompt selection from curated preset list for quick logo generation.
- **Multiple Logo Styles:** Support for No Style, Monogram, Abstract, and Mascot style options.
- **Copy to Clipboard:** Native clipboard integration for easy sharing of prompt.
- **Robust Error Handling:** Simulates random failures (~20% chance) to demonstrate error state management.
- **Firebase Storage Integration:** Automated image storage and retrieval with public URL generation.
- **Event-Driven Architecture:** Real-time Firestore listeners (`onSnapshot`) provide instant UI updates based on backend state changes, eliminating the need for HTTP polling.
- **Mock AI Integration:** Uses external image services (Picsum) with simulated AI processing delays and failure scenarios for realistic testing.
- **Full Generation Lifecycle:** Complete workflow from prompt input through processing states to final image storage and retrieval.
- **Retry Logic:** Built-in retry functionality handles failed generations gracefully.
- **Cross-Platform Support:** Runs seamlessly on iOS, Android, and Web via Expo.
- **Last Job Fetch:** Fetchs last job on mounted and if not finished/seen shows status chip to user

## Architecture

The app follows an event-driven architecture, strictly separating frontend concerns from backend logic:

1. **State Management:** Frontend uses a reactive approach. It creates a document in Firestore and sets up a real-time listener (`onSnapshot`). The UI state (`processing`, `done`, `failed`) is driven purely by database changes, not local timers.
2. **Backend Logic:** Firebase Cloud Functions handle the generation pipeline.
   - **Trigger:** Detects new job creation (`on_document_created`) when Create button is tapped.
   - **Generation:** Calls external image services with simulated processing delays and manages timeouts/errors.
   - **Storage:** Saves the image data to Firebase Storage and updates Firestore with the public URL.

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v18+) & npm/yarn
- Python 3.11+
- Firebase CLI
- Expo Go app (for testing on device)
- Git

### 1. Frontend Setup

```bash
# Clone the repository
git clone https://github.com/omeerdvrn/hexa-ai-demo
cd hexa-ai-demo

# Install frontend dependencies
cd frontend
npm install

# Start the development server
npx expo start
```

### 2. Backend Setup (Cloud Functions)

#### Step 1: Python Environment Setup

```bash
cd backend/functions

# For Windows
python -m venv venv
venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Step 2: Firebase Project Setup & Deploy

```bash
# Login to Firebase
firebase login

# Select or create project
firebase use --add

# Deploy functions
firebase deploy --only functions
```

## 🗄️ Database Structure

### Firestore Collections

#### `jobs`

```javascript
{
  id: "job_id",
  userId: "user_id",
  prompt: "Logo prompt text",
  style: 1, // 0: No Style, 1: Monogram, 2: Abstract, 3: Mascot
  status: "pending", // pending, processing, completed, failed
  resultUrl: "generated_image_url",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Usage Flow

1. **Create Logo**: Navigate to the AI Logo section
2. **Enter Prompt**: Describe your desired logo or use "Surprise Me"
3. **Select Style**: Choose from available logo styles (No Style, Monogram, Abstract, Mascot)
4. **Generate**: Tap "Create" to start real-time generation
5. **Track Progress**: Monitor live status updates via Firestore listeners
6. **Copy Prompt**: Use native clipboard integration to copy the prompt

## Technical Implementation

### Frontend Architecture

- **State Management**: React hooks with real-time Firestore listeners
- **Navigation**: Expo Router for file-based routing
- **Styling**: React Native StyleSheet API for pixel-perfect design
- **Authentication**: Firebase Anonymous Auth for frictionless access

### Backend Architecture

- **Functions**: Python 3.13 Firebase Cloud Functions
- **Triggers**: Firestore document creation triggers
- **Storage**: Firebase Storage for image persistence
- **Processing**: Simulated AI delays with random failure scenarios

### Key Features Implementation

- **Surprise Me**: Random selection from 16 curated preset prompts
- **Retry Logic**: Automatic retry capability for failed generations
- **Real-time Updates**: Firestore `onSnapshot` listeners for instant UI updates
- **Error Handling**: Graceful failure management with user feedback

## Trade-offs & Design Decisions

- **Styling Approach:** Used React Native's built-in `StyleSheet` API instead of utility libraries like NativeWind for zero dependencies and full control over the design implementation.
- **Auth Strategy:** Implemented **Firebase Anonymous Auth** for frictionless demo experience rather than requiring user registration.
- **Image Generation:** Uses Picsum Photos with simulated processing delays instead of actual AI APIs to ensure reliable demo functionality without API key dependencies.

## Known Limitations & Future Improvements

If given more time, focus areas would include:

1. **Real AI Integration:** Replace mock image generation with actual AI services (DALL-E, Midjourney, etc.)
2. **User History:** Add persistent user history to track past generations
3. **Enhanced UI/UX:** Implement skeleton loaders and micro-interactions
4. **Performance Optimization:** Add image caching and lazy loading
5. **Testing Suite:** Comprehensive unit and integration tests

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm run lint        # ESLint code quality checks
npm run typecheck   # TypeScript type validation
npm run format      # Prettier code formatting
```

### Backend Testing

```bash
cd backend/functions
python -m pytest   # Run test suite (if configured)
```
- **Real-time Generation Workflow:** Handles `Idle` -> `Processing` -> `Done/Failed` states using Firestore listeners.
- **Surprise Me Feature:** Random prompt selection from curated preset list for quick logo generation.
- **Multiple Logo Styles:** Support for No Style, Monogram, Abstract, and Mascot style options.
- **Copy to Clipboard:** Native clipboard integration for easy sharing of prompt.
- **Robust Error Handling:** Simulates random failures (~20% chance) to demonstrate error state management.
- **Firebase Storage Integration:** Automated image storage and retrieval with public URL generation.
- **Event-Driven Architecture:** Real-time Firestore listeners (`onSnapshot`) provide instant UI updates based on backend state changes, eliminating the need for HTTP polling.
- **Mock AI Integration:** Uses external image services (Picsum) with simulated AI processing delays and failure scenarios for realistic testing.
- **Full Generation Lifecycle:** Complete workflow from prompt input through processing states to final image storage and retrieval.
- **Retry Logic:** Built-in retry functionality handles failed generations gracefully.
- **Cross-Platform Support:** Runs seamlessly on iOS, Android, and Web via Expo.
- **Last Job Fetch:** Fetchs last job on mounted and if not finished/seen shows status chip to user

## Architecture

The app follows an event-driven architecture, strictly separating frontend concerns from backend logic:

1. **State Management:** Frontend uses a reactive approach. It creates a document in Firestore and sets up a real-time listener (`onSnapshot`). The UI state (`processing`, `done`, `failed`) is driven purely by database changes, not local timers.
2. **Backend Logic:** Firebase Cloud Functions handle the generation pipeline.
   - **Trigger:** Detects new job creation (`on_document_created`) when Create button is tapped.
   - **Generation:** Calls external image services with simulated processing delays and manages timeouts/errors.
   - **Storage:** Saves the image data to Firebase Storage and updates Firestore with the public URL.

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v18+) & npm/yarn
- Python 3.11+
- Firebase CLI
- Expo Go app (for testing on device)
- Git

### 1. Frontend Setup

```bash
# Clone the repository
git clone https://github.com/omeerdvrn/hexa-ai-demo
cd hexa-ai-demo

# Install frontend dependencies
cd frontend
npm install

# Start the development server
npx expo start
```

### 2. Backend Setup (Cloud Functions)

#### Step 1: Python Environment Setup

```bash
cd backend/functions

# For Windows
python -m venv venv
venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Step 2: Firebase Project Setup & Deploy

```bash
# Login to Firebase
firebase login

# Select or create project
firebase use --add

# Deploy functions
firebase deploy --only functions
```

## 🗄️ Database Structure

### Firestore Collections

#### `jobs`

```javascript
{
  id: "job_id",
  userId: "user_id",
  prompt: "Logo prompt text",
  style: 1, // 0: No Style, 1: Monogram, 2: Abstract, 3: Mascot
  status: "pending", // pending, processing, completed, failed
  resultUrl: "generated_image_url",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Usage Flow

1. **Create Logo**: Navigate to the AI Logo section
2. **Enter Prompt**: Describe your desired logo or use "Surprise Me"
3. **Select Style**: Choose from available logo styles (No Style, Monogram, Abstract, Mascot)
4. **Generate**: Tap "Create" to start real-time generation
5. **Track Progress**: Monitor live status updates via Firestore listeners
6. **Copy Prompt**: Use native clipboard integration to copy the prompt

## Technical Implementation

### Frontend Architecture

- **State Management**: React hooks with real-time Firestore listeners
- **Navigation**: Expo Router for file-based routing
- **Styling**: React Native StyleSheet API for pixel-perfect design
- **Authentication**: Firebase Anonymous Auth for frictionless access

### Backend Architecture

- **Functions**: Python 3.13 Firebase Cloud Functions
- **Triggers**: Firestore document creation triggers
- **Storage**: Firebase Storage for image persistence
- **Processing**: Simulated AI delays with random failure scenarios

### Key Features Implementation

- **Surprise Me**: Random selection from 16 curated preset prompts
- **Retry Logic**: Automatic retry capability for failed generations
- **Real-time Updates**: Firestore `onSnapshot` listeners for instant UI updates
- **Error Handling**: Graceful failure management with user feedback

## Trade-offs & Design Decisions

- **Styling Approach:** Used React Native's built-in `StyleSheet` API instead of utility libraries like NativeWind for zero dependencies and full control over the design implementation.
- **Auth Strategy:** Implemented **Firebase Anonymous Auth** for frictionless demo experience rather than requiring user registration.
- **Image Generation:** Uses Picsum Photos with simulated processing delays instead of actual AI APIs to ensure reliable demo functionality without API key dependencies.

## Known Limitations & Future Improvements

If given more time, focus areas would include:

1. **Real AI Integration:** Replace mock image generation with actual AI services (DALL-E, Midjourney, etc.)
2. **User History:** Add persistent user history to track past generations
3. **Enhanced UI/UX:** Implement skeleton loaders and micro-interactions
4. **Performance Optimization:** Add image caching and lazy loading
5. **Testing Suite:** Comprehensive unit and integration tests

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm run lint        # ESLint code quality checks
npm run typecheck   # TypeScript type validation
npm run format      # Prettier code formatting
```

```bash
cd backend/functions
python -m pytest   # Run test suite (if configured)
```
- **Real-time Generation Workflow:** Handles `Idle` -> `Processing` -> `Done/Failed` states using Firestore listeners.
- **Surprise Me Feature:** Random prompt selection from curated preset list for quick logo generation.
- **Multiple Logo Styles:** Support for No Style, Monogram, Abstract, and Mascot style options.
- **Copy to Clipboard:** Native clipboard integration for easy sharing of prompt.
- **Robust Error Handling:** Simulates random failures (~20% chance) to demonstrate error state management.
- **Firebase Storage Integration:** Automated image storage and retrieval with public URL generation.
- **Event-Driven Architecture:** Real-time Firestore listeners (`onSnapshot`) provide instant UI updates based on backend state changes, eliminating the need for HTTP polling.
- **Mock AI Integration:** Uses external image services (Picsum) with simulated AI processing delays and failure scenarios for realistic testing.
- **Full Generation Lifecycle:** Complete workflow from prompt input through processing states to final image storage and retrieval.
- **Retry Logic:** Built-in retry functionality handles failed generations gracefully.
- **Cross-Platform Support:** Runs seamlessly on iOS, Android, and Web via Expo.
- **Last Job Fetch:** Fetchs last job on mounted and if not finished/seen shows status chip to user

## Architecture

The app follows an event-driven architecture, strictly separating frontend concerns from backend logic:

1. **State Management:** Frontend uses a reactive approach. It creates a document in Firestore and sets up a real-time listener (`onSnapshot`). The UI state (`processing`, `done`, `failed`) is driven purely by database changes, not local timers.
2. **Backend Logic:** Firebase Cloud Functions handle the generation pipeline.
   - **Trigger:** Detects new job creation (`on_document_created`) when Create button is tapped.
   - **Generation:** Calls external image services with simulated processing delays and manages timeouts/errors.
   - **Storage:** Saves the image data to Firebase Storage and updates Firestore with the public URL.

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v18+) & npm/yarn
- Python 3.11+
- Firebase CLI
- Expo Go app (for testing on device)
- Git

### 1. Frontend Setup

```bash
# Clone the repository
git clone https://github.com/omeerdvrn/hexa-ai-demo
cd hexa-ai-demo

# Install frontend dependencies
cd frontend
npm install

# Start the development server
npx expo start
```

### 2. Backend Setup (Cloud Functions)

#### Step 1: Python Environment Setup

```bash
cd backend/functions

# For Windows
python -m venv venv
venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Step 2: Firebase Project Setup & Deploy

```bash
# Login to Firebase
firebase login

# Select or create project
firebase use --add

# Deploy functions
firebase deploy --only functions
```

## 🗄️ Database Structure

### Firestore Collections

#### `jobs`

```javascript
{
  id: "job_id",
  userId: "user_id",
  prompt: "Logo prompt text",
  style: 1, // 0: No Style, 1: Monogram, 2: Abstract, 3: Mascot
  status: "pending", // pending, processing, completed, failed
  resultUrl: "generated_image_url",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Usage Flow

1. **Create Logo**: Navigate to the AI Logo section
2. **Enter Prompt**: Describe your desired logo or use "Surprise Me"
3. **Select Style**: Choose from available logo styles (No Style, Monogram, Abstract, Mascot)
4. **Generate**: Tap "Create" to start real-time generation
5. **Track Progress**: Monitor live status updates via Firestore listeners
6. **Copy Prompt**: Use native clipboard integration to copy the prompt

## Technical Implementation

### Frontend Architecture

- **State Management**: React hooks with real-time Firestore listeners
- **Navigation**: Expo Router for file-based routing
- **Styling**: React Native StyleSheet API for pixel-perfect design
- **Authentication**: Firebase Anonymous Auth for frictionless access

### Backend Architecture

- **Functions**: Python 3.13 Firebase Cloud Functions
- **Triggers**: Firestore document creation triggers
- **Storage**: Firebase Storage for image persistence
- **Processing**: Simulated AI delays with random failure scenarios

### Key Features Implementation

- **Surprise Me**: Random selection from 16 curated preset prompts
- **Retry Logic**: Automatic retry capability for failed generations
- **Real-time Updates**: Firestore `onSnapshot` listeners for instant UI updates
- **Error Handling**: Graceful failure management with user feedback

## Trade-offs & Design Decisions

- **Styling Approach:** Used React Native's built-in `StyleSheet` API instead of utility libraries like NativeWind for zero dependencies and full control over the design implementation.
- **Auth Strategy:** Implemented **Firebase Anonymous Auth** for frictionless demo experience rather than requiring user registration.
- **Image Generation:** Uses Picsum Photos with simulated processing delays instead of actual AI APIs to ensure reliable demo functionality without API key dependencies.

## Known Limitations & Future Improvements

If given more time, focus areas would include:

1. **Real AI Integration:** Replace mock image generation with actual AI services (DALL-E, Midjourney, etc.)
2. **User History:** Add persistent user history to track past generations
3. **Enhanced UI/UX:** Implement skeleton loaders and micro-interactions
4. **Performance Optimization:** Add image caching and lazy loading
5. **Testing Suite:** Comprehensive unit and integration tests

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm run lint        # ESLint code quality checks
npm run typecheck   # TypeScript type validation
npm run format      # Prettier code formatting
```

### Backend Testing

```bash
cd backend/functions
python -m pytest   # Run test suite (if configured)
```

## 🚀 Deployment

### Frontend Deployment

```bash
cd frontend
expo build:web      # Build for web deployment
# Deploy to hosting service (Netlify, Vercel, etc.)
```

### Backend Deployment

```bash
firebase deploy --only functions,firestore:rules,firestore:indexes
```

## 🔍 Monitoring & Performance

- **Firebase Console**: Real-time function execution monitoring
- **Firestore**: Database performance and usage metrics
- **Storage**: Image upload and retrieval analytics
