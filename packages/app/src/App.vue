<script setup>
import { ref, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';

const socket = new WebSocket("ws://localhost:3000/connect");

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}


const myId = uuidv4()
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
