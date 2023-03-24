import { ADD_PET, GET_APA, POST_APA, GET_DETAIL_PET, CLEAN_DETAIL, GET_PETS, POST_USER, GET_USER, GET_DETAIL_USERS, ORDER_BY_AGE, FILTER_BY_SIZE, FILTER_BY_LOCATION } from "../actions/actionsTypes"

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

export interface StateType {
  [x: string]: any
  allPets: Pet[]
  allApas: Apa[]
  detail: Pet
  allUsers: User[]
  detailUser: User
  petsFilter: Pet[]
  apaFilter: Apa[] 
  location: Apa[]
}

const initialState: StateType = {
  allPets: [],
  allApas: [],
  allUsers: [],
  detailUser: emptyDetailUser,
  detail: emptyDetail,
  petsFilter: [],
  apaFilter: [],
  location: [],
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

    case GET_APA:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allApas: action.payload,
        apaFilter: action.payload
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
        petsFilter: action.payload,
      }
    
    case ORDER_BY_AGE: 
    const sortedPets = action.payload === 'asc'
    ? state.petsFilter.sort(function(a,b){
        if(a.age > b.age){
            return 1;
        }
        if (b.age > a.age){
            return -1;
        }
        return 0;
    })
    : state.petsFilter.sort(function(a,b){
        if(a.age > b.age){
            return -1;
        }
        if(b.age > a.age){
            return 1;
        }
        return 0; 
    })

    return {
      ...state,
      allPets: sortedPets,
    }

    case FILTER_BY_SIZE:

      const petsSize = state.petsFilter

      const createdFiltered = action.payload === 'chico'
      ? petsSize.filter(el=>el.size.includes(action.payload))
      : petsSize.filter(el=>el.size.includes(action.payload))
      return {
        ...state,
        allPets: createdFiltered
      }

    // case FILTER_BY_LOCATION:

    // const selectedLocation = action.payload;
    //   const filteredPets = state.pets.filter((pet: { apa: { location: any } }) => {
    //     return pet.apa?.location === selectedLocation;
    //   });
    //   return {
    //     ...state,
    //     allPets: filteredPets,
    //   };


    

    default:
      return state;
  }
};



export default reducer;


/*
const initialState = {
  pets: [],
  filteredPets: [],
  selectedLocation: null,
};

const petReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PETS":
      return {
        ...state,
        pets: action.payload,
        filteredPets: action.payload,
      };
    case "FILTER_PETS":
      const selectedLocation = action.payload;
      const filteredPets = state.pets.filter((pet) => {
        return pet.apa.location === selectedLocation;
      });
      return {
        ...state,
        filteredPets: filteredPets,
        selectedLocation: selectedLocation,
      };
    default:
      return state;
  }
};






 <label>
              <select
                value=""
                className={style.selects}
                onChange={handleTypeSelect}
              >
                <option value="" disabled>
                  Filter b/Types
                </option>
                <option value="All">All Types</option>
                {typesPokemon &&
                  typesPokemon.map((t) => {
                    return (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    );
                  })}
              </select>
            </label>



*/