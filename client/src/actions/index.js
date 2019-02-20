import axios from 'axios'

import  AuthService from '../Component/services/auth-service'
import  AxiosService from '../Component/services/axios-service'

import {FETCH_RENTALS,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAIL,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_FAILS,
  FETCH_RENTAL_BY_ID_INIT,
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,
  LOGOUT
} from './types'
  
const axiosInstance = AxiosService.getInstance();


 const fetchRentalsSuccess = (rentals) => {
     return {
         type:'FETCH_RENTALS_SUCCESS',
         rentals
      }
 }

  const fetchRentalsfail = (errors) => {
  return {
      type:'FETCH_RENTALS_FAIL',
      errors
   }
}

export const fetchRentals =() =>
{
  return dispatch => {
     axiosInstance.get('/rentals').then(rentals => {
      //  console.log('actiondata',rentals.data.foundRental)
         dispatch(fetchRentalsSuccess(rentals.data.foundRental));
      },
      (err) => {
        dispatch(fetchRentalsfail());
        }
      
      )
      
  }

}

//FETCH RENTAL BY ID

const fetchRentalByIdInit = () => {
  return {
      type:'FETCH_RENTAL_BY_ID_INIT'
   }
}

const fetchRentalByIdSuccess = (rental) => {
  return {
      type:'FETCH_RENTAL_BY_ID_SUCCESS',
      rental
   }
}

export const fetchRentalById =(id) =>
{
   
  return dispatch => {
    dispatch(fetchRentalByIdInit())
     axiosInstance.get(`/rentals/${id}`).then(rental => {
      //  console.log('actiondata',rentals.data.foundRental)
         dispatch(fetchRentalByIdSuccess(rental.data.foundRental));
      })
      
  }


}
 


  


  //Fetch Rental





  // Auth action 

  export const register = (userData) => {
    return axios.post('/api/v1/users/register',{...userData}).then(
      (res) => {
        return res.data
       },

       (err) => {
       return Promise.reject(err.response.data.errors)
       }
    )
  }

  const loginSuccess = () => {
    return {
      type: LOGIN_SUCCESS,
    }
   }

   const loginFailure = (errors) => {
    return {
      type: LOGIN_FAILURE,
      errors
    }
  }

  export const checkAuthState = () => {
    return dispatch => {
      if(AuthService.isAuthenticated()) {
        dispatch(loginSuccess())
      }
    } 
  }

  export const login =(userData) =>
  {
    return dispatch => {
      return axiosInstance.post('/users/auth', userData)
        .then(res => res.data)
        .then(token => {
          AuthService.saveToken(token)
          dispatch(loginSuccess());
        })
        .catch(({response}) => {
          dispatch(loginFailure(response.data.errors));
        })
    }

  }

  export const logout = () => {
    AuthService.invalidateUser();
  
    return {
      type: LOGOUT
    }
  }
