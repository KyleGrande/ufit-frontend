import { useEffect, useState } from "react";
import { IUser } from "../interface/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const [user, setUser] = useState<Partial<IUser>>();

  useEffect(() => {
    extractToken();

    async function extractToken() {
      const token = await AsyncStorage.getItem("token");
      console.log("token", token);
      if (token) {
        const data: any = jwtDecode(token);
        console.log("data", data);

        setUser({
          email: data?.email,
          userName: data?.userName,
          firstName: data?.firstName,
          lastName: data?.lastName,
          phoneNumber: data?.phoneNumber,
          _id: data?.id,
        });
      }
    }
  }, []);

  return { ...user };
};

export default useAuth;
