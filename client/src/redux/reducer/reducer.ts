import { GET_APA} from "../actions/actionsTypes"

import {Pet, Apa} from "../types"



interface StateType {
   allPets: Pet[]
   allApas: Apa[]
  }
  
const initialState: StateType = {
   allPets: [],
   allApas:[]
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
      case GET_APA:
        // Modifica aquí el estado en función del valor del tipo de acción
        return { 
            ...state,
            allApas: [...state.allApas, action.payload] };
      default:
        return state;
    }
  };
  
  export default reducer;