import { ResponseInterface } from '@/config/config'
import { REQUEST_URL } from '@/index'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const ListOfNotifications = (
  accountMasterId: number | undefined,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/notifications/notifications-by-account/${accountMasterId}`,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}
