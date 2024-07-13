import { AddComments, AllComments } from '@/app/service'
import { ResponseInterface } from '@/config/config'
import {
  CommentSectionInterface,
  openErrorNotification,
  openInfoNotification,
} from '@/index'

export const addCommentsOperation = async (
  setIsLoading: (data: boolean) => void,
  productMasterId: number | undefined,
  setInputtedValue: (data: string) => void,
  commentSectionData: CommentSectionInterface,
  commentSectionList: CommentSectionInterface[],
  setCommentSectionList: (data: CommentSectionInterface[]) => void,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await AddComments(commentSectionData)
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess) {
      getAllCommentsOperation(
        setIsLoading,
        productMasterId,
        commentSectionList,
        setCommentSectionList,
      )
      setInputtedValue('')
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

export const getAllCommentsOperation = async (
  setIsLoading: (data: boolean) => void,
  productMasterId: number | undefined,
  commentSectionList: CommentSectionInterface[],
  setCommentSectionList: (data: CommentSectionInterface[]) => void,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await AllComments({
      productMasterId: productMasterId,
    })
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess && response.resultData.length > 0) {
      setCommentSectionList(response.resultData)
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
