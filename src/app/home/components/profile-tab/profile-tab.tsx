'use client'
import { GetProductByFilterRequest, UpdateProductRequest } from '@/app/service'
import React, { Fragment, useEffect, useState } from 'react'
import { openErrorNotification } from '@/app/common/pop-up'
import { accountDetailStore, useStore } from '@/app/store'
import { ProductListInterface } from '../home-tab/data'
import { ResponseInterface } from '@/config/config'
import { AddIcon } from '@/app/common/icons'
import { Image } from '@nextui-org/react'
import './profile-tab.css'
import {
  UploadProductInterface,
  UploadProductValues,
  UploadedProducts,
  UploadProduct,
} from './components'
import {
  ProductDetailsModal,
  ButtonColorTypeEnum,
  ButtonTypeEnum,
  CommonButon,
  SizeEnum,
} from '@/index'

export const ProfileTab = () => {
  // OPEN PRODUCT MODAL
  const [openAddNewProduct, setOpendAddNewProduct] = useState<boolean>(false)

  // PRODUCT LIST
  const [productList, setProductList] = useState<UploadProductInterface[]>()

  // SELECTED PRODUCT DETAILS
  const [productDetails, setProductDetails] = useState<ProductListInterface>()

  // PRODUCT UPLOAD DETAILS
  const [productUploadDetails, setProductUploadDetails] =
    useState<UploadProductInterface>(UploadProductValues)

  // REFRESH LIST HANDLER
  const [refreshList, setRefreshList] = useState<boolean>(false)

  // ACCOUNT DETAILS
  const { accountId, firstName, lastName } = accountDetailStore()

  // LOADING SCREEN STORE
  const { setIsLoading, isLoading } = useStore()

  // ONCLICK START SELLING
  const getAllProducts = async () => {
    setIsLoading(true)
    try {
      const response: ResponseInterface = await GetProductByFilterRequest({
        accountId: accountId,
      })
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

  // UDPATE SPEFIC PRODUCT HANDLER
  const updateSpecificProduct = async (
    currentProductDetails: UploadProductInterface,
  ) => {
    if (currentProductDetails.id !== undefined) {
      setIsLoading(true)
      try {
        await UpdateProductRequest({
          ...currentProductDetails,
          accountMasterId: accountId,
        })
      } catch (error: any) {
        // RETURN ERROR MESSAGE
        openErrorNotification({
          description: error.response?.data?.message || 'An error occurred',
          placement: 'bottomRight',
        })
      } finally {
        setRefreshList(true)
        setIsLoading(false)
      }
    }
  }

  // REFRESH LIST EVENT HANDLER
  useEffect(() => {
    getAllProducts()
  }, [refreshList])

  return (
    <div className='main-profile-container'>
      <div className='main-profile-container-image-name'>
        <div className='main-profile-image-container'>
          <Image
            radius='full'
            alt='NextUI hero Image with delay'
            src='https://static.thenounproject.com/png/5034901-200.png'
          />
        </div>
        <div className='main-profile-name-membership'>
          <div className='main-profile-name-container'>{`${firstName} ${lastName}`}</div>
          <div className='main-profile-membership'>
            SNZ. Member Since October 2024
          </div>
        </div>
      </div>
      {productList?.length ? (
        <div className='selling-title-container'>
          <div>Selling Products</div>

          <CommonButon
            size={SizeEnum.small}
            type={ButtonTypeEnum.submit}
            buttonTxt={'+ Add New Product'}
            onClick={() => setOpendAddNewProduct(true)}
            buttonColorType={ButtonColorTypeEnum.primary}
          />
        </div>
      ) : (
        <></>
      )}
      <div className='listing-container'>
        {!productList?.length && !isLoading && (
          <div
            className='add-new-listing-container'
            onClick={() => setOpendAddNewProduct(true)}
          >
            <AddIcon />
            <div style={{ textAlign: 'center' }}>
              When you start selling, your listings will appear here.
            </div>
          </div>
        )}
        {productList?.length && (
          <Fragment>
            {productList?.map((product, index) => (
              <UploadedProducts
                key={index}
                setProductDetails={setProductDetails}
                productUploadDetailsResponse={product}
                onClickEditProduct={(data: UploadProductInterface) => {
                  setProductUploadDetails(data)
                  setOpendAddNewProduct(true)
                }}
                onClickMarkAsSold={(data: UploadProductInterface) => {
                  updateSpecificProduct(data)
                }}
                onClickDeleteProduct={(data: UploadProductInterface) => {
                  updateSpecificProduct(data)
                }}
              />
            ))}
          </Fragment>
        )}
      </div>
      <UploadProduct
        setRefreshList={setRefreshList}
        openAddNewProduct={openAddNewProduct}
        productUploadDetails={productUploadDetails}
        setOpendAddNewProduct={setOpendAddNewProduct}
        setProductUploadDetails={setProductUploadDetails}
      />
      {productDetails && (
        <ProductDetailsModal
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />
      )}
    </div>
  )
}
