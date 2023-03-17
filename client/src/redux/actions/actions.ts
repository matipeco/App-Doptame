import axios from "axios";
import { Apa } from "../types";
import  { GET_APA } from "./actionsTypes";
import { Dispatch } from "react";




type dispatch = {
    type: string
    createApa: Apa
}




export const postApa = (payload:Apa ) => {
    return async (dispatch: Dispatch<dispatch>) => {
      const createApa = await axios.post<Apa>("http://localhost:3001/apa", payload);
      return dispatch({
        type: GET_APA,
        createApa:createApa.data
      });
    };
  };


