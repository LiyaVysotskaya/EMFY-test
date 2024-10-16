import axios from "axios";
import { ACCESS_TOKEN, API_VERSION, BASE_URL, PROXY } from "../utils/constants";

export const getDeals = async (limit: number, page: number) => {
  const response = await axios.get(
    `${PROXY}${BASE_URL}${API_VERSION}/leads?limit=${limit}&page=${page}&order[created_at]=asc`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return response.data;
};

export const getDealById = async (id: string) => {
  const response = await axios.get(
    `${PROXY}${BASE_URL}${API_VERSION}/leads/${id}`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return response.data;
};
