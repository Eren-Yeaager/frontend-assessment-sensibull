import React, { useState, useEffect } from "react";

const Stocks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://prototype.sbulltech.com/api/v2/instruments"
      );

      const result = await response.text();
      const data = result.split("\n");
      setData(data);
    }
    getData();
  }, []);
  console.log(data);

  let symbol, name, category, validTill;
  if (data) {
    [symbol, name, category, validTill] = data.split(",");
  }

  return (
    <div>
      <h1>Stocks</h1>
    </div>
  );
};

export default Stocks;
