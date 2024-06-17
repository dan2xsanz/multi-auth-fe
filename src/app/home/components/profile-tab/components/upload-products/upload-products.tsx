'use client'
import { UploadProductInterface, UploadProductValues } from './data'
import { accountDetailStore, useStore } from '@/app/store'
import { CommonModal } from '@/app/common/modal/modal'
import { Image as AntdImage, Carousel } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { ResponseInterface } from '@/config/config'
import { Textarea } from '@nextui-org/react'
import './upload-products.css'

import {
  openWarningNotification,
  openSuccessNotification,
  openErrorNotification,
  productConditionItems,
  productCategoryItems,
  CreateProductRequest,
  checkRequiredFields,
  ButtonColorTypeEnum,
  TypographySizeEnum,
  CommonInputField,
  CommonTypography,
  ButtonTypeEnum,
  CommonDropdown,
  CommonButon,
  SizeEnum,
  UpdateProductRequest,
} from '@/index'

interface UploadProductProps {
  openAddNewProduct: boolean
  setRefreshList: (data: boolean) => void
  productUploadDetails: UploadProductInterface
  setOpendAddNewProduct: (data: boolean) => void
  setProductUploadDetails: (data: UploadProductInterface) => void
}

export const UploadProduct = (props: UploadProductProps) => {
  // UPLOAD PRODUCTS PROPS
  const {
    setRefreshList,
    openAddNewProduct,
    productUploadDetails,
    setOpendAddNewProduct,
    setProductUploadDetails,
  } = props

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
    if (productUploadDetails.id === undefined) {
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
        setRefreshList(true)
        setIsLoading(false)
        onClickCancelSellingItems()
      }
    } else {
      setIsLoading(true)
      try {
        const response: ResponseInterface = await UpdateProductRequest({
          ...productUploadDetails,
          accountMasterId: accountId,
        })
        // RETURN SUCCESS MESSAGE
        if (response.isSuccess && response.resultData) {
          openSuccessNotification({
            description: 'Product updated successfully.',
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
        setRefreshList(true)
        setIsLoading(false)
        onClickCancelSellingItems()
      }
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
        'isSold',
        'isDeleted',
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
      if (productImages[0] !== '') {
        startSellingItems()
      } else {
        openWarningNotification({
          description: 'Please upload images' || 'Warning occured',
          placement: 'bottomRight',
        })
      }
    }
  }

  useEffect(() => {
    let productImagesEdit = [
      productUploadDetails.image1,
      productUploadDetails.image2,
      productUploadDetails.image3,
      productUploadDetails.image4,
    ]
    setProductImages(productImagesEdit)
  }, [productUploadDetails])

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
