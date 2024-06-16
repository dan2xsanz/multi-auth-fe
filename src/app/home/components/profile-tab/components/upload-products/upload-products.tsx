'use client'
import { UploadProductInterface, UploadProductValues } from './data'
import { accountDetailStore, useStore } from '@/app/store'
import { CommonModal } from '@/app/common/modal/modal'
import { Image as AntdImage, Carousel } from 'antd'
import { ResponseInterface } from '@/config/config'
import { Textarea } from '@nextui-org/react'
import { useRef, useState } from 'react'
import './upload-products.css'

import {
  openSuccessNotification,
  openErrorNotification,
  productConditionItems,
  productCategoryItems,
  CreateProductRequest,
  ButtonColorTypeEnum,
  TypographySizeEnum,
  CommonInputField,
  CommonTypography,
  ButtonTypeEnum,
  CommonDropdown,
  CommonButon,
  SizeEnum,
  checkRequiredFields,
} from '@/index'

interface UploadProductProps {
  openAddNewProduct: boolean
  setOpendAddNewProduct: (data: boolean) => void
}

export const UploadProduct = (props: UploadProductProps) => {
  // UPLOAD PRODUCTS PROPS
  const { openAddNewProduct, setOpendAddNewProduct } = props

  // UPLOADED PRODUCT IMAGES
  const [productImages, setProductImages] = useState<any[]>([null])

  // ERROR KEY FIEDLS HANDLER
  const [errorFields, setErrorFields] = useState<string[]>([])

  // UPLOAD IMAGE REF
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ACCOUNT ID
  const { accountId } = accountDetailStore()

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // PRODUCT UPLOAD DETAILS
  const [productUploadDetails, setProductUploadDetails] =
    useState<UploadProductInterface>(UploadProductValues)

  // UPLOAD IMAGE HANDLER
  const uploadImageHandler = (e: any) => {
    const imagesArray: React.SetStateAction<any[]> = []
    const selectedImages = e.target.files

    // RETURN ERROR IF NOT EQUAL TO 4 IMAGES
    if (selectedImages.length !== 4) {
      return openErrorNotification({
        description: 'Make sure to upload at least 4 images.',
        placement: 'bottomRight',
      })
    }

    for (let i = 0; i < selectedImages.length && i < 4; i++) {
      const selectedImage = selectedImages[i]
      const reader = new FileReader()

      reader.onload = ((index) => {
        return () => {
          imagesArray[index] = reader.result
          if (imagesArray.filter(Boolean).length === 4) {
            onChangeFields({
              ...productUploadDetails,
              image1: imagesArray[0],
              image2: imagesArray[1],
              image3: imagesArray[2],
              image4: imagesArray[3],
            })
            setProductImages(imagesArray)
          }
        }
      })(i)

      reader.readAsDataURL(selectedImage)
    }
    e.target.value = null
  }

  // OPEN FILE EXPLORER BUTTON
  const openFileExplorerButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // ON CHANGE FIELDS
  const onChangeFields = (data: UploadProductInterface) => {
    setProductUploadDetails(data)
  }

  // ON CLICK CANCEL BUTTON
  const onClickCancelSellingItems = () => {
    setErrorFields([])
    setProductImages([])
    setOpendAddNewProduct(false)
    onChangeFields(UploadProductValues)
  }

  // ONCLICK START SELLING
  const startSellingItems = async () => {
    setIsLoading(true)
    try {
      const response: ResponseInterface = await CreateProductRequest({
        ...productUploadDetails,
        accountMasterId: accountId,
      })
      // RETURN SUCCESS MESSAGE
      if (response.isSuccess && response.resultData) {
        openSuccessNotification({
          description: 'Product uploaded successfully.',
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
      onClickCancelSellingItems()
    }
  }

  // VALIDATE REQUIRED FIELDS BEFORE SELLING
  const onClickStartSellingItems = () => {
    // VALIDATE REQUIRED FIELDS
    const errorFields: string[] = checkRequiredFields(
      UploadProductValues,
      productUploadDetails,
      [
        'id',
        'image1',
        'image2',
        'image3',
        'image4',
        'productCategory',
        'productCondition',
        'accountMasterId',
      ],
    )
    if (productUploadDetails.productCategory === '') {
      errorFields.push('productCategory')
    }
    if (productUploadDetails.productCondition === '') {
      errorFields.push('productCondition')
    }
    setErrorFields(errorFields)
    if (errorFields.length === 0) {
      startSellingItems()
    }
  }

  return (
    <CommonModal
      height='480px'
      width='1000px'
      title='Item for Sale'
      onCancelText='Cancel'
      isOpen={openAddNewProduct}
      onOkay={onClickStartSellingItems}
      onOkayText='Start selling this item'
      onCancel={onClickCancelSellingItems}
    >
      <div className='modal-body-container'>
        <div className='modal-image-container'>
          <Carousel>
            {productImages[0] ? (
              <div className='carousel-content-container'>
                <AntdImage src={productImages[0]} />
              </div>
            ) : (
              <div>
                <h3 className='snz-logo-container'>SNZ.</h3>
              </div>
            )}
            {productImages[1] ? (
              <div className='carousel-content-container'>
                <AntdImage src={productImages[1]} />
              </div>
            ) : (
              <div>
                <h3 className='snz-logo-container'>SNZ.</h3>
              </div>
            )}
            {productImages[2] ? (
              <div className='carousel-content-container'>
                <AntdImage src={productImages[2]} />
              </div>
            ) : (
              <div>
                <h3 className='snz-logo-container'>SNZ.</h3>
              </div>
            )}
            {productImages[3] ? (
              <div className='carousel-content-container'>
                <AntdImage src={productImages[3]} />
              </div>
            ) : (
              <div>
                <h3 className='snz-logo-container'>SNZ.</h3>
              </div>
            )}
          </Carousel>
        </div>
        <div className='product-detail-container'>
          <CommonTypography
            label={'Product details'}
            style={{ marginBottom: '5px' }}
            size={TypographySizeEnum.xsmall}
          />
          <CommonInputField
            required
            key={'productName'}
            type={'productName'}
            label={'Product Name'}
            size={SizeEnum.small}
            isError={errorFields.includes('productName')}
            value={productUploadDetails.productName}
            onChange={(data) => {
              onChangeFields({
                ...productUploadDetails,
                productName: data.target.value,
              })
            }}
          />
          <CommonInputField
            required
            key={'productPrice'}
            type={'productPrice'}
            label={'Product Price'}
            size={SizeEnum.small}
            value={productUploadDetails.productPrice}
            isError={errorFields.includes('productPrice')}
            onChange={(data) => {
              onChangeFields({
                ...productUploadDetails,
                productPrice: data.target.value,
              })
            }}
          />
          <CommonDropdown
            required
            key={'productCategory'}
            label={'Product Category'}
            items={productCategoryItems}
            defaultSelectedKeys={['1']}
            isError={errorFields.includes('productCondition')}
            selectedKeys={[productUploadDetails.productCategory]}
            onChange={(data) => {
              if (data.target.value) {
                onChangeFields({
                  ...productUploadDetails,
                  productCategory: data.target.value,
                })
              }
            }}
          />
          <CommonDropdown
            required
            key={'productCondition'}
            items={productConditionItems}
            label={'Product Condition'}
            defaultSelectedKeys={['1']}
            isError={errorFields.includes('productCondition')}
            selectedKeys={[productUploadDetails.productCondition]}
            onChange={(data) => {
              if (data.target.value) {
                onChangeFields({
                  ...productUploadDetails,
                  productCondition: data.target.value,
                })
              }
            }}
          />
          <Textarea
            maxLength={1000}
            key={'productDescription'}
            radius='none'
            type='description'
            className='text-area-style'
            label={'Product Description'}
            value={productUploadDetails.productDescription}
            style={{ borderColor: 'black', borderWidth: '0px' }}
            onChange={(data) => {
              onChangeFields({
                ...productUploadDetails,
                productDescription: data.target.value,
              })
            }}
          />
          <CommonInputField
            required
            key={'productLocation'}
            type={'location'}
            label={'Location'}
            size={SizeEnum.small}
            isError={errorFields.includes('productLocation')}
            value={productUploadDetails.productLocation}
            onChange={(data) => {
              onChangeFields({
                ...productUploadDetails,
                productLocation: data.target.value,
              })
            }}
          />
          <input
            multiple
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={uploadImageHandler}
            style={{ display: 'none' }}
          />
          <CommonButon
            fullWidth={true}
            size={SizeEnum.medium}
            style={{ minHeight: '40px' }}
            type={ButtonTypeEnum.submit}
            onClick={openFileExplorerButton}
            buttonTxt={'Upload Product Images'}
            buttonColorType={ButtonColorTypeEnum.primary}
          />
        </div>
      </div>
    </CommonModal>
  )
}
