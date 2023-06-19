<script setup>
import { ref } from "vue"
import { QuillEditor, Delta } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ImageUploader from 'quill-image-uploader';
import axios from "axios";
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  cardId: {
    type: String,
    required: true,
  }
});
const content = ref(props.content);
if (props.content !== "") {
  content.value = new Delta(JSON.parse(content.value));
}
const quillOptions = {
  modules: {
    toolbar: "minimal",
  },
  readOnly: props.readOnly,
  theme: "snow"
}
const emit = defineEmits(["update"]);
const imageUploaderModule = {
  name: "imageUploader",
  module: ImageUploader,
  options: {
    upload: file => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        axios.post('http://localhost:3000/upload/image', formData)
        .then(res => {
          console.log(res)
          resolve(res.data.url);
        })
        .catch(err => {
          reject("Upload failed");
          console.error("Error:", err)
        })
      })
    }
  }
};
const patchCardContent = async (value) => {
  emit("update", value);
};
</script>
<template>
  <QuillEditor v-model:content="content" toolbar="full" :options="quillOptions" :modules="imageUploaderModule" @update:content="patchCardContent"/>
</template>
<style></style>
