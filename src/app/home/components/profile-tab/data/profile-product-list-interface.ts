export interface ProductListFilterInterfaceValues {
  mainCategory?: number | undefined
  accountId?: number | undefined
  productCategory?: number | undefined
  productCondition?: number | undefined
}

export const ProductListInterfaceValues: ProductListFilterInterfaceValues = {
  mainCategory: 1,
  accountId: undefined,
  productCategory: 1,
  productCondition: undefined,
}
