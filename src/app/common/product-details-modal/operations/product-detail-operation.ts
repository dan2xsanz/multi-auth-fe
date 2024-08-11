import { ProductListInterface } from '@/app/home/components/home-tab/data'
import { FavoritesStateInterface, HeartReactStateInterface } from '../data'
import { ResponseInterface } from '@/config/config'
import {
  DeleteFromMyHeartReacted,
  openErrorNotification,
  openInfoNotification,
  AddToHeartReacted,
  ListOfHeartReacts,
  TotalComments,
  GetProductRequest,
} from '@/index'
import {
  DeleteMyFavorites,
  AddToMyFavorites,
  ListOfFavorites,
} from '@/app/service/axios-favorites'

export const addToMyFavoritesOperation = async (
  accountId: number | undefined,
  setIsLoading: (data: boolean) => void,
  productDetails: ProductListInterface | undefined,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await AddToMyFavorites({
      isFavorite: true,
      productMasterId: productDetails?.id,
      accountMasterId: accountId,
    })
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess) {
      openInfoNotification({
        description: 'Added to My Favorites',
        placement: 'bottomRight',
      })
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

export const deleteMyFavoritesOperation = async (
  accountId: number | undefined,
  setIsLoading: (data: boolean) => void,
  productDetails: ProductListInterface | undefined,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await DeleteMyFavorites({
      isFavorite: false,
      productMasterId: productDetails?.id,
      accountMasterId: accountId,
    })
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

export const listOfFavoritesOperation = async (
  accountId: number | undefined,
  setIsLoading: (data: boolean) => void,
  setFavoriteState: (data: FavoritesStateInterface) => void,
  productMasterId: number | undefined,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await ListOfFavorites(productMasterId)
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess) {
      // TODO HERE
      if (response.resultData.length >= 0) {
        let arrayOfUser: number[] = response.resultData
        response.resultData.includes(accountId)
          ? setFavoriteState({
              totalFavorites: arrayOfUser.length,
              isFavorite: true,
            })
          : setFavoriteState({
              totalFavorites: arrayOfUser.length,
              isFavorite: false,
            })
      }
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

export const addToMyHeartedProductOperation = async (
  accountId: number | undefined,
  setIsLoading: (data: boolean) => void,
  productDetails: ProductListInterface | undefined,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await AddToHeartReacted({
      isHearted: true,
      productMasterId: productDetails?.id,
      accountMasterId: accountId,
      notifiedAccountMasterId: productDetails?.accountMasterId,
    })
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

export const deleteHeartedProductOperation = async (
  accountId: number | undefined,
  setIsLoading: (data: boolean) => void,
  productDetails: ProductListInterface | undefined,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await DeleteFromMyHeartReacted({
      isHearted: false,
      productMasterId: productDetails?.id,
      accountMasterId: accountId,
      notifiedAccountMasterId: productDetails?.accountMasterId,
    })
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

export const listOfHeartedProductOperation = async (
  accountId: number | undefined,
  setIsLoading: (data: boolean) => void,
  setHeartReactState: (data: HeartReactStateInterface) => void,
  productMasterId: number | undefined,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await ListOfHeartReacts(productMasterId)
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess) {
      // TODO HERE
      if (response.resultData.length >= 0) {
        let arrayOfUser: number[] = response.resultData
        response.resultData.includes(accountId)
          ? setHeartReactState({
              totalHeartReact: arrayOfUser.length,
              isHearted: true,
            })
          : setHeartReactState({
              totalHeartReact: arrayOfUser.length,
              isHearted: false,
            })
      }
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

export const getAllCommentsOperation = async (
  setIsLoading: (data: boolean) => void,
  productMasterId: number | undefined,
  setTotalComments: (data: number) => void,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await TotalComments({
      productMasterId: productMasterId,
    })
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess && response.resultData) {
      setTotalComments(response.resultData)
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

export const getProductMasterId = async (
  setIsLoading: (data: boolean) => void,
  productMasterId: number | undefined,
  setProductDetails: (data: ProductListInterface | undefined) => void,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await GetProductRequest(productMasterId)
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess && response.resultData) {
      setProductDetails(response.resultData)
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
