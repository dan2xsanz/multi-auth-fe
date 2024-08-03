import { HeartReactInterface } from '@/app/home/components/home-tab'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ResponseInterface } from '@/config/config'
import { REQUEST_URL } from '@/properties'

export const AddToHeartReacted = (
  data: HeartReactInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/heart-reacts/add-heart-reacts`,
        data,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}

export const DeleteFromMyHeartReacted = (
    data: HeartReactInterface,
  ): Promise<ResponseInterface> => {
    return new Promise((resolve, reject) => {
      axios
        .put<ResponseInterface>(
          `${REQUEST_URL}/master-record/heart-reacts/delete-heart-reacts`,
          data,
        )
        .then(function (response: AxiosResponse<ResponseInterface>) {
          resolve(response.data)
        })
        .catch(function (error: AxiosError) {
          reject(error)
        })
    })
  }


  
export const ListOfHeartReacts = (
    productMasterId: number | undefined,
  ): Promise<ResponseInterface> => {
    return new Promise((resolve, reject) => {
      axios
        .post<ResponseInterface>(
          `${REQUEST_URL}/master-record/heart-reacts/heart-reacts-by-product/${productMasterId}`,
        )
        .then(function (response: AxiosResponse<ResponseInterface>) {
          resolve(response.data)
        })
        .catch(function (error: AxiosError) {
          reject(error)
        })
    })
  }
  
  export const ListOfFavoritesByAccount = (
    accountMasterId: number | undefined,
  ): Promise<ResponseInterface> => {
    return new Promise((resolve, reject) => {
      axios
        .post<ResponseInterface>(
          `${REQUEST_URL}/master-record/heart-reacts/heart-reacts-by-account/${accountMasterId}`,
        )
        .then(function (response: AxiosResponse<ResponseInterface>) {
          resolve(response.data)
        })
        .catch(function (error: AxiosError) {
          reject(error)
        })
    })
  }