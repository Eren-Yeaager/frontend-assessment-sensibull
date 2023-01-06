import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import ToggleButton from "./ToggleButton";
import StocksTable from "./StocksTable";
import Quotes from "./Quotes";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <Flex>
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
      </Box>
      <Spacer />
      <Box mt={10}>
        <ToggleButton />
      </Box>
    </Flex>
  );
};

export default Navbar;
