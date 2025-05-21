import { useState, useRef } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, onAddNew }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimeoutRef = useRef(null);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Debounce search to prevent excessive API calls
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = window.setTimeout(() => {
      onSearch(query);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
      }
      onSearch(searchQuery);
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={6}
      flexDir={{ base: "column", md: "row" }}
      gap={4}
    >
      <Box width={{ base: "100%", md: "auto" }} flex="1">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search size={20} opacity={0.5} />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            borderRadius="md"
          />
        </InputGroup>
      </Box>

      <Button
        onClick={onAddNew}
        colorScheme="green"
        size="md"
        px={6}
        width={{ base: "100%", md: "auto" }}
      >
        Add New Member
      </Button>
    </Flex>
  );
};

export default SearchBar;