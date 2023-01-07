import React from "react";
import {
  Box,
  Spacer,
} from "@chakra-ui/react";

import ToggleButton from "./ToggleButton";
const Navbar = () => {
  return (
    <Box pl={5}>
      <Spacer />
      <Box mt={10}>
        <ToggleButton />
      </Box>
    </Box>
  );
};

export default Navbar;
