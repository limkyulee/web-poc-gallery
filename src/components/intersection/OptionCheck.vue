<script lang="ts" setup>
import { marked } from 'marked';
import optionsMarkdown from './options.md?raw'; // 파일 내용을 문자열로 로드


const markdown = ref(optionsMarkdown); // 마크다운 파일 내용을 가져오기
const markdownToHtml = computed(() => marked(markdown.value)); // HTML 변환
</script>

<template>
  <div class="markdown-body" v-html="markdownToHtml"></div>
</template>

<style>
@import 'github-markdown-css/github-markdown.css';

.markdown-body {
  all: unset; /* 기존 모든 스타일 제거 */
}

.markdown-body * {
  font-size: 12px;
  line-height: 1.5 !important;
}

</style>