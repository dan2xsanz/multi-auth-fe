import { ResponseInterface } from '@/config/config'
import {
  ProductListFilterInterfaceValues,
  UploadProductInterface,
} from '@/index'
import { REQUEST_URL } from '@/properties'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const GetProductRequest = (
  productId: number | undefined,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .get<ResponseInterface>(
        `${REQUEST_URL}/master-record/product-master/product-by-id/${productId}`,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}

export const CreateProductRequest = (
  data: UploadProductInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/product-master/create-product`,
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

export const UpdateProductRequest = (
  data: UploadProductInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/product-master/update-product`,
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

export const GetProductByFilterRequest = (
  data: ProductListFilterInterfaceValues,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/product-master/product-by-filter`,
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

export const GetAllProductsRequest = (): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/product-master/products`,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}
