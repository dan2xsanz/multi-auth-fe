import { ProductListInterface } from '../home/components/home-tab/data'
import {
  productConditionItems,
  productCategoryItems,
  productCurrencyType,
  itemForType,
} from '../constant'

export const checkRequiredFields = (
  previousValues: any,
  currentValue: any,
  excludedKeys: string[] = [],
): string[] => {
  let requiredFields: string[] = []

  Object.keys(previousValues).forEach((key) => {
    if (!excludedKeys.includes(key)) {
      // Check if the key is not in the excludedKeys array
      if (currentValue.hasOwnProperty(key)) {
        if (previousValues[key] === currentValue[key]) {
          requiredFields.push(key)
        }
      } else {
        requiredFields.push(key)
      }
    }
  })

  return requiredFields
}

export const discountCalculator = (
  price: string | undefined,
  discountInPercent: string | undefined,
  productCurrency: number | string | undefined,
): string => {
  let currentPrice: number = price ? parseFloat(price) : 0
  let discountCoversion: number =
    (discountInPercent ? parseFloat(discountInPercent) : 0) / 100
  let discountInNumber: number = currentPrice * discountCoversion
  discountInNumber = currentPrice - discountInNumber
  let discountInCurrency = productCurrencyType
    .map((data) => {
      if (
        data.value.toString() ===
        (productCurrency && productCurrency.toString())
      )
        return data.display
    })
    .filter((label) => label)
  return `${discountInCurrency} ${discountInNumber.toLocaleString()}`
}

// FIND PRODUCT NAME AND CONDITION
export const getProductNameAndCondition = (
  productDetails: ProductListInterface | undefined,
): string => {
  return `${productConditionItems
    .map((data) => {
      if (data.key === productDetails?.productCondition?.toString())
        return data.label
    })
    .filter((label) => label)
    .join('|')} | ${productDetails?.productName}`
}

// FIND PRODUCT CATEGORY CONDITION
export const getProductCategory = (productDetails: ProductListInterface | undefined): string => {
  const categoryKey = productDetails?.productCategory?.toString()
  const category = productCategoryItems.find((data) => data.key === categoryKey)

  return category ? category.label : ''
}

// FIND PRODUCT CATEGORY CONDITION
export const getProductItemFor = (productDetails: ProductListInterface | undefined): string => {
  const itemForKey = productDetails?.itemFor?.toString()
  const itemFor = itemForType.find((data) => data.key === itemForKey)
  return itemFor ? itemFor.label : ''
}

// GET PRODUCT PRICE AND CURRENCY
export const getProductPriceAndCurrency = (productDetails: ProductListInterface | undefined) => {
  const currency =
    productCurrencyType.find(
      (data) =>
        data.value.toString() === productDetails?.productCurrency?.toString(),
    )?.display || ''
  const price = productDetails?.productPrice
    ? Number(productDetails?.productPrice).toLocaleString()
    : ''
  return `${currency} ${price}`
}
