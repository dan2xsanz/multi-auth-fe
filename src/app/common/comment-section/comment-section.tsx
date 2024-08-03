import { addCommentsOperation, getAllCommentsOperation } from './operation'
import { CommentSectionInterface } from './comment-section-interface'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { accountDetailStore, useStore } from '@/app/store'
import { UserOutlined } from '@ant-design/icons/lib/icons'
import { SentCommentIcon } from '../icons'
import { Avatar, Card } from 'antd'
import './comment-section.css'

interface CommentSectionProps {
  style: React.CSSProperties
  productMasterId: number | undefined
}

export const CommentSection = (props: CommentSectionProps) => {
  // COMMENT SECTION PROPS
  const { style, productMasterId } = props

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // AUTO FOCUS FIELD
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // COMMENT SECTION ACCOUNT MASTER DETAILS
  const { firstName, lastName, accountId } = accountDetailStore()

  // COMMENT SECTION LIST STATE
  const [commentSectionList, setCommentSectionList] = useState<
    CommentSectionInterface[]
  >([])

  // INPITTED VALUE STATE
  const [inputedValue, setInputtedValue] = useState<string>('')

  // ON ADD TO COMMENT SECTION LIST
  const addToCommentSection = (inputedValue: string) => {
    let commentSectionData: CommentSectionInterface = {
      accountMasterId: accountId,
      accountMasterName: `${firstName} ${lastName}`,
      comment: inputedValue,
      productMasterId: productMasterId,
    }
    addCommentsOperation(
      setIsLoading,
      productMasterId,
      setInputtedValue,
      commentSectionData,
      commentSectionList,
      setCommentSectionList,
    )
  }

  // AUTO FOCUS FIELD
  useEffect(() => {
    if (textareaRef.current && inputedValue === '') textareaRef.current.focus()
  }, [inputedValue])

  useEffect(() => {
    getAllCommentsOperation(
      setIsLoading,
      productMasterId,
      commentSectionList,
      setCommentSectionList,
    )
  }, [productMasterId])

  return (
    <Fragment>
      <Card style={style}>
        {commentSectionList.length > 0 &&
          commentSectionList.map((data, index) => {
            return (
              <div key={index} className='avatar-account-details-container'>
                <Avatar icon={<UserOutlined />} />
                <div style={{ width: '380px' }}>
                  <div
                    style={{ fontWeight: 'bolder' }}
                  >{`${data.accountMasterName}`}</div>
                  <div>{`${data.comment}`}</div>
                </div>
              </div>
            )
          })}
        {commentSectionList.length === 0 && (
          <div className='no-comment-style'>No comments.</div>
        )}
      </Card>
      <div className='comment-input-field-container'>
        <textarea
          ref={textareaRef}
          value={inputedValue}
          placeholder='Write a comment'
          className='comment-input-field'
          onChange={(data) => {
            if (data) setInputtedValue(data.target.value.toString())
          }}
        />
        <SentCommentIcon
          onClick={() => {
            if (inputedValue) addToCommentSection(inputedValue)
          }}
        />
      </div>
    </Fragment>
  )
}
