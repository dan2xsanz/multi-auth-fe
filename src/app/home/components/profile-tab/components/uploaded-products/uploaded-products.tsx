import React, { useEffect, useState } from 'react'
import './uploaded-products-style.css'
import { Image as AntdImage } from 'antd'
import {
  UploadProductInterface,
  UploadProductValues,
  productCategoryItems,
  productConditionItems,
} from '@/index'

interface UploadedProductsProps {
  id?: number | undefined
  key?: number | undefined
  productUploadDetailsResponse: UploadProductInterface
  onClickMarkAsSold: (data: UploadProductInterface) => void
  onClickEditProduct: (data: UploadProductInterface) => void
  onClickDeleteProduct: (data: UploadProductInterface) => void
}

export const UploadedProducts = (props: UploadedProductsProps) => {
  const {
    onClickMarkAsSold,
    onClickEditProduct,
    onClickDeleteProduct,
    productUploadDetailsResponse,
  } = props

  // PRODUCT UPLOAD DETAILS
  const [productUploadDetails, setProductUploadDetails] =
    useState<UploadProductInterface>(productUploadDetailsResponse)

  // MAIN IMAGE
  const [mainImageSrc, setMainImageSrc] = useState<string | undefined>(
    productUploadDetails.image1,
  )

  const onClickMarkAsSoldHandler = () => {
    let maskAsSoldProductDetails: UploadProductInterface = {
      ...productUploadDetails,
      isSold: true,
    }
    onClickMarkAsSold(maskAsSoldProductDetails)
  }

  const onClickMarkAsDeletedHandler = () => {
    let maskAsDeletedProductDetails: UploadProductInterface = {
      ...productUploadDetails,
      isDeleted: true,
    }
    onClickDeleteProduct(maskAsDeletedProductDetails)
  }

  const onClickEditHandler = () => {
    onClickEditProduct(productUploadDetails)
  }

  useEffect(() => {
    setProductUploadDetails({
      ...productUploadDetailsResponse,
      image1: `${`data:image/jpeg;base64,`}${productUploadDetailsResponse.image1}`,
      image2: `${`data:image/jpeg;base64,`}${productUploadDetailsResponse.image2}`,
      image3: `${`data:image/jpeg;base64,`}${productUploadDetailsResponse.image3}`,
      image4: `${`data:image/jpeg;base64,`}${productUploadDetailsResponse.image4}`,
      productCategory: productUploadDetailsResponse.productCategory?.toString(),
      productCondition:
        productUploadDetailsResponse.productCondition?.toString(),
    })
  }, [productUploadDetailsResponse])

  useEffect(() => {
    setMainImageSrc(productUploadDetails.image1)
  }, [productUploadDetails.image1])

  return (
    <div className='uploaded-products-main-container'>
      <div className='images-container'>
        <div className='additional-image-container'>
          <AntdImage
            width={80}
            height={80}
            preview={false}
            className='image-container'
            src={productUploadDetails.image1}
            onMouseEnter={() => setMainImageSrc(productUploadDetails.image1)}
          />
          <AntdImage
            width={80}
            height={80}
            preview={false}
            className='image-container'
            src={productUploadDetails.image2}
            onMouseEnter={() => setMainImageSrc(productUploadDetails.image2)}
          />
          <AntdImage
            width={80}
            height={80}
            preview={false}
            className='image-container'
            src={productUploadDetails.image3}
            onMouseEnter={() => setMainImageSrc(productUploadDetails.image3)}
          />
          <AntdImage
            width={80}
            height={80}
            preview={false}
            className='image-container'
            src={productUploadDetails.image4}
            onMouseEnter={() => setMainImageSrc(productUploadDetails.image4)}
          />
        </div>
        <div className='displayed-image-container'>
          <AntdImage width={380} height={365} src={mainImageSrc} />
        </div>
      </div>
      <div className='image-details'>
        <div className='image-name-availability-container'>
          <div className='image-name-detail'>{`${productConditionItems
            .map((data) => {
              if (
                data.key === productUploadDetails.productCondition?.toString()
              )
                return data.label
            })
            .filter((label) => label)
            .join('|')} | ${productUploadDetails.productName}`}</div>
          {productUploadDetails.isSold ? (
            <div className='image-out-stock-container'>Out Of Stock</div>
          ) : (
            <div className='image-on-stock-container'>In Stock</div>
          )}
        </div>
        <div className='image-category'>
          {productCategoryItems.map((data) => {
            if (data.key === productUploadDetails.productCategory?.toString())
              return data.label
          })}
        </div>
        <div className='image-price'>{productUploadDetails.productPrice}</div>
        <div className='image-description'>
          {productUploadDetails.productDescription}
        </div>
        {!productUploadDetails.isSold && (
          <div className='action-buttons-container'>
            <div
              className='action-button-style'
              onClick={onClickMarkAsSoldHandler}
            >
              Mark as sold
            </div>
            <div className='action-button-style' onClick={onClickEditHandler}>
              Edit
            </div>
            <div
              className='action-button-style'
              onClick={onClickMarkAsDeletedHandler}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
