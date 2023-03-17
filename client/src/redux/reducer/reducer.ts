import { ADD_PET, GET_APA, POST_APA, GET_DETAIL_PET, CLEAN_DETAIL } from "../actions/actionsTypes"

import { Pet, Apa } from "../types"



interface StateType {
  allPets: Pet[]
  allApas: Apa[]
  detail: {}
}

const initialState: StateType = {
  allPets: [],
  allApas: [],
  detail: {}

};

type ActionType = {
  type: string;
  payload: any;
};

const reducer = (
  state: StateType = initialState,
  action: ActionType
): StateType => {
  switch (action.type) {
    case POST_APA:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allApas: [...state.allApas, action.payload]
      };

    case GET_APA:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allApas: action.payload
      };

    case ADD_PET:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allPets: [...state.allPets, action.payload]
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        detail: {}
      }

    case GET_DETAIL_PET:
      return {
        ...state,
        detail: action.payload
      }

    default:
      return state;
  }
};



export default reducer;