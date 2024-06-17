export interface UploadProductInterface {
  id?: number | undefined
  image1?: string | undefined
  image2?: string | undefined
  image3?: string | undefined
  image4?: string | undefined
  isSold?: boolean
  isDeleted?: boolean
  productName?: string | undefined
  productPrice?: string | undefined
  productCategory?: number | string | undefined
  productCondition?: number | string | undefined
  productDescription?: string | undefined
  productLocation?: string | undefined
  accountMasterId?: number | undefined
}

export const UploadProductValues: UploadProductInterface = {
  id: undefined,
  image1: '',
  image2: '',
  image3: '',
  image4: '',
  isSold: false,
  isDeleted: false,
  productName: '',
  productPrice: '',
  productCategory: '1',
  productCondition: '1',
  productDescription: '',
  productLocation: '',
  accountMasterId: undefined,
}
