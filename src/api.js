import axios from "axios";

const BASE_URL = "https://task.moraspirit.com/api";

export const getMembers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/members`);
    return res.data.members || [];
  } catch (err) {
    throw new Error("Failed to fetch members.");
  }
};

export const checkAvailability = async (msp_id, date) => {
  try {
    const res = await axios.post(`${BASE_URL}/availability/check`, { msp_id, date });
    return res.data;
  } catch (err) {
    throw new Error("Failed to check availability.");
  }
};