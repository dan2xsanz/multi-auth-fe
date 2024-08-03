import { NotificationPlacement } from 'antd/es/notification/interface'

export interface PopupInterface {
  subject?: string
  description: string
  placement: NotificationPlacement
}
