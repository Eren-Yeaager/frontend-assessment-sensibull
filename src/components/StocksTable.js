import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Center,
  Flex,
  Input,
  Button,
  ButtonGroup,
  Tabs,
  TabList,
  Tab,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
const StocksTable = (props) => {
  const [stocks, setStocks] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [items, setItems] = useState([]);

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
  // const objects = filteredStocks.flatMap((item) =>
  //   item.map((obj) => ({
  //     Symbol: obj.item.Symbol,
  //     Name: obj.item.Name,
  //     Sector: obj.item.Sector,
  //   }))
  // );
  // console.log(objects);

  return (
    <Box mt={10}>
      <Container>
        <Tabs variant="soft-rounded" colorScheme="green">
          <Center>
            <TabList>
              <Tab>
                <Link to="/stocks">Stocks</Link>
              </Tab>
              <Tab>
                <Link to="/quotes">Quotes</Link>
              </Tab>
            </TabList>
          </Center>
        </Tabs>
      </Container>

      <Container>
        <Box pt={10}>
          <Input
            variant="filled"
            placeholder="Search Stocks ..."
            size="sm"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
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
              {/* {/* 
              stocks.map((stock)=>(
                <Tr>
                  <Td>{stock.Symbol}</Td>
                  <Td>{stock.Name}</Td>
                  <Td>{stock.Sector}</Td>
                </Tr>
              ))
            } */}
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
