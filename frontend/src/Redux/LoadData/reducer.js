import {FETCH_ERROR,FETCH_LOADING,FETCH_SUCCESS} from "./actionTypes"
const init = {
    products:[],
    isLoading:false,
    isError:false
}

export const dataReducer =(state=init,{type,payload})=>{
    switch(type){
        case FETCH_SUCCESS:
            return{
                ...state,
                isLoading:false,
                isError:false,
                products:payload,
            }
        case FETCH_ERROR:
            return{
                ...state,
                isLoading:false,
                isError:true,
            }
        case FETCH_LOADING:
            return{
                ...state,
                isLoading:true,
                isError:false,
            }
        default:
            return state
    }
}