import { WebSocketTopic } from '@/index'

export interface NotificationInterface {
  notificationTopic: WebSocketTopic
  subject?: string
  message: string | undefined
  senderId: number | undefined
  receiverId: number | undefined
}
