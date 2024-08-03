'use client'
import { ListOfFavoritesByAccount } from '@/app/service/axios-favorites'
import { FavoritesProducts } from './components/favorite-products'
import React, { Fragment, useEffect, useState } from 'react'
import { accountDetailStore, useStore } from '@/app/store'
import { ProductListInterface } from '../home-tab/data'
import { ResponseInterface } from '@/config/config'
import {
  UploadProductInterface,
  openErrorNotification,
  ProductDetailsModal,
} from '@/index'

export const FavoritesTab = () => {
  // PRODUCT LIST
  const [productList, setProductList] = useState<UploadProductInterface[]>()

  // SELECTED PRODUCT DETAILS
  const [productDetails, setProductDetails] = useState<ProductListInterface>()

  // ACCOUNT DETAILS
  const { accountId } = accountDetailStore()

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // GET ALL FAVORITE PRODUCTS
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
      {productList?.length && (
        <Fragment>
          {productList?.map((product, index) => (
            <FavoritesProducts
              key={index}
              setProductDetails={setProductDetails}
              productUploadDetailsResponse={product}
            />
          ))}
        </Fragment>
      )}
      {productDetails && (
        <ProductDetailsModal
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />
      )}
    </div>
  )
}
