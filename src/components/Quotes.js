import React from "react";
import { useState, useEffect } from "react";

const Quotes = (props) => {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    async function getQuotes() {
      const response = await fetch("");

      const result = await response.text();
      //console.log(result);
    }
    getQuotes();
  }, []);
  console.log();
  return <div>{props.text}</div>;
};

export default Quotes;
