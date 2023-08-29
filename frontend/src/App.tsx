import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import "./index.css";
import { MdOutlineWifiTethering } from "react-icons/md";
import { IoMdDesktop } from "react-icons/io";
import { BiMobile } from "react-icons/bi";
import { getRandomUsername } from "./randomUsernames";
import { getDeviceInfo } from "./deviceInfo";
import socket from "./socket";

function App() {
  const [users, setUsers] = useState<
    { id: string; username: string; deviceInfo: string }[]
  >([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const randomUsername = getRandomUsername();
    setUsername(randomUsername);
  }, []);

  useEffect(() => {
    if (!username) return;

    // Get device information
    const deviceInfo = getDeviceInfo();

    // Register the user with both username and deviceInfo
    socket.emit("register", { username, deviceInfo });

    socket.on(
      "userList",
      (
        updatedUsers: { id: string; username: string; deviceInfo: string }[]
      ) => {
        const otherUsers = updatedUsers.filter((user) => user.id !== socket.id);
        setUsers(otherUsers);
      }
    );
  }, [username]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-primaryBackground text-black">
        {users.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-2xl text-lightGreen">
              Open WebDrop on other devices to send files
            </h1>
            <h1 className="text-white">
              Pair devices to be discoverable on other devices
            </h1>
          </div>
        )}
        <div className="flex-grow flex flex-row flex-wrap items-center justify-center text-white">
          {users.map((user, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center m-2"
            >
              <div className="icon-wrapper mb-2">
                {user.deviceInfo.includes("Windows") ||
                user.deviceInfo.includes("Mac") ||
                user.deviceInfo.includes("Linux") ? (
                  <IoMdDesktop size={48} />
                ) : (
                  <BiMobile size={48} />
                )}
              </div>
              <div className="text-center">{user.username}</div>
              <div className="text-xs text-gray-400 mb-2">
                {user.deviceInfo}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-col items-center">
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
