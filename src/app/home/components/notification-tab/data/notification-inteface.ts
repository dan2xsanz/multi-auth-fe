export interface NoticationInterface {
  id?: number | undefined
  isRead?: boolean
  notificationTopic?: string
  productMasterId?: number | undefined
  accountMasterId?: number | undefined
  notificationSubject?: string
  notificationDetails?: string
  notificationImage?: string
  notifiedAccountMasterId?: number | undefined
  notificationProduct?: string
}
