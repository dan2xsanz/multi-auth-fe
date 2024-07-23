import { accountDetailStore } from '@/app/store'
import { REQUEST_URL } from '@/properties'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

class WebSocketService {
  private client: Client

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      webSocketFactory: () => new SockJS(`${REQUEST_URL}/ws`),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str)
      },
    })

    this.client.onConnect = () => {
      console.log('Connected to WebSocket')
      this.client.subscribe('/topic/notifications', (message: any) => {
        console.log('Received message: ', message.body)
        console.log(JSON.parse(message.body)['accountMasterId'])
        alert(`Notification: ${message.body}`)
      })
    }

    this.client.activate()
  }

  sendAddFavoriteMessage(accountMasterId: number | undefined, message: string) {
    console.log(accountMasterId)
    this.client.publish({
      destination: '/app/notification',
      body: JSON.stringify({
        accountMasterId: accountMasterId,
        content: message,
      }),
    })
  }
}

const webSocketServiceInstance = new WebSocketService()
export default webSocketServiceInstance
