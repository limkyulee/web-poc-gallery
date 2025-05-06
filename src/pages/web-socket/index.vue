<script setup lang="ts">
const connectStatus = ref<boolean>(false)
const messages = ref<string[]>(['s','s','s'])

const handleConnectStatus = () => {
  connectStatus.value = !connectStatus.value
}
</script>

<template>
  <div>
    <div class="socket-label--wrapper">
      <div class="socket-label">
        <label>WebSocket Connection</label>
        <button class="button button--outline">Connect</button>
        <button class="button button--outline">Disconnect</button>
      </div>
      <div class="socket-label">
        <label>What's your name?</label>
        <input type="text" placeholder="Enter your name" class="input" />
        <button class="button button--outline">Send</button>
      </div>
    </div>
    <div class="socket-table--wrapper">
      <table class="socket-table">
        <thead>
          <tr>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(msg, index) in messages" :key="index">
            <td>{{ msg }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>