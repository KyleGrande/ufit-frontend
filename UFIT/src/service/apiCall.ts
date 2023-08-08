import axios from "axios";
import { IResponse } from "../interface/IResponse";
import { IHistory } from "../interface/IHistory";
import { IUser } from "../interface/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Function to fetch the JWT token from AsyncStorage
export async function fetchTokenFromAsyncStorage() {
  const token = await AsyncStorage.getItem("token");
  return token ? token : "none";
}
// Create an Axios instance with a base URL for API requests
const api = axios.create({
  baseURL: "http://54.205.215.210:3000/api",
  // baseURL: "http://localhost:3000/api",
});

// Function to fetch workout history
export async function fetchWorkoutHistory() {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      bearer: await fetchTokenFromAsyncStorage(),
    };
    // Fetch api using Axios package
    const response: any = await api.get("/workout-history", {
      headers,
    });
    console.log("response", response?.data);
    const data: IResponse<IHistory[]> = response?.data;
    return data || null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
// Function to fetch workout history by user ID
export async function fetchWorkoutHistoryByUserId(id: string) {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      bearer: await fetchTokenFromAsyncStorage(),
    };
    // Fetch api using Axios package
    console.log("id", id);
    const bearer = await fetchTokenFromAsyncStorage();
    console.log("bearer", bearer);

    const response: any = await api.get("/workout-history/by-user-id/" + id, {
      headers,
    });
    console.log("response", response?.data);
    const data: IResponse<IHistory[]> = response?.data;
    return data || null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
// Function for user authentication (login)
export async function authLogin(payload: Partial<IUser>) {
  try {
    // Fetch api using Axios package
    const response: any = await api.post("/users/login", payload);
    console.log("response", response?.data);
    const data: IResponse<any> = response?.data;
    return data || null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
// Function to update user data
export async function updateUser(payload: Partial<IUser>) {
  console.log("payload", payload);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    bearer: await fetchTokenFromAsyncStorage(),
  };

  try {
    // Fetch api using Axios package
    const response: any = await api.put("/users/by-id", payload, {
      headers,
    });
    console.log("response", response?.data);
    const data: IResponse<any> = response?.data;
    return data || null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
// Function to insert a new user
export async function insertUser(payload: Partial<IUser>) {
  try {
    // Fetch api using Axios package
    const response: any = await api.post("/users", payload);
    console.log("response", response?.data);
    const data: IResponse<any> = response?.data;
    return data || null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
