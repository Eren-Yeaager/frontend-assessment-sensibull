import "./App.css";
import { useState, useEffect } from "react";
import StocksTable from "./components/StocksTable";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quotes from "./components/Quotes";


function App() {
  const [stocks, setStocks] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes path="/">
          <Route path="/stocks" element={
          
          <StocksTable />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
