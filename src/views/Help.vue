<template>
  <div class="help">
    <p style="margin-top: 5px">
      Copyright &copy; 2021 Gizmo，All rights reserved.
    </p>
    <p>
      <n-button
        text
        type="primary"
        size="small"
        target="_blank"
        tag="a"
        href="https://gizmooooo.booth.pm/"
      >
        <template #icon>
          <n-icon>
            <Link />
          </n-icon>
        </template>
        BOOTH
      </n-button>
      <n-button
        text
        type="primary"
        size="small"
        target="_blank"
        tag="a"
        href="https://twitter.com/Gizmo_OAO"
        style="margin-left: 8px"
      >
        <template #icon>
          <n-icon>
            <BrandTwitter />
          </n-icon>
        </template>
        Twitter
      </n-button>
      <n-button
        text
        type="primary"
        size="small"
        target="_blank"
        tag="a"
        href="https://github.com/GizmoOAO"
        style="margin-left: 8px"
      >
        <template #icon>
          <n-icon>
            <BrandGithub />
          </n-icon>
        </template>
        GitHub
      </n-button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NIcon } from "naive-ui";
import { BrandTwitter, BrandGithub, Link } from "@vicons/tabler";
</script>

<style lang="scss" scoped>
.help {
  p {
    margin-top: 0;
    margin-bottom: 8px;
  }
}
</style>
