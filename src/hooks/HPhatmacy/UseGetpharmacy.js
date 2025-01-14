// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../config/axios.config";
const storageKey = "logged";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const fetchPharmacy = async () => {
  const { data } = await axiosInstance.get("/api/pharmacies", {
    headers: {
      Authorization: `Bearer ${userData.data.access_token}`,
    },
  });

  return data.data.pharmacies;
};
export const UsegetPharmacy = () => {
  return useQuery({
    queryKey: ["pharmacy"],
    queryFn: fetchPharmacy,
  });
};
