import { ADD_PET, GET_APA, POST_APA, GET_DETAIL_PET, CLEAN_DETAIL, SET_SELECTED_CATEGORY, GET_PETS, EDIT_PET} from "../actions/actionsTypes"

import { Pet, Apa } from "../types"

const emptyDetail = {
  _id: "",
  adoption: false,
  age: 0,
  apa: "",
  image: "",
  name: "",
  size: "",
  status: true,
  type: "",
  description: ""
}

export interface StateType {
  allPets: Pet[]
  allApas: Apa[]
  detail: Pet
  selectedCategory: string
}

const initialState: StateType = {
  allPets: [],
  allApas: [],
  selectedCategory: '',
  detail: emptyDetail
}



type ActionType = {
  type: string;
  payload: any;
};

const reducer = (
  state: StateType = initialState,
  action: ActionType
): StateType => {

  switch (action.type) {
    //Setea el estado selectedCategory segun la card que elija el usuario en Home
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      }

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
        detail: emptyDetail
      }


    case GET_DETAIL_PET:
      return {
        ...state,
        detail: action.payload
      }

    case GET_PETS:
      return {
        ...state,
        allPets: action.payload
      }

      case EDIT_PET:
        const withoutOldPetVersion= state.allPets.filter(p=>p._id !== action.payload._id)
        return {
          ...state,
          allPets: [withoutOldPetVersion, action.payload]
        };


    default:
      return state;
  }
};



export default reducer;