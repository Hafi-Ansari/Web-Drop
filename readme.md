# Web-Drop: Peer-to-Peer File Sharing Made Easy

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Under the Hood](#under-the-hood)
- [Complexities](#complexities)
- [Deployment](#deployment)
- [Usage Instructions](#usage-instructions)
- [License](#license)

## Overview

Web-Drop is a full-stack web application designed to allow users on the same network to discover each other and establish peer-to-peer (P2P) connections for file sharing. The application is built on a robust tech stack and leverages modern web technologies to provide a seamless user experience.

## Features

- **User Discovery**: Automatically shows all clients on the same network.
- **P2P Connection**: Allows users to establish a P2P connection via WebRTC.
- **File Sharing**: Enables users to send and receive files of any format.
- **Real-Time Updates**: Uses WebSockets for real-time communication between clients.

## Technologies Used

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express
- **Real-Time Communication**: WebSockets (socket.io)
- **P2P**: PeerJS
- **Deployment**: Vercel (frontend), Dockerized AWS EC2 instance (backend)

## Under the Hood

### WebSocket for User Discovery

The application sets up a WebSocket connection using socket.io to manage real-time updates. When a client connects to the network, it gets added to a list of active users, which is then broadcasted to all other connected clients. This enables automatic user discovery within the same network.

### WebRTC for Peer Connection

Once the users are discovered, Web-Drop leverages PeerJS to set up a WebRTC peer connection. The application attaches a WebRTC peer server to the existing HTTPS server, allowing direct, peer-to-peer connections between clients. This ensures a secure, efficient, and direct channel for file sharing.

## Complexities

- **SSL Certification**: The backend is SSL-certified using Let's Encrypt, ensuring secure data transmission.
- **Dockerization**: The backend is containerized using Docker, simplifying deployment and scaling.
- **Environment Variables**: Uses `import.meta.env` for environment-specific settings, making the app more configurable.
- **UUID Generation**: Utilizes the `uuid` library for generating unique identifiers for peer connections.

## Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Dockerized and deployed on an AWS EC2 instance running Amazon Linux
- **SSL**: Backend is SSL-certified with Let's Encrypt
  
## Usage Instructions

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your_username/Web-Drop.git
    ```
    
2. **Navigate to Frontend and Backend Directories**
    ```bash
    cd Web-Drop/frontend
    cd Web-Drop/backend
    ```
    
3. **Install Dependencies**
    ```bash
    npm install
    ```
    
4. **Start Development Servers**
    ```bash
    npm run dev
    ```
  
5. **Open the App**
    - Frontend will be available at `http://localhost:3000`
    - Backend will be available at `http://localhost:5000`

## License

MIT License. See `LICENSE` for more information.
