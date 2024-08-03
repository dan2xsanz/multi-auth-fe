import { notification } from 'antd'
import { PopupInterface } from './pop-up-interface'

export const openErrorNotification = (props: PopupInterface) => {
  notification.error({
    message: 'Error',
    description: props.description,
    placement: props.placement,
  })
}

export const openInfoNotification = (props: PopupInterface) => {
  notification.info({
    message: 'Information',
    description: props.description,
    placement: props.placement,
  })
}

export const openSuccessNotification = (props: PopupInterface) => {
  notification.success({
    message: 'Successful',
    description: props.description,
    placement: props.placement,
  })
}

export const openWarningNotification = (props: PopupInterface) => {
  notification.warning({
    message: 'Warning',
    description: props.description,
    placement: props.placement,
  })
}

export const openNotification = (props: PopupInterface) => {
  notification.open({
    message: props.subject,
    description: props.description,
    onClick: () => {}, // TODO REDIRECTS TO NOTICATION
    placement: props.placement,
  })
}
