# Kennah Full-Stack Application

This project consists of a frontend built with React and a backend built with Node.js (NestJS). Follow the instructions below to set up and run the application.

---

## Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (running locally or accessible remotely)

---

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `server` directory.
   - Add the following variables:
     ```
      PORT=8080
      NODE_ENV=development

      # Database configuration
      DO_DB_HOST=localhost
      DO_DB_PORT=27017
      DO_DB_NAME=nestjs-api
      DO_DB_USERNAME=your_username
      DO_DB_PASSWORD=your_password
      MONGODB_URI=mongodb://localhost:27017/nestjs-api

      # JWT configuration
      JWT_SECRET=your_jwt_secret_key
      JWT_EXPIRES_IN=3600s

     ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

   The backend will run on `http://localhost:8080` by default.

   you can see the apis swagger on 
   `http:localhost:8080/api/docs`
---

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `client` directory.
   - Add the following variables:
     ```
      NEXT_PUBLIC_HOST_API=http://[::1]:8080
      NEXT_PUBLIC_ASSETS_API=http://[::1]:8080/

     ```

4. Start Building the frontend development server:
   ```bash
   npm run build
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:8084` by default.

---

## Running the Full Application

1. Ensure MongoDB is running.
2. Start the backend server as described above.
3. Start the frontend server as described above.
4. Open your browser and navigate to `http://localhost:8084` to access the application.

---

## PDF Tasks
 - the image slider task is inside the ToDo app on `http://localhost:8084/tasks/pdf-task/`
 - the second is in the root of the project on `queue.js.js` you can run it with `node queue.js`

## Notes

- Replace `<your_mongodb_connection_string>` and `<your_jwt_secret>` with appropriate values.
- If you deploy the application, update the environment variables accordingly.

---

## Troubleshooting

- If you encounter issues with MongoDB, ensure it is running and accessible.
- Check the `.env` files for correct configuration.
- Review the logs for errors and resolve them as needed.