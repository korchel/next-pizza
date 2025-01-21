import { User } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { Paths } from "./paths";

export const getMe = async () => {
  const { data } = await axiosInstance.get<User>(Paths.AUTH_ME);

  return data;
};
