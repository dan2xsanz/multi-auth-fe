export interface CommentSectionListRequestInterface {
  productMasterId: number | undefined
}

export interface CommentSectionInterface {
  id?: number | undefined
  accountMasterId?: number | undefined
  accountMasterName?: string | undefined
  comment?: string | undefined
  productMasterId?: number | undefined
}
