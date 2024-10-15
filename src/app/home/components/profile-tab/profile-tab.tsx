'use client'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { accountDetailStore, useStore } from '@/app/store'
import { ProductListInterface } from '../home-tab/data'
import { ResponseInterface } from '@/config/config'
import { AddIcon } from '@/app/common/icons'
import { Image } from '@nextui-org/react'
import {
  GetProductByFilterRequest,
  UpdateAccountRequest,
  UpdateProductRequest,
} from '@/app/service'
import {
  openSuccessNotification,
  openErrorNotification,
} from '@/app/common/pop-up'
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
import {
  createAccountDefaultValues,
  CreateAccountInterface,
} from '@/app/login/components'

export const ProfileTab = () => {
  // ACCOUNT DETAILS
  const accountStoreProperties = accountDetailStore()

  // OPEN PRODUCT MODAL
  const [openAddNewProduct, setOpendAddNewProduct] = useState<boolean>(false)

  // PRODUCT LIST
  const [productList, setProductList] = useState<UploadProductInterface[]>()

  // SELECTED PRODUCT DETAILS
  const [productDetails, setProductDetails] = useState<ProductListInterface>()

  // OPEN PRODUCT DETAIL MODAL
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)

  // PRODUCT UPLOAD DETAILS
  const [productUploadDetails, setProductUploadDetails] =
    useState<UploadProductInterface>(UploadProductValues)

  // REFRESH LIST HANDLER
  const [refreshList, setRefreshList] = useState<boolean>(false)

  // LOADING SCREEN STORE
  const { setIsLoading, isLoading } = useStore()

  // UPLOAD IMAGE REF
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ONCLICK START SELLING
  const getAllProducts = async () => {
    setIsLoading(true)
    try {
      const response: ResponseInterface = await GetProductByFilterRequest({
        accountId: accountStoreProperties.accountId,
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

  // UDPATE ACCOUNT MASTER REQUEST
  const updateAccountRequest = async (data: CreateAccountInterface) => {
    setIsLoading(true)
    try {
      const response: ResponseInterface = await UpdateAccountRequest(data)
      // RETURN SUCCESS MESSAGE
      if (response.isSuccess && response.resultData) {
        accountStoreProperties.setCoverImg(
          `url(data:image/png;base64,${response.resultData.coverImg})`,
        )
        openSuccessNotification({
          description: 'Updated successfully.',
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

  // UDPATE SPEFIC PRODUCT HANDLER
  const updateSpecificProduct = async (
    currentProductDetails: UploadProductInterface,
  ) => {
    if (currentProductDetails.id !== undefined) {
      setIsLoading(true)
      try {
        await UpdateProductRequest({
          ...currentProductDetails,
          accountMasterId: accountStoreProperties.accountId,
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

  // UPLOAD IMAGE HANDLER
  const uploadCoverImageHandler = (e: any) => {
    const selectedImage = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const imageData = reader.result
      updateAccountRequest({
        ...accountStoreProperties,
        id: accountStoreProperties.accountId,
        coverImg: imageData,
      })
    }
    if (selectedImage) {
      reader.readAsDataURL(selectedImage)
    }
    e.target.value = null
  }

  const openFileExplorerButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // REFRESH LIST EVENT HANDLER
  useEffect(() => {
    getAllProducts()
  }, [refreshList])

  useEffect(() => {
    console.log(accountStoreProperties.coverImg)
  }, [accountStoreProperties.coverImg])

  return (
    <div className='main-profile-container'>
      <div
        className='main-profile-container-cover-image-name'
        style={{
          backgroundImage:
            accountStoreProperties.coverImg && accountStoreProperties.coverImg
              ? accountStoreProperties.coverImg
              : 'none',
        }}
      >
        <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={uploadCoverImageHandler}
          />
          <CommonButon
            size={SizeEnum.small}
            type={ButtonTypeEnum.submit}
            buttonTxt={'Change cover'}
            onClick={openFileExplorerButton}
            buttonColorType={ButtonColorTypeEnum.primary}
          />
        </div>
      </div>

      <div className='main-profile-image-details-container'>
        <div className='main-profile-image-container'>
          <Image
            radius='full'
            alt='NextUI hero Image with delay'
            src='https://scontent.fceb3-1.fna.fbcdn.net/v/t39.30808-1/457217448_871617531509700_685530745967946158_n.jpg?stp=dst-jpg_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHWUsDP6InZa_BBMedUz16_z8HNuW8dGtPPwc25bx0a0-5djabfCPzUwGIhkCrz_LpZCpwnAJXMPPzloOsb_-L0&_nc_ohc=sDmOeuUqnrEQ7kNvgHrtoHs&_nc_ht=scontent.fceb3-1.fna&_nc_gid=A9NQrs8mecCcENty-6cwofM&oh=00_AYDscQtQIbl0CeYjc2mRbVzfSQ8XBAxwMAD96KGKUVbOzA&oe=6712CB62'
          />
        </div>
        <div className='main-profile-name-membership'>
          <div className='main-profile-name-container'>{`${accountStoreProperties.firstName} ${accountStoreProperties.lastName}`}</div>
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
                setOpenDetailModal={setOpenDetailModal}
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
          openDetailModal={openDetailModal}
          productMasterId={productDetails.id}
          setOpenDetailModal={setOpenDetailModal}
        />
      )}
    </div>
  )
}
