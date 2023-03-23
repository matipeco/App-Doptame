import { ADD_PET, GET_APA, POST_APA, GET_DETAIL_PET, CLEAN_DETAIL, GET_PETS, POST_USER, GET_USER, GET_DETAIL_USERS, GET_APA_DETAIL, EDIT_PET, EDIT_APA } from "../actions/actionsTypes"

import { Pet, Apa, User } from "../types"

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

const emptyDetailUser = {
  _id: "",
  name: "",
  username: "",
  last_name: "",
  email: "",
  location: "",
  image: ""
}

const emptyDetailApa = {
  _id: "",
  name: "",
  password:  "",
  email: "",
  location:  "",
  description:  "",
  cbu_cvu:  "",
  url:  "",
  telephone: "",
  provincia:  "",
  cuit:  "",
}

export interface StateType {
  allPets: Pet[]
  allApas: Apa[]
  detail: Pet
  allUsers: User[]
  detailUser: User
  detailApa: Apa

}



const initialState: StateType = {
  allPets: [],
  allApas: [],
  allUsers: [],
  detailUser: emptyDetailUser,
  detailApa: emptyDetailApa,
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

    case POST_APA:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allApas: [...state.allApas, action.payload]
      };
      case GET_APA_DETAIL:
      return {
        ...state,
        detailApa: action.payload
      }

    case GET_APA:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allApas: action.payload
      };

    case POST_USER:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allPets: [...state.allUsers, action.payload]
      };
    case GET_USER:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allUsers: action.payload
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

    case GET_DETAIL_USERS:
      return {
        ...state,
        detailUser: action.payload
      }

      case EDIT_PET:
        return {
          ...state,
        };
      
        case EDIT_APA:
          return {
            ...state,
          };
      

    case GET_PETS:
      return {
        ...state,
        allPets: action.payload
      }


    default:
      return state;
  }
};



export default reducer;