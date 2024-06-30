'use client'
import {
  GetProductByFilterRequest,
  UploadProductInterface,
  openErrorNotification,
} from '@/index'
import React, { Fragment, useEffect, useState } from 'react'
import { FavoritesProducts } from './components/favorite-products'
import { accountDetailStore, useStore } from '@/app/store'
import { ResponseInterface } from '@/config/config'
import { ListOfFavoritesByAccount } from '@/app/service/axios-favorites'

export const FavoritesTab = () => {
  // PRODUCT LIST
  const [productList, setProductList] = useState<UploadProductInterface[]>()

  // ACCOUNT DETAILS
  const { accountId } = accountDetailStore()

  // LOADING SCREEN STORE
  const { setIsLoading, isLoading } = useStore()

  // ONCLICK START SELLING
  const getAllFavoriteProducts = async () => {
    setIsLoading(true)
    try {
      const response: ResponseInterface =
        await ListOfFavoritesByAccount(accountId)
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

  useEffect(() => {
    getAllFavoriteProducts()
  }, [])

  return (
    <div className='main-profile-container'>
      {productList?.length && !isLoading && (
        <Fragment>
          {productList?.map((product, index) => (
            <FavoritesProducts
              key={index}
              productUploadDetailsResponse={product}
            />
          ))}
        </Fragment>
      )}
    </div>
  )
}
