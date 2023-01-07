import "./App.css";
import StocksTable from "./components/StocksTable";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quotes from "./components/Quotes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes path="/">
          <Route path="/stocks" element={<StocksTable />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
