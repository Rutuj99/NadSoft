
import { useState } from "react";
import { Box, Heading, useDisclosure, useToast, Button } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import StudentTable from "../components/StudentTable";
import SearchBar from "../components/SearchBar";
import AddEditStudentModal from "../components/AddEditStudentModal";
import { getStudents, createStudent, updateStudent, deleteStudent } from "../lib/api";

const StudentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const chakraToast = useToast();

  // Fetch students with pagination and search
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students", currentPage, searchQuery],
    queryFn: () => getStudents(currentPage, 6, searchQuery),
    onError: (error) => {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students. Please check your connection and try again.");
    }
  });

  // Create student mutation
  const createStudentMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      onClose();
      toast.success("Student added successfully!");
    },
    onError: (error) => {
      console.error("Create student error:", error);
      toast.error(error?.response?.data?.message || "Failed to add student. Please try again.");
    },
  });

  // Update student mutation
  const updateStudentMutation = useMutation({
    mutationFn: ({ id, studentData }) => updateStudent(id, studentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      onClose();
      toast.success("Student updated successfully!");
    },
    onError: (error) => {
      console.error("Update student error:", error);
      toast.error(error?.response?.data?.message || "Failed to update student. Please try again.");
    },
  });

  // Delete student mutation
  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete student error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete student. Please try again.");
    },
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleAddNew = () => {
    setSelectedStudent(undefined);
    onOpen();
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    onOpen();
  };

  const handleDelete = (student) => {
    chakraToast({
      title: "Confirm deletion",
      description: "Are you sure you want to delete this student? This action cannot be undone.",
      status: "warning",
      duration: 9000,
      isClosable: true,
      position: "top",
      render: ({ onClose }) => (
        <Box p={4} color="white" bg="red.500" borderRadius="md" boxShadow="lg">
          <Heading size="md" mb={2}>Confirm deletion</Heading>
          <Box mb={3}>Are you sure you want to delete {student.name}? This action cannot be undone.</Box>
          <Button colorScheme="white" variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            bg="white"
            color="red.500"
            _hover={{ bg: "gray.100" }}
            onClick={() => {
              deleteStudentMutation.mutate(student._id);
              onClose();
            }}
          >
            Delete
          </Button>
        </Box>
      )
    });
  };

  const handleSubmit = (data) => {
    console.log("Submitting data:", data);
    
    if (selectedStudent) {
      updateStudentMutation.mutate({
        id: selectedStudent._id,
        studentData: data,
      });
    } else {
      createStudentMutation.mutate(data);
    }
  };

  return (
    <Box>
      <Heading as="h1" mb={6} size="xl" color="gray.800">
        All Members
      </Heading>
      
      <SearchBar onSearch={handleSearch} onAddNew={handleAddNew} />
      
      <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
        <StudentTable
          students={data?.students || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={Math.ceil((data?.total || 0) / (data?.limit || 6))}
          totalItems={data?.total || 0}
          onPageChange={setCurrentPage}
        />
      </Box>

      <AddEditStudentModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        student={selectedStudent}
        isSubmitting={createStudentMutation.isPending || updateStudentMutation.isPending}
      />
    </Box>
  );
};

export default StudentManagement;
