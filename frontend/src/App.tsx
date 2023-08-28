import "tailwindcss/tailwind.css";
import "./index.css";
import { MdOutlineWifiTethering } from "react-icons/md";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-primaryBackground text-black">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl text-lightGreen">Open WebDrop on other devices to send files</h1>
          <h1 className="text-white">Pair devices to be discoverable on other devices</h1>
        </div>
        <div className="mt-auto flex flex-col items-center">
          <div className="circle-wrapper mb-4">
            <h1 className="text-lightGreen text-7xl"><MdOutlineWifiTethering /></h1>
          </div>
          <h1 className="text-white">You are known as Anonymous Bastard</h1>
          <h1 className="text-lightGreen mb-4">You can be discovered by everyone on this network</h1>
        </div>
      </div>
    </>
  );
}

export default App;
