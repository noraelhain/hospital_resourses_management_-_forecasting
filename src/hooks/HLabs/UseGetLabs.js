// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../config/axios.config";
const storageKey = "logged";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const fetchLabs = async () => {
  const { data } = await axiosInstance.get("/api/lab", {
    headers: {
      Authorization: `Bearer ${userData.data.access_token}`,
    },
  });

  return data.data.laboratories;
};
export const UsegetLabs = () => {
  return useQuery({
    queryKey: ["lab"],
    queryFn: fetchLabs,
  });
};
