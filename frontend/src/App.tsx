import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import "./index.css";
import { MdOutlineWifiTethering } from "react-icons/md";
import { getRandomUsername } from "./randomUsernames";
import socket from "./socket";

function App() {
  // Define the type for users
  const [users, setUsers] = useState<{ id: string; username: string }[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    // Generate a random username and set it
    const randomUsername = getRandomUsername();
    setUsername(randomUsername);
  }, []);

  useEffect(() => {
    // Don't register until we have a username
    if (!username) return;

    // Register the user with the server
    socket.emit("register", username);

    // Listen for updated user list
    socket.on(
      "userList",
      (updatedUsers: { id: string; username: string }[]) => {
        // Filter out the current user's username
        const otherUsers = updatedUsers.filter((user) => user.id !== socket.id);
        setUsers(otherUsers);
      }
    );
  }, [username]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-primaryBackground text-black">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl text-lightGreen">
            Open WebDrop on other devices to send files
          </h1>
          <h1 className="text-white">
            Pair devices to be discoverable on other devices
          </h1>
        </div>
        <div className="text-white"> 
          {users.map((user, index) => (
            <div key={index}>{user.username}</div>
          ))}
        </div>
        <div className="mt-auto flex flex-col items-center">
          <div className="circle-wrapper mb-4">
            <h1 className="text-lightGreen text-7xl">
              <MdOutlineWifiTethering />
            </h1>
          </div>
          <h1 className="text-white">You are known as {username}</h1>
          <h1 className="text-lightGreen mb-4">
            You can be discovered by everyone on this network
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
