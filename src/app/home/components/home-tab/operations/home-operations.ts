import { ResponseInterface } from '@/config/config'
import {
  ProductListFilterInterfaceValues,
  GetProductByFilterRequest,
  openErrorNotification,
  ProductListInterface,
} from '@/index'

export const getAllProductsOperations = async (
  setIsLoading: (data: boolean) => void,
  setProductList: (data: ProductListInterface[]) => void,
  selectedFilter: ProductListFilterInterfaceValues,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface =
      await GetProductByFilterRequest(selectedFilter)
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess && response.resultData) {
      setProductList(response.resultData)
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
