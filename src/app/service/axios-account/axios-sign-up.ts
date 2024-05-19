import { CreateAccountInterface } from '@/app/login/components/create-account/data'
import { ResponseInterface } from '@/config/config'
import { REQUEST_URL } from '@/properties'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const CreateAccountRequest = (
  data: CreateAccountInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(`${REQUEST_URL}/master-record/user-master/create-user`, data)
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}
