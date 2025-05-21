
import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  useToast,
  Box,
} from "@chakra-ui/react";
import { toast } from "sonner";

const AddEditStudentModal = ({
  isOpen,
  onClose,
  onSubmit,
  student,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    parentsEmail: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
    parentsEmail: "",
  });

  // Load student data when editing
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        age: student.age ? student.age.toString() : "",
        parentsEmail: student.parentsEmail || "",
      });
    } else {
      // Reset form when adding new student
      setFormData({
        name: "",
        email: "",
        age: "",
        parentsEmail: "",
      });
    }
    
    // Clear errors when modal opens
    setErrors({
      name: "",
      email: "",
      age: "",
      parentsEmail: "",
    });
  }, [student, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      age: "",
      parentsEmail: "",
    };
    
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number";
      isValid = false;
    }

    if (!formData.parentsEmail.trim()) {
      newErrors.parentsEmail = "Parent's email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.parentsEmail)) {
      newErrors.parentsEmail = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form data being submitted:", {
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        parentsEmail: formData.parentsEmail,
      });
      
      try {
        onSubmit({
          name: formData.name,
          email: formData.email,
          age: Number(formData.age),
          parentsEmail: formData.parentsEmail,
        });
      } catch (error) {
        console.error("Error in form submission:", error);
        toast.error("Failed to submit form. Please try again.");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {student ? "Edit Student" : "Add New Member"}
        </ModalHeader>
        <ModalCloseButton />
        
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Member Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Member Name"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Member Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Member Email"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.age}>
                <FormLabel>Member Age</FormLabel>
                <Input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter Member Age"
                />
                <FormErrorMessage>{errors.age}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.parentsEmail}>
                <FormLabel>Member Parent Id</FormLabel>
                <Input
                  name="parentsEmail"
                  type="email"
                  value={formData.parentsEmail}
                  onChange={handleChange}
                  placeholder="Enter Member Parent Id"
                />
                <FormErrorMessage>{errors.parentsEmail}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit"
              colorScheme="green" 
              isLoading={isSubmitting}
              loadingText="Saving"
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEditStudentModal;
