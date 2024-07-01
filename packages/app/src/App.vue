<script setup>
import { ref, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';

const socket = new WebSocket("ws://localhost:3000/connect");

const myId = crypto.randomUUID()
const code = ref('')

socket.addEventListener('message', async event => {
  const multicast = JSON.parse(await event.data.text())
  if (multicast.myId !== myId) {
    code.value = multicast.code
  }
})

const editor = ref()

watch(code, code => {
  socket.send(JSON.stringify({myId, code}));
})

</script>

<template>
<div>
  <Codemirror
      v-model="code"
      ref="editor"
    />
</div>
</template>
