'use client'
import { accountDetailStore, useStore } from '@/app/store'
import { CommonModal } from '@/app/common/modal/modal'
import { Image as AntdImage, Carousel } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { ProductListInterface } from '../../data'
import './product-details-modal.css'
import {
  deleteMyFavoritesOperation,
  addToMyFavoritesOperation,
  listOfFavoritesOperation,
  getAllCommentsOperation,
} from './operations'
import {
  getProductPriceAndCurrency,
  getProductNameAndCondition,
  getProductCategory,
  TypographySizeEnum,
  discountCalculator,
  getProductItemFor,
  CommonTypography,
  CommentsIcon,
  HeartIcon,
  HighlightedHeartIcon,
  CommentSection,
} from '@/index'
import { FavoritesStateDefaultValue, FavoritesStateInterface } from './data'

interface ProductDetailsModalProps {
  setProductDetails: (data: ProductListInterface | undefined) => void
  productDetails: ProductListInterface
}

export const ProductDetailsModal = (props: ProductDetailsModalProps) => {
  const { productDetails, setProductDetails } = props

  // UPLOADED PRODUCT IMAGES
  const [productImages, setProductImages] = useState<any[]>([null])

  // FAVORITE STATE
  const [favoriteState, setFavoriteState] = useState<FavoritesStateInterface>(
    FavoritesStateDefaultValue,
  )

  const [totalCommentsState, setTotalCommentState] = useState<number>(0)

  // COMMENT SECTION STATE
  const [commentSection, openCommentSection] = useState<boolean>(false)

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // ACCOUNT DETAILS
  const { accountId } = accountDetailStore()

  useEffect(() => {
    let productImagesEdit = [
      `${`data:image/jpeg;base64,`}${productDetails?.image1}`,
      `${`data:image/jpeg;base64,`}${productDetails?.image2}`,
      `${`data:image/jpeg;base64,`}${productDetails?.image3}`,
      `${`data:image/jpeg;base64,`}${productDetails?.image4}`,
    ]
    setProductImages(productImagesEdit)
  }, [productDetails])

  useEffect(() => {
    if (productDetails.id) {
      listOfFavoritesOperation(
        accountId,
        setIsLoading,
        setFavoriteState,
        productDetails.id,
      )
      getAllCommentsOperation(
        setIsLoading,
        productDetails.id,
        setTotalCommentState,
      )
    }
  }, [productDetails.id, favoriteState.isFavorite, accountId, setIsLoading])

  return (
    <CommonModal
      height='480px'
      width='1000px'
      isShowFooterButtons={false}
      isOpen={productDetails !== undefined}
      onCancel={() => setProductDetails(undefined)}
      title={`${productDetails.productName} Details`}
    >
      <div className='modal-body-container'>
        <div className='modal-image-container'>
          <Carousel autoplay>
            {productImages.map((image, index) => (
              <div key={index} className='carousel-content-container'>
                {image ? (
                  <AntdImage src={image} />
                ) : (
                  <h3 className='snz-logo-container'>SNZ.</h3>
                )}
              </div>
            ))}
          </Carousel>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div className='product-detail-container'>
            <CommonTypography
              style={{ fontWeight: 'bolder', marginTop: '-5px' }}
              size={TypographySizeEnum.large}
              label={getProductNameAndCondition(productDetails)}
            />
            <CommonTypography
              style={{ marginTop: '-10px' }}
              size={TypographySizeEnum.medium}
              label={`${getProductItemFor(productDetails)} ${getProductCategory(productDetails)}`}
            />
            {!commentSection && (
              <Fragment>
                <div
                  style={{ display: 'flex', gap: '10px', marginTop: '10px' }}
                >
                  {productDetails.productDiscount && (
                    <div className='image-price'>
                      {discountCalculator(
                        productDetails.productPrice,
                        productDetails.productDiscount,
                        productDetails.productCurrency,
                      )}
                    </div>
                  )}
                  <div
                    className={
                      productDetails.productDiscount
                        ? 'image-price-discounted'
                        : 'image-price'
                    }
                  >
                    {getProductPriceAndCurrency(productDetails)}
                  </div>
                  {productDetails.productDiscount && (
                    <div className='image-price-discount'>{` ${productDetails.productDiscount}% off`}</div>
                  )}
                </div>
                <div className='product-details-image-description'>
                  {productDetails.productDescription}
                </div>
              </Fragment>
            )}
            {commentSection && (
              <CommentSection
                productMasterId={productDetails.id}
                style={{
                  width: '480px',
                  height: '100%',
                  display: 'grid',
                  marginBottom: '30px',
                  padding: '-1px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              />
            )}
          </div>
          <div className='product-details-reaction-container'>
            <div className='product-number-reaction-container'>
              {favoriteState.isFavorite ? (
                <HighlightedHeartIcon
                  onClick={() => {
                    setFavoriteState({
                      ...favoriteState,
                      isFavorite: !favoriteState.isFavorite,
                    })
                    deleteMyFavoritesOperation(
                      accountId,
                      setIsLoading,
                      productDetails,
                    )
                  }}
                />
              ) : (
                <HeartIcon
                  onClick={() => {
                    setFavoriteState({
                      ...favoriteState,
                      isFavorite: !favoriteState.isFavorite,
                    })
                    addToMyFavoritesOperation(
                      accountId,
                      setIsLoading,
                      productDetails,
                    )
                  }}
                />
              )}
              <label>{favoriteState.totalFavorites}</label>
            </div>
            <div className='product-number-reaction-container'>
              <CommentsIcon
                onClick={() => openCommentSection(!commentSection)}
              />
              <label>{totalCommentsState}</label>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}
