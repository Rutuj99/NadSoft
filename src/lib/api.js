
import axios from "axios";

// Update API base URL to point to our Node.js server
// const API_BASE_URL = "http://localhost:5000/api";

const API_BASE_URL = "https://neosoft.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Student API functions
export const getStudents = async (page = 1, limit = 6, search = "") => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (search) params.append("search", search);
  
  try {
    const response = await api.get(`/students?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

export const createStudent = async (studentData) => {
  try {
    console.log("Sending data to server:", studentData);
    const response = await api.post("/students", studentData);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};


export const addMarks = async (studentId, markData) => {
  try {
    const response = await api.post(`/students/${studentId}/marks`, markData);
    return response.data;
  } catch (error) {
    console.error("Error adding marks:", error);
    throw error;
  }
};

export default api;
