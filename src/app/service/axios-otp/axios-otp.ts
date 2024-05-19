import axios, { AxiosError, AxiosResponse } from 'axios'
import { ResponseInterface } from '@/config/config'
import { REQUEST_URL } from '@/properties'
import { CreateAccountInterface } from '@/app/login/components/create-account/data'

export const OtpVerificationRequest = (
  data: CreateAccountInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(`${REQUEST_URL}/otp/verify-user`, data)
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}
