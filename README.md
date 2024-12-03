# Timeseries backend

## **Project Documentation**

### **1. Project Overview**

This project implements a caching system for fetching and managing time-series data using Node.js and Express. It includes:

- **API Endpoint**: Fetch data for a given `symbol`, `period`, `start`, and `end`.
- **Caching Mechanism**: Uses `node-cache` for efficient in-memory caching.
- **Error Handling**: Implements structured error handling with global error middleware.
- **Logging**: Logs all critical operations using `winston`.
- **External API Simulation**: Uses `json-server` for mocking the external API.

---

### **2. Features**

1. **Efficient Data Caching**:
   - Reduces redundant API calls.
   - Supports partial cache hits and expiration (default TTL: 10 minutes).
2. **Scalable Code Structure**:
   - Organized into services, controllers, and routes.
3. **Error Handling**:
   - Handles API errors, invalid inputs, and uncaught exceptions.
4. **Graceful Shutdown**:
   - Cleans up resources (e.g., flushing cache) during termination signals.
5. **Testing**:
   - Includes unit tests for utilities, services, and API endpoints.
6. **Dockerization**:
   - Fully containerized for local development and testing.

---

### **3. Setup Instructions**

### **Local Setup**

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Set Up Environment Variables**:
    Create a `.env` file in the root directory:
    `PORT=8080`
3.  **Run the Mock Server**:
    Use `json-server` to mock the external API:
    `npm run json`
4.  **Start the Application**:
    Run the application:
    `bash
npm run dev
`
5.  **Access the Application**:
    - Backend: `http://localhost:8080`
    - Mock API: `http://localhost:4000/timeseries`

---

### **Run Tests**

To test the application:

1. Run all test cases:

   ```bash
   npm run test
   ```

---

### **Docker Setup**

1. **Build the Docker Image**:

   ```bash
   docker build -t timeseries-app .
   ```

---

### **4. Folder Structure**

```
src/
├── app.ts               # Initializes Express app
├── server.ts            # Entry point of the application
├── controllers/         # API controllers
├── services/            # Business logic
├── cache/               # Caching utilities
├── routes/              # API routes
├── utils/               # Utility functions (e.g., logger, env validation)
├── config/              # Configuration files (e.g., server config)
tests/                   # Unit test cases
mock/                    # Mock data for `json-server`
dist/                    # Compiled code (ignored by Git)
```

---

### **5. Key Endpoints**

1. **Health Check**:
   - **URL**: `GET /`
   - **Description**: Checks if the application is running.
2. **Fetch Time-Series Data**:
   - **URL**: `GET /api`
   - **Query Parameters**:
     - `symbol`: Stock symbol (e.g., `AAPL`).
     - `period`: Time period (e.g., `1min`).
     - `start`: Start timestamp (ISO format).
     - `end`: End timestamp (ISO format).
   - **Description**:
     - Fetches data from cache or external API.
     - Returns combined data for partial cache hits.

---

### **6. Error Handling**

- **Validation Errors**: Returns `400` for missing or invalid parameters.
- **API Errors**: Returns `500` if the external API call fails.
- **Graceful Shutdown**: Logs and cleans up resources during termination.

---

### **7. Testing Overview**

- Unit tests cover:
  - Cache utilities.
  - Service functions (`getTimeSeriesFromCacheOrFetch`).
  - API responses.

---

### **8. Example Usage**

1. **Request**:

   ```bash
   GET http://localhost:8080/api?symbol=AAPL&period=1min&start=2024-05-14T10:00:00Z&end=2024-05-14T10:05:00Z
   ```

2. **Response**:

   ```json
   {
     "status": true,
     "data": [
       {
         "time": "2024-05-14T10:00:00Z",
         "open": 150,
         "high": 151,
         "low": 149,
         "close": 150
       }
     ]
   }
   ```
