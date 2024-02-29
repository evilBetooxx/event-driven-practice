import axios from "axios";
import { io } from "socket.io-client";
import { useEffect } from "react";

function App() {
  const socket = io("http://localhost:3002");

  useEffect(() => {
    socket.on("payment", () => {
      console.log("Pago recibido: ");
    });
  }, []);

  const handleOnClick = async () => {
    try {
      await axios.post("http://localhost:3000/order", {
        amount: 100,
      });
      console.log("Haz hecho una compra");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center text-2xl justify-center bg-black text-white font-bold h-screen">
      <div className="p-10">Hello, world!</div>
      <div className="p-10">
        <button
          className="p-10 bg-slate-500 rounded-md"
          onClick={handleOnClick}
        >
          Haz una compra
        </button>
      </div>
    </div>
  );
}

export default App;
