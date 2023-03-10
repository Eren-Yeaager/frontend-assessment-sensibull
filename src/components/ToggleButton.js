import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
function ToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  );
}
export default ToggleButton;
