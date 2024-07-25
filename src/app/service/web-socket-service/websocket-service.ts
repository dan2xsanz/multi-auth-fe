import { REQUEST_URL } from '@/properties'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

class WebSocketService {
  private client: Client
  private curentLoggedInUserId: number | undefined

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
        // console.log('Received message: ', message.body)
        // console.log(JSON.parse(message.body)['accountMasterId'])
        if (
          this.curentLoggedInUserId ===
          JSON.parse(message.body)['accountMasterId']
        ) {
          alert(`Notification: ${message.body}`)
        }
      })
    }

    this.client.activate()
  }

  setCurrentLoggedInUser(accountMasterId: number | undefined) {
    this.curentLoggedInUserId = accountMasterId
  }

  sendAddFavoriteMessage(accountMasterId: number | undefined, message: string) {
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
