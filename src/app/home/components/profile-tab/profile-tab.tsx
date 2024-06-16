/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { AddIcon } from '@/app/common/icons'
import {
  UploadProduct,
  UploadProductInterface,
  UploadedProducts,
} from './components'
import { Image } from '@nextui-org/react'
import React, { Fragment, useEffect, useState } from 'react'
import './profile-tab.css'
import { accountDetailStore, useStore } from '@/app/store'
import { ResponseInterface } from '@/config/config'
import { GetProductByUserRequest } from '@/app/service'
import { openErrorNotification } from '@/app/common/pop-up'
import {
  ButtonColorTypeEnum,
  ButtonTypeEnum,
  CommonButon,
  SizeEnum,
} from '@/index'

export const ProfileTab = () => {
  // OPEN PRODUCT MODAL
  const [openAddNewProduct, setOpendAddNewProduct] = useState<boolean>(false)

  const [productList, setProductList] = useState<UploadProductInterface[]>()

  // ACCOUNT ID
  const { accountId } = accountDetailStore()

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // ONCLICK START SELLING
  const getAllProducts = async () => {
    setIsLoading(true)
    try {
      const response: ResponseInterface = await GetProductByUserRequest({
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

  useEffect(() => {
    getAllProducts()
  }, [openAddNewProduct])

  return (
    <div className='main-profile-container'>
      <div className='main-profile-container-image-name'>
        <div className='main-profile-image-container'>
          <Image
            radius='full'
            alt='NextUI hero Image with delay'
            src='https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/447232753_822138273124293_1427859901252616171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGy1iW-53mgIpBdjwlBFWgI9aLNvUZSo4r1os29RlKjisel-M7o6K4ye6XTyoU1WCiXq_wQrZMtBRF16GdIHaqs&_nc_ohc=JwmXfGhaXjAQ7kNvgEAG4dK&_nc_ht=scontent.filo1-1.fna&oh=00_AYAvwqKWm8GJgt3XdpRj7afBw5PoAc_fQ6S1dT3HJhxxwA&oe=666B73EA'
          />
        </div>
        <div className='main-profile-name-membership'>
          <div className='main-profile-name-container'>Dan Lester Sanz</div>
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
        {!productList?.length ? (
          <div
            className='add-new-listing-container'
            onClick={() => setOpendAddNewProduct(true)}
          >
            <AddIcon />
            <div>When you start selling, your listings will appear here.</div>
          </div>
        ) : (
          <Fragment>
            {productList?.map((product, index) => (
              <UploadedProducts
                key={index}
                image1={`${`data:image/jpeg;base64,`}${product.image1}`}
                image2={`${`data:image/jpeg;base64,`}${product.image2}`}
                image3={`${`data:image/jpeg;base64,`}${product.image3}`}
                image4={`${`data:image/jpeg;base64,`}${product.image4}`}
                productName={product.productName}
                productPrice={product.productPrice}
                productCategory={product.productCategory}
                productCondition={product.productCondition}
                productDescription={product.productDescription}
                productLocation={product.productLocation}
              />
            ))}
          </Fragment>
        )}
      </div>
      <UploadProduct
        openAddNewProduct={openAddNewProduct}
        setOpendAddNewProduct={setOpendAddNewProduct}
      />
    </div>
  )
}
