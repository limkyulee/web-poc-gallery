<script setup lang="ts">
import SockJS from 'sockjs-client'
import { Client, IMessage } from '@stomp/stompjs';

const connectStatus = ref<boolean>(false)
// 보낼 메세지
const message = ref<string>('')
// 받은 메세지 목록
const messages = ref<{
  sender: string,
  content: string,
  type: string
}[]>([])

const handleConnectStatus = () => {
  connectStatus.value = !connectStatus.value
}

/**
 * STOMP 클라이언트 생성
 * STOMP 는 WebSocket 위에서 작동하는 메시징 프로토콜
 */
const stompClient = new Client({
  brokerURL: undefined,
  // 실제 웹소켓 연결을 생성. (SockJS 사용)
  webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URI),
  // 연결 실패 시, 재시도 간격 (ms)
  reconnectDelay: 5000,
  // 디버깅 로그 출력
  debug: (str) => console.log(str),
})


// 메세지 전송
const handleSendBtnClick = () => {
  if (message.value.trim() === '') return

  const data = {
    sender: "kyuleelim",
    content: message.value,
    type: 'CHAT'
  }

  stompClient.publish({
    destination: '/pub/chat', // 서버 컨트롤러의 @MessageMapping("/chat")과 매핑
    body: JSON.stringify(data),  // 전송할 메세지
  })
}

// text to json
const parseMessage = (msg: IMessage) => JSON.parse(msg.body)

// WebSocket 연결 및 구독 설정
const handleConnect = () => {
  stompClient.onConnect = () => {
    console.info('SUCCESS TO CONNECT')

    // 메시지를 수신할 topic 을 구독
    stompClient.subscribe('/sub/messages', (msg: IMessage) => {
      const message = parseMessage(msg)
      console.info("[MESSAGE]", message)
      // 받은 메시지를 목록에 추가
      messages.value.push(message)
    })
  }

  // 에러 발생 시 출력
  stompClient.onStompError = (frame: { headers: { [x: string]: any; }; body: any; }) => {
    console.error('[STOMP ERROR]', frame.headers['message'])
    console.error('[ERROR DETAIL]', frame.body)
  }

  // WebSocket 연결
  stompClient.activate()
  handleConnectStatus()
}

// WebSocket 연결 해제
const handleDisconnect = () => {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate()
    handleConnectStatus()
  }
}

</script>

<template>
  <div>
    <div class="socket-label--wrapper">
      <div class="socket-label">
        <label>WebSocket Connection</label>
        <button class="button button--outline" :disabled="connectStatus" @click="handleConnect">Connect</button>
        <button class="button button--outline" :disabled="!connectStatus" @click="handleDisconnect">Disconnect</button>
      </div>
      <div class="socket-label">
        <label>What's your name?</label>
        <input v-model="message" type="text" placeholder="Enter your name" class="input" />
        <button class="button button--outline" @click="handleSendBtnClick">Send</button>
      </div>
    </div>
    <div class="socket-table--wrapper">
      <table class="socket-table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Message</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(msg, index) in messages" :key="index">
            <td>{{ msg.sender }}</td>
            <td>{{ msg.content }}</td>
            <td>{{ msg.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>