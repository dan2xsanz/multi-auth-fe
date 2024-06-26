import axios, { AxiosError, AxiosResponse } from 'axios'
import { ResponseInterface } from '@/config/config'
import { REQUEST_URL } from '@/properties'
import { LoginInterface } from '@/app'

export const LoginRequest = (
  data: LoginInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(`${REQUEST_URL}/auth/login`, data)
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}
