import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEROW_API_URL,
  headers: {
    Authorization: `Token ${process.env.NEXT_PUBLIC_BASEROW_PUBLIC_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
