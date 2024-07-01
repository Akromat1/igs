<script setup>
import { ref, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';

const socket = new WebSocket("ws://localhost:3000/connect");


const code = ref('')

socket.addEventListener('message', async event => {
  const { code: multicastCode } = JSON.parse(await event.data.text())
  code.value  = multicastCode
})

const editor = ref()

watch(code, code => {
  socket.send(JSON.stringify({code}));
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
