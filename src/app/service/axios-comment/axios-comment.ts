import { ResponseInterface } from '@/config/config'
import { CommentSectionInterface, CommentSectionListRequestInterface, REQUEST_URL } from '@/index'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const AddComments = (
  data: CommentSectionInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/comment-section/add-comment`,
        data,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}


export const AllComments = (
  data: CommentSectionListRequestInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/comment-section/comments-by-product`,
        data,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}


export const TotalComments = (
  data: CommentSectionListRequestInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/comment-section/total-comments-by-product`,
        data,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}

