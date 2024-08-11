import {
  ListOfNotifications,
  ReadtNotification,
} from '@/app/service/axios-notifications'
import { ResponseInterface } from '@/config/config'
import { openErrorNotification } from '@/index'
import { NoticationInterface } from '../data'

export const listOfNotificationOperation = async (
  setIsLoading: (data: boolean) => void,
  accountMasterId: number | undefined,
  setNotificationList: (data: NoticationInterface[]) => void,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface =
      await ListOfNotifications(accountMasterId)
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess) {
      setNotificationList(response.resultData)
    }
  } catch (error: any) {
    // RETURN ERROR MESSAGE
    openErrorNotification({
      description: error.response?.data?.message || 'An error occurred',
      placement: 'bottomRight',
    })
  } finally {
    setIsLoading(false)
  }
}

export const readNotificationOperation = async (
  setIsLoading: (data: boolean) => void,
  notificationDetails: NoticationInterface,
) => {
  setIsLoading(true)
  try {
    await ReadtNotification(notificationDetails)
  } catch (error: any) {
    // RETURN ERROR MESSAGE
    openErrorNotification({
      description: error.response?.data?.message || 'An error occurred',
      placement: 'bottomRight',
    })
  } finally {
    setIsLoading(false)
  }
}
