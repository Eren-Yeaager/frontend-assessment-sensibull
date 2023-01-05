import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import ToggleButton from "./ToggleButton";
const Navbar = () => {
  return (
    <Flex>
      <Box mt={10}>
        <Container>
          <Tabs variant="soft-rounded" colorScheme="green">
            <Center>
              <TabList>
                <Tab>Stocks</Tab>
                <Tab>Quotes</Tab>
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
