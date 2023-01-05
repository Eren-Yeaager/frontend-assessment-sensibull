import React from "react";
import { useState, useEffect } from "react";
import { Container, Center, Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
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
const StocksTable = () => {
  const [stocks, setStocks] = useState("");
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

  return (
    <Box mt={10}>
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
              {stocks.map((stock) => (
                <Tr>
                  <Td>{stock.Symbol}</Td>
                  <Td>{stock.Name}</Td>
                  <Td>{stock.Sector}</Td>
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
