import { openErrorNotification, openInfoNotification } from '@/index'
import { ProductListInterface } from '../../../data'
import { ResponseInterface } from '@/config/config'
import { FavoritesStateInterface } from '../data'
import {
  DeleteMyFavorites,
  AddToMyFavorites,
  ListOfFavorites,
} from '@/app/service/axios-favorites'

export const addToMyFavoritesOperation = async (
  accountId: number | undefined,
  setIsLoading: (data: boolean) => void,
  productDetails: ProductListInterface,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await AddToMyFavorites({
      isFavorite: true,
      productMasterId: productDetails.id,
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
  productDetails: ProductListInterface,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await DeleteMyFavorites({
      isFavorite: false,
      productMasterId: productDetails.id,
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
