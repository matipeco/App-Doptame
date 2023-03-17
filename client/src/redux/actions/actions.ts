import axios from "axios";
import { Apa, Pet } from "../types";
import { POST_APA, ADD_PET, GET_APA, GET_PETS, GET_DETAIL_PET, CLEAN_DETAIL, SET_SELECTED_CATEGORY } from "./actionsTypes";
import { Dispatch } from "react";




type dispatch = {
  type: string
  createApa: Apa

}

type dispatchPet = {
  type: string
  createPet: Pet
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
  return async (dispatch: Dispatch<dispatch>) => {
    const createApa = await axios.post<Apa>("http://localhost:3001/apa", payload);
    return dispatch({
      type: POST_APA,
      createApa: createApa.data
    });
  };
};

export const getPets = () => {
  return async (dispatch: Dispatch<dispatchGet>) => {
    const response = await axios.get<Pet[]>("http://localhost:3001/pets");
    return dispatch({
      type: GET_PETS,
      payload: response.data
    });
  };
};

export const getDetailPets = (id: string) => {
  return (dispatch: Dispatch<dispatchDetail>) => {

    return axios.get<Pet>(`http://localhost:3001/pets/${id}`)
      .then((res) => dispatch({
        //despacho la action
        type: GET_DETAIL_PET,
        payload: res.data,
      }))

  };
};

export const clearDetail = () => {
  return { type: CLEAN_DETAIL };
};


export const postPet = (payload: Pet) => {
  return async (dispatch: Dispatch<dispatchPet>) => {
    const createPet = await axios.post<Pet>("http://localhost:3001/pets/create", payload);
    return dispatch({
      type: ADD_PET,
      createPet: createPet.data
    });
  };
};

export const setSelectedCategory = (category: string) => {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: category
  }
}