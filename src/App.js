import "./App.css";
import { useState, useEffect } from "react";
import StocksTable from "./components/StocksTable";
import Navbar from "./components/Navbar";

function App() {
  const [stocks, setStocks] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <StocksTable />
    </div>
  );
}

export default App;
