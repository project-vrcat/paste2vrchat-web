<template>
  <div>
    <n-input-group style="margin-bottom: 8px">
      <n-input
        clearable
        :placeholder="t('paste.paste-placeholder')"
        v-model:value="inputURL"
      />
      <n-button
        type="primary"
        @click="paste2vrchat(inputURL)"
        style="width: 160px"
      >
        {{ t("button.paste2vrchat") }}
      </n-button>
    </n-input-group>

    <n-input-group style="margin-bottom: 8px">
      <n-input
        clearable
        :placeholder="t('paste.note-placeholder')"
        v-model:value="inputNote"
      />
      <n-button type="primary" @click="addData" style="width: 160px">
        <n-icon>
          <Plus />
        </n-icon>
        {{ t("paste.add-button") }}
      </n-button>
    </n-input-group>

    <div style="margin-bottom: 8px">
      <n-checkbox v-model:checked="autoRemove">
        {{ t("paste.auto-remove") }}
      </n-checkbox>
    </div>

    <n-data-table :columns="columns" :data="data" />
  </div>
</template>

<script lang="ts" setup>
import { ref, h, watch } from "vue";
import {
  NButton,
  NButtonGroup,
  NIcon,
  NInput,
  NInputGroup,
  NDataTable,
  NCheckbox,
} from "naive-ui";
import { Trash, Plus } from "@vicons/tabler";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const columns: Array<any> = [
  {
    title: "#",
    key: "key",
    align: "center",
    width: 80,
    render(row: any) {
      return h(
        "span",
        {},
        {
          default: () => row.key + 1,
        }
      );
    },
  },
  {
    title: () => t("paste.table.content"),
    key: "content",
    ellipsis: true,
  },
  {
    title: () => t("paste.table.note"),
    key: "note",
    ellipsis: true,
  },
  {
    title: () => t("paste.table.action"),
    key: "actions",
    width: 260,
    render(row: any) {
      return h(
        NButtonGroup,
        {},
        {
          default: () => [
            h(
              NButton,
              {
                size: "small",
                type: "error",
                onClick: () => {
                  data.value.splice(row.key, 1);
                },
              },
              {
                default: () => h(NIcon, null, { default: () => h(Trash) }),
              }
            ),
            h(
              NButton,
              {
                type: "primary",
                size: "small",
                onClick: () => {
                  paste2vrchat.value(row.content);
                  if (autoRemove.value) data.value.splice(row.key, 1);
                },
              },
              {
                default: () => t("button.paste2vrchat"),
              }
            ),
          ],
        }
      );
    },
  },
];
const data = ref([{ key: 0, content: "", note: "" }]);

const inputURL = ref("");
const inputNote = ref("");

const autoRemove = ref(localStorage.getItem("autoRemove") === "true");
watch(autoRemove, () => {
  localStorage.setItem("autoRemove", autoRemove.value ? "true" : "false");
});

const pasteText = (text: string) =>
  window.open(`p2vrc://paste?text=${encodeURIComponent(text)}&enter=true`);

const paste2vrchat = ref((value: string) => pasteText(value));
const addData = ref(() => {
  if (!inputURL.value) return;
  data.value.push({
    key: data.value.length,
    content: inputURL.value,
    note: inputNote.value,
  });
  saveData();
});
const loadData = () => {
  data.value = [];
  JSON.parse(localStorage.getItem("data") ?? "[]").forEach((item: any) => {
    data.value.push({
      key: data.value.length,
      content: item.content,
      note: item.note,
    });
  });
};
const saveData = () => {
  localStorage.setItem("data", JSON.stringify(data.value));
};
loadData();
</script>

<style lang="scss" scoped></style>
