import axios from "axios";

function App() {
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
