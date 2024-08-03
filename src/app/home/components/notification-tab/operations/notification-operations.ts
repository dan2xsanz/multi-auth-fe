import { ResponseInterface } from '@/config/config'
import { ListOfNotifications } from '@/app/service/axios-notifications'
import { openErrorNotification } from '@/index'

export const listOfNotificationOperation = async (
  setIsLoading: (data: boolean) => void,
  accountMasterId: number | undefined,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface =
      await ListOfNotifications(accountMasterId)
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess) {
      console.log(response.resultData)
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
