import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Tab,
  Tabs,
  Center,
  TabList,
  Button,
  Box,
} from "@chakra-ui/react";
const Quotes = () => {
  const [symbol, setSymbol] = useState("");
  const [quotes, setQuotes] = useState([]);

  async function getQuotes() {
    const response = await fetch(
      `https://prototype.sbulltech.com/api/v2/quotes/${symbol}`
    );
    setSymbol(window.abc);
    const result = await response.json();

    setQuotes(result.payload);

    console.log(result);
    console.log(typeof quotes);
  }

  useEffect(() => {
    getQuotes();
  }, [symbol]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      getQuotes();
    }, 60000);
    return () => clearInterval(refreshInterval);
  }, [symbol]);

  function sortBy(field) {
    setQuotes((prevQuotes) => {
      const newQuotes = { ...prevQuotes }; // make a copy of the quotes object
      Object.keys(newQuotes).forEach((key) => {
        newQuotes[key] = newQuotes[key].sort((a, b) => {
          if (a[field] < b[field]) return -1;
          if (a[field] > b[field]) return 1;
          return 0;
        });
      });
      return newQuotes;
    });
  }

  return (
    <Box mt={10}>
      <Container>
        <Tabs variant="soft-rounded" colorScheme="green">
          <Center>
            <TabList>
              <Tab>
                <Link to="/quotes">Quotes</Link>
              </Tab>
              <Tab>
                <Link to="/stocks">Stocks</Link>
              </Tab>
            </TabList>
          </Center>
        </Tabs>
      </Container>
      <TableContainer display="block" whiteSpace="nowrap">
        <Table size="lg" variant="striped" colorScheme="teal">
          <TableCaption>Quote of the respective company</TableCaption>
          <Thead>
            <Tr>
              <Th>Symbol</Th>
              <Th>
                <Button
                  onClick={() => sortBy("price")}
                  colorScheme="teal"
                  variant="ghost"
                >
                  Price
                </Button>
              </Th>
              <Th>
                <Button
                  onClick={() => sortBy("time")}
                  colorScheme="teal"
                  variant="ghost"
                >
                  Time
                </Button>
              </Th>
              <Th>ValidTill</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(quotes).map((key) =>
              quotes[key].map((quote) => (
                <Tr>
                  <Td>{key}</Td>
                  <Td>{quote.price}</Td>
                  <Td>{quote.time}</Td>
                  <Td>{quote.valid_till}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Quotes;
