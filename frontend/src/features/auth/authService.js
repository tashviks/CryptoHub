import axios from "axios";

const API_URL = "/api/users/";

//  Register user

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//  Authorize user

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//  Logout user

const logout = async () => [localStorage.removeItem("user")];

// Track coin

const trackCoin = async (coinData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + "track", coinData, config);
  return response.data;
};

// Delete tracked coin

const deleteTrackedCoin = async (coinData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + "track/delete",
    coinData,
    config
  );
  return response.data;
};

// Get tracked coins

const getTrackedCoins = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "track", config);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  trackCoin,
  getTrackedCoins,
  deleteTrackedCoin,
};

export default authService;
