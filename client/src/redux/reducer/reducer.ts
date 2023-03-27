import { ADD_PET, GET_APA, POST_APA, GET_DETAIL_PET, CLEAN_DETAIL, GET_PETS, 
        POST_USER, GET_USER, GET_DETAIL_USERS, GET_APA_DETAIL, ORDER_BY_AGE, 
        FILTER_BY_SIZE, FILTER_BY_LOCATION, ADD_FAVORITE, DELETE_FAVORITE } from "../actions/actionsTypes"
import { Pet, Apa, User } from "../types"

const emptyDetail = {
  _id: "",
  adoption: false,
  age: 0,
  apa: {
    location: "",
  },
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
  petsFilter: Pet[]
  myFavorites: Pet[]
}



const initialState: StateType = {
  allPets: [],
  allApas: [],
  allUsers: [],
  detailUser: emptyDetailUser,
  detailApa: emptyDetailApa,
  detail: emptyDetail,
  petsFilter:[],
  myFavorites: []
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

    case GET_PETS:
      return {
        ...state,
        allPets: action.payload,
        petsFilter: action.payload
      }

    case ADD_FAVORITE:
      return{
        ...state,
        myFavorites: [...state.myFavorites, action.payload]
      }

    case DELETE_FAVORITE:
      return{
        ...state,
        myFavorites: state.myFavorites.filter( pet => pet._id !== action.payload)
      }

      case ORDER_BY_AGE: 
      const isAsc = action.payload;
      const sortByAge = state.petsFilter.sort((a , b) => {
        const numA = a.age
        const numB = b.age
        if(isAsc === 'asc'){
          return numA > numB ? 1 : numA < numB ? -1 : 0;
        }else{
          return numA < numB ? 1 : numA > numB ? -1 : 0;
        }
      })
      
  
      return {
        ...state,
        allPets: sortByAge,
      }
  
      case FILTER_BY_SIZE:  
        const createdFiltered = state.petsFilter.filter((el: Pet) => el.size === action.payload)
        return {
          ...state,
          allPets: createdFiltered
        }

        case FILTER_BY_LOCATION:

        const selectedLocation = action.payload === 'All'
        ? state.petsFilter
        : state.petsFilter.filter(el=>el.apa?.location.includes(action.payload))
        
        return {
             ...state,
             allPets: selectedLocation,
        };

    default:
      return state;
  }
};



export default reducer;