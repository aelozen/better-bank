import axios from "axios";
import { generateRandomAccountNumber } from "../../utils/utils";

const API_URL = "/api/users/";

// Fetch the secret key from the backend
const fetchSecretKey = async () => {
  try {
    const response = await axios.get(API_URL + "secretKey");
    return response.data.secretKey;
  } catch (error) {
    console.error("Failed to fetch secret key:", error);
    throw error;
  }
};

// Check if the token is expired
const isTokenExpired = (token) => {
  const decodedToken = decodeToken(token);
  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

  return decodedToken.exp < currentTime;
};

// Decode the JWT token
const decodeToken = (token) => {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    throw new Error("Invalid token");
  }
  const payload = tokenParts[1];
  const decodedPayload = atob(payload);
  return JSON.parse(decodedPayload);
};

// Register a new user
const register = async (userData) => {
  const secretKey = await fetchSecretKey();

  const config = {
    headers: {
      Authorization: `Bearer ${secretKey}`, // Include the secret key in the request headers
    },
  };

  const account = generateRandomAccountNumber(12);

  const userDataWithAccount = {
    ...userData,
    account: account,
  };

  const response = await axios.post(API_URL, userDataWithAccount, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const secretKey = await fetchSecretKey();

  const config = {
    headers: {
      Authorization: `Bearer ${secretKey}`, // Include the secret key in the request headers
    },
  };

  const response = await axios.post(API_URL + "login", userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  localStorage.removeItem("user");
};

// Update balance
const updateBalance = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + userData.id, userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + userId, config);

  return response.data;
};

// Transfer money


const authService = {
  register,
  logout,
  login,
  updateBalance,
  deleteUser,
  isTokenExpired,
};

export default authService;
