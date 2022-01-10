<template>
  <n-config-provider :theme="appTheme">
    <n-message-provider>
      <n-layout style="height: 100vh">
        <Header />
        <n-layout has-sider position="absolute" style="top: 82px; bottom: 0px">
          <!-- 侧边栏 -->
          <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :collapsed="true"
          >
            <n-menu
              :collapsed="true"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              v-model:value="menu"
            />
          </n-layout-sider>

          <!-- Main -->
          <n-layout-content
            content-style="padding: 8px;"
            :native-scrollbar="false"
          >
            <PasteView v-if="menu === 'paste'" />
            <HelpView v-else="menu === 'help'" />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { ref, computed, h, provide } from "vue";
import Header from "~/components/Header.vue";
import PasteView from "~/views/Paste.vue";
import HelpView from "~/views/Help.vue";
import {
  NConfigProvider,
  NMessageProvider,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NMenu,
  NIcon,
} from "naive-ui";
import { Help, ClipboardList } from "@vicons/tabler";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { useStore } from "~/store";
import { storeToRefs } from "pinia";
const store = useStore();
const { theme } = storeToRefs(store);
import { useOsTheme, darkTheme } from "naive-ui";
const osThemeRef = useOsTheme();
provide("changeTheme", (value: string) => {
  theme.value = value;
  localStorage.setItem("theme", value);
});
const appTheme = computed(() => {
  return (theme.value === "system" && osThemeRef.value === "dark") ||
    theme.value === "dark"
    ? darkTheme
    : {};
});

const menuOptions = [
  {
    key: "paste",
    icon: () => h(NIcon, null, { default: () => h(ClipboardList) }),
  },
  {
    label: () => h("span", {}, t("sider.help")),
    key: "help",
    icon: () => h(NIcon, null, { default: () => h(Help) }),
  },
];
const menu = ref("paste");
</script>

<style lang="scss" scoped></style>
