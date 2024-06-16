import { ResponseInterface } from '@/config/config'
import { ProductListByUserInterface, UploadProductInterface } from '@/index'
import { REQUEST_URL } from '@/properties'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const CreateProductRequest = (
  data: UploadProductInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(`${REQUEST_URL}/master-record/product-master/create-product`, data)
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}

export const GetProductByUserRequest = (
  data: ProductListByUserInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(`${REQUEST_URL}/master-record/product-master/product-by-user`, data)
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}
