import axios from "axios";
import { IResponse } from "../interface/IResponse";
import { IHistory } from "../interface/IHistory";

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
