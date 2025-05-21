import { useState } from "react";
import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  IconButton, 
  Box,
  Flex,
  Text,
  Spinner,
  Stack
} from "@chakra-ui/react";
import { ArrowDown, ArrowLeft, ArrowRight, Edit, Trash2 } from "lucide-react";

const StudentTable = ({
  students,
  isLoading,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}) => {
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  if (isLoading) {
    return (
      <Box py={10} textAlign="center">
        <Spinner size="xl" color="brand.500" />
        <Text mt={4}>Loading students...</Text>
      </Box>
    );
  }

  if (students.length === 0) {
    return (
      <Box py={10} textAlign="center">
        <Text fontSize="lg">No students found.</Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple" colorScheme="gray">
        <Thead bg="gray.50">
          <Tr>
            <Th width="50px">#</Th>
            <Th 
              cursor="pointer" 
              onClick={() => handleSort("name")}
            >
              <Flex align="center">
                Member Name
                {sortColumn === "name" && (
                  <ArrowDown size={14} className={sortDirection === "desc" ? "rotate-180" : ""} />
                )}
              </Flex>
            </Th>
            <Th 
              cursor="pointer"
              onClick={() => handleSort("email")}
            >
              <Flex align="center">
                Member Email
                {sortColumn === "email" && (
                  <ArrowDown size={14} className={sortDirection === "desc" ? "rotate-180" : ""} />
                )}
              </Flex>
            </Th>
            <Th 
              cursor="pointer"
              onClick={() => handleSort("age")}
            >
              <Flex align="center">
                Age
                {sortColumn === "age" && (
                  <ArrowDown size={14} className={sortDirection === "desc" ? "rotate-180" : ""} />
                )}
              </Flex>
            </Th>
            <Th>Parent Email</Th>
            <Th width="100px">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student, index) => (
            <Tr key={student._id}>
              <Td>{(currentPage - 1) * 6 + index + 1}</Td>
              <Td fontWeight="medium">{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>{student.age}</Td>
              <Td>{student.parentsEmail}</Td>
              <Td>
                <Flex>
                  <IconButton
                    aria-label="Edit student"
                    icon={<Edit size={16} />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    mr={2}
                    onClick={() => onEdit(student)}
                  />
                  <IconButton
                    aria-label="Delete student"
                    icon={<Trash2 size={16} />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => onDelete(student)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination */}
      {totalPages > 0 && (
        <Flex justify="space-between" align="center" mt={4} px={4} py={2}>
          <Text fontSize="sm" color="gray.600">
            Showing {students.length} of {totalItems} members
          </Text>
          
          <Stack direction="row" spacing={1}>
            <IconButton
              icon={<ArrowLeft size={16} />}
              size="sm"
              variant="ghost"
              isDisabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Previous page"
            />
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <IconButton
                key={page}
                size="sm"
                variant={currentPage === page ? "solid" : "ghost"}
                colorScheme={currentPage === page ? "green" : "gray"}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
              >
                {page}
              </IconButton>
            ))}
            
            <IconButton
              icon={<ArrowRight size={16} />}
              size="sm"
              variant="ghost"
              isDisabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="Next page"
            />
          </Stack>
        </Flex>
      )}
    </Box>
  );
};

export default StudentTable;