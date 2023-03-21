import axios from "axios";
import { Apa, Pet } from "../types";
import { POST_APA, ADD_PET, GET_APA, GET_PETS, GET_DETAIL_PET, CLEAN_DETAIL, SET_SELECTED_CATEGORY, EDIT_PET } from "./actionsTypes";
import { Dispatch } from "react";




type dispatchApa = {
  type: string
  payload: Apa

}

type dispatchPet = {
  type: string
  payload: Pet
}

type dispatchGet = {
  type: string
  payload: object[]
}

type dispatchDetail = {
  type: string
  payload: Pet
}



export const getApas = () => {
  return async (dispatch: Dispatch<dispatchGet>) => {
    const response = await axios.get<Apa[]>("http://localhost:3001/apa");

    return dispatch({
      type: GET_APA,
      payload: response.data
    });
  };
};

export const postApa = (payload: Apa) => {
  return async (dispatch: Dispatch<dispatchApa>) => {
    const createApa = await axios.post<Apa>("http://localhost:3001/apa", payload);
    return dispatch({
      type: POST_APA,
      payload: createApa.data
    });
  };
};

export const getPets = () => {
  return async (dispatch: Dispatch<dispatchGet>) => {
    try {
      const response = await axios.get<Pet[]>("http://localhost:3001/pets");

      return dispatch({
        type: GET_PETS,
        payload: response.data
      });
    }
    catch (error) {
      console.log(error)
    }

  };
};

export const getDetailPets = (id: string) => {
  return async (dispatch: Dispatch<dispatchDetail>) => {

    const res = await axios.get<Pet>(`http://localhost:3001/pets/${id}`);
    return dispatch({
      //despacho la action
      type: GET_DETAIL_PET,
      payload: res.data,
    });

  };
};

export const clearDetail = () => {
  return { type: CLEAN_DETAIL };
};


export const postPet = (id: string, payload: Pet) => {
  return async (dispatch: Dispatch<dispatchPet>) => {
    const createPet = await axios.post<Pet>(`http://localhost:3001/pets/create/${id}`, payload);
    return dispatch({
      type: ADD_PET,
      payload: createPet.data
    });
  };
};

export const putPet = (id: string, payload: Pet) => {
  console.log(payload)
  return async (dispatch: Dispatch<dispatchPet>) => {
    const editPet = await axios.put<Pet>(`http://localhost:3001/pets/edit/${id}`, payload);
    return dispatch({
      type: EDIT_PET,
      payload: editPet.data
    });
  };
};

export const setSelectedCategory = (category: string) => {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: category
  }
}