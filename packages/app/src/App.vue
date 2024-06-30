<script setup>
import { onMounted, ref, unref } from 'vue';
import { Codemirror } from 'vue-codemirror';

const code = ref('')
const editor = ref()

onMounted(() => {
  console.dir(unref(editor))
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
