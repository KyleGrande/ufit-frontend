import axios from "axios";
import { IResponse } from "../interface/IResponse";
import { IHistory } from "../interface/IHistory";
import { IUser } from "../interface/IUser";

const api = axios.create({
  baseURL: "http://54.205.215.210:3000/api",
  // baseURL: "http://localhost:3000/api",
});

export async function fetchWorkoutHistory() {
  try {
    // Fetch api using Axios package
    const response: any = await api.get("/workout-history", {
      headers: {
        //Headers needed to receive data in form of json
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("response", response?.data);
    const data: IResponse<IHistory[]> = response?.data;
    return data || null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export async function fetchWorkoutHistoryByUserId(id: string) {
  try {
    // Fetch api using Axios package
    console.log("id", id);
    const response: any = await api.get("/workout-history/by-user-id/" + id);
    console.log("response", response?.data);
    const data: IResponse<IHistory[]> = response?.data;
    return data || null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

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

export async function updateUser(payload: Partial<IUser>) {
  try {
    // Fetch api using Axios package
    const response: any = await api.put("/users/by-id", payload);
    console.log("response", response?.data);
    const data: IResponse<any> = response?.data;
    return data || null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

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
