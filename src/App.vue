<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { postLoginApi } from '@/api/login';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const test = async () => {
  const results = await postLoginApi({
    username: 'admin',
    password: 'admin',
    rememberMe: true,
  });
  console.log(results);
};
</script>

<template>
  <span @click="test()">{{ t('date') }}</span>
</template>

<style scoped></style>
