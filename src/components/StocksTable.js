import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Center,
  Flex,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Fuse from "fuse.js";
import { Box } from "@chakra-ui/react";
import Quotes from "./Quotes";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const StocksTable = (props) => {
  const [stocks, setStocks] = useState("");
  const [tar, setTar] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (props.activeTab === "stocks") {
      window.history.pushState({}, "", "/stocks");
    } else if (props.activeTab === "quotes") {
      window.history.pushState({}, "", "/quotes");
    }
  }, [props.activeTab]);

  function csvJSON(result) {
    var lines = result.split("\n");

    var result1 = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result1.push(obj);
    }
    return JSON.stringify(result1);
  }

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://prototype.sbulltech.com/api/v2/instruments"
      );

      const result = await response.text();
      const stocks = JSON.parse(csvJSON(result));
      console.log(stocks);
      setStocks(stocks);
    }
    getData();
  }, []);

  window.abc = "";
  const xyz = (e) => {
    window.abc = e.target.innerText;
  };

  const filterStocks = (stocks, searchTerm) => {
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["Symbol", "Name"],
    };
    const fuse = new Fuse(stocks, options);
    return fuse.search(searchTerm);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredStocks = filterStocks(stocks, searchTerm);

  return (
    <Box mt={10}>
      <Container>
        <Input
          variant="filled"
          placeholder="Search Stocks ..."
          size="sm"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Container>
      <Center>
        <TableContainer display="block" whiteSpace="nowrap">
          <Table size="lg" variant="striped" colorScheme="teal">
            <TableCaption>Stocks of various companies</TableCaption>
            <Thead>
              <Tr>
                <Th>Symbol</Th>
                <Th>Name</Th>
                <Th> Category</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* { if(tar===0){
              stocks.map((stock)=>(
                <Tr>
                  <Td>{stock.Symbol}</Td>
                  <Td>{stock.Name}</Td>
                  <Td>{stock.Sector}</Td>
                </Tr>
              ))
            }} */}
              {filteredStocks.map((stock) => (
                <Tr>
                  <Td>
                    <Link to="/quotes">
                      <Button onClick={xyz} colorScheme="teal" variant="ghost">
                        {stock.item.Symbol}
                      </Button>
                    </Link>
                  </Td>
                  <Td>{stock.item.Name}</Td>
                  <Td>{stock.item.Sector}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Box>
  );
};
export default StocksTable;
