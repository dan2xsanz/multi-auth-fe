import React, { useState } from 'react'
import './uploaded-products-style.css'
import { Image as AntdImage } from 'antd'
import { productCategoryItems, productConditionItems } from '@/index'

interface UploadedProductsProps {
  key?: number | undefined
  id?: number | undefined
  image1?: string | undefined
  image2?: string | undefined
  image3?: string | undefined
  image4?: string | undefined
  productName?: string | undefined
  productPrice?: string | undefined
  productCategory?: number | string | undefined
  productCondition?: number | string | undefined
  productDescription?: string | undefined
  productLocation?: string | undefined
}

export const UploadedProducts = (props: UploadedProductsProps) => {
  const {
    image1,
    image2,
    image3,
    image4,
    productName,
    productPrice,
    productCategory,
    productLocation,
    productCondition,
    productDescription,
  } = props

  const [mainImageSrc, setMainImageSrc] = useState<string | undefined>(image1)

  return (
    <div className='uploaded-products-main-container'>
      <div className='images-container'>
        <div className='additional-image-container'>
          <AntdImage
            width={80}
            height={80}
            src={image1}
            preview={false}
            className='image-container'
            onMouseEnter={() => setMainImageSrc(image1)}
          />
          <AntdImage
            width={80}
            height={80}
            src={image2}
            preview={false}
            className='image-container'
            onMouseEnter={() => setMainImageSrc(image2)}
          />
          <AntdImage
            width={80}
            height={80}
            src={image3}
            preview={false}
            className='image-container'
            onMouseEnter={() => setMainImageSrc(image3)}
          />
          <AntdImage
            width={80}
            height={80}
            src={image4}
            preview={false}
            className='image-container'
            onMouseEnter={() => setMainImageSrc(image4)}
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
              if (data.key === productCondition?.toString()) return data.label
            })
            .filter((label) => label)
            .join('|')} | ${productName}`}</div>
          <div className='image-on-stock-container'>On Stock</div>
          {/* <div className='image-out-stock-container'>Out Of Stock</div> */}
        </div>
        <div className='image-category'>
          {productCategoryItems.map((data) => {
            if (data.key === productCategory?.toString()) return data.label
          })}
        </div>
        <div className='image-price'>{productPrice}</div>
        <div className='image-description'>{productDescription} </div>
      </div>
    </div>
  )
}
