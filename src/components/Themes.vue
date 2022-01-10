<template>
  <n-radio-group v-model:value="theme">
    <n-radio-button value="system">System</n-radio-button>
    <n-radio-button value="dark">Dark</n-radio-button>
    <n-radio-button value="light">Light</n-radio-button>
  </n-radio-group>
</template>

<script lang="ts" setup>
import { NRadioGroup, NRadioButton } from "naive-ui";
import { useStore } from "~/store";
import { storeToRefs } from "pinia";
const store = useStore();
const { theme } = storeToRefs(store);
</script>

<style lang="scss" scoped></style>
