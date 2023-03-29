import axios from "axios";
import { Apa, Pet, User } from "../types";

import { POST_APA, ADD_PET, GET_APA, GET_PETS, GET_DETAIL_PET, CLEAN_DETAIL, POST_USER, GET_USER, GET_DETAIL_USERS, ORDER_BY_AGE, FILTER_BY_SIZE, GET_APA_DETAIL, FILTER_BY_LOCATION, DELETE_APA, DELETE_USER, EDIT_PET, EDIT_APA, EDIT_USER,  GET_FAVORITE  } from "./actionsTypes"; import { Dispatch } from "react";

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

type dispatchUser = {
  type: string
  payload: User
}

type dispatchDetailUser = {
  type: string
  payload: User
}
interface filtros {
  type: string;
  payload: string;
}

type dispatchFav= {
  type: string;
  payload: User; 
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

export const getApaById = (id: string) => {
  return async (dispatch: Dispatch<dispatchApa>) => {

    const res = await axios.get<Apa>(`http://localhost:3001/apa/${id}`);
    return dispatch({
      //despacho la action
      type: GET_APA_DETAIL,
      payload: res.data,
    });

  };
};


export const postApa = (payload: Apa) => {
  return async (dispatch: Dispatch<dispatchApa>) => {
    console.log(payload)
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


export const postPet = (id: string, payload: Pet, accessToken: string) => {
  return async (dispatch: Dispatch<dispatchPet>) => {
    const config = {
      headers: {
        authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjBmNWY1Y2NhZjk2NDM5ZTk4Mzk1NyIsImlhdCI6MTY3OTg4MTcxOX0.7AWgxTJFrbqxveQ2ZI_3oiNritTUfGKvnAP4Ijg4LGU"
      }
    };
    const createPet = await axios.post<Pet>(`http://localhost:3001/pets/create/${id}`, payload, config);
    return dispatch({
      type: ADD_PET,
      payload: createPet.data
    });
  };
};;




export const postUser = (payload: User) => {
  console.log(payload)
  return async (dispatch: Dispatch<dispatchUser>) => {
    const createUser = await axios.post<User>(`http://localhost:3001/users`, payload);
    return dispatch({
      type: POST_USER,
      payload: createUser.data
    });
  };
};

export const getUsers = () => {
  return async (dispatch: Dispatch<dispatchGet>) => {
    const response = await axios.get<User[]>("http://localhost:3001/users");

    return dispatch({
      type: GET_USER,
      payload: response.data
    });
  };
};


export const getDetailUsers = (id: string) => {
  return async (dispatch: Dispatch<dispatchDetailUser>) => {

    const res = await axios.get<User>(`http://localhost:3001/users/${id}`);
    return dispatch({
      //despacho la action
      type: GET_DETAIL_USERS,
      payload: res.data,
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

export const putApa = (id: string, payload: Apa) => {
  console.log(payload)
  return async (dispatch: Dispatch<dispatchApa>) => {
    const editApa = await axios.put<Apa>(`http://localhost:3001/apa/${id}`, payload);
    return dispatch({
      type: EDIT_APA,
      payload: editApa.data
    });
  };
};

export const putUser = (id: string, payload: User) => {
  // console.log(payload)
  return async (dispatch: Dispatch<dispatchUser>) => {
    const editUser = await axios.put<User>(`http://localhost:3001/users/${id}`, payload);
    return dispatch({
      type: EDIT_USER,
      payload: editUser.data
    });
  };
};


export const OrderByAge = (payload: string): filtros => {
  return {
    type: ORDER_BY_AGE,
    payload: payload
  }

}

export const FilteredBySize = (payload: string): filtros => {
  return {
    type: FILTER_BY_SIZE,
    payload: payload
  }
}

export const FilterByLocation = (payload: string): filtros => {
  return {
    type: FILTER_BY_LOCATION,
    payload: payload
  }
}


export const deleteApa = (id: string) => {
  return async (dispatch: Dispatch<dispatchApa>) => {
    const { data } = await axios.delete(`http://localhost:3001/apa/${id}`);

    return dispatch({
      type: DELETE_APA,
      payload: data,
    });
  };
};

export const deleteUser = (id: string) => {
  return async (dispatch: Dispatch<dispatchUser>) => {
    const { data } = await axios.delete(`http://localhost:3001/users/${id}`);

    return dispatch({
      type: DELETE_USER,
      payload: data,
    });
  };
};


export const deletePet = (id: string) => {
  return async (dispatch: Dispatch<dispatchPet>) => {
    const { data } = await axios.delete(`http://localhost:3001/pets/delete/${id}`);

    return dispatch({
      type: DELETE_PET,
      payload: data,
    });
  };
};


export const getFavorite = (id: string) => {
  return async (dispatch: Dispatch<dispatchFav>) => {

    const res = await axios.get<User>(`http://localhost:3001/favorites/${id}`);
    return dispatch({
      //despacho la action
      type: GET_FAVORITE,
      payload: res.data,
    });

  };
};

