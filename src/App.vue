<template>
    <main>
        <MessageDialog></MessageDialog>
        <router-view>

        </router-view>
    </main>
</template>

<script>

import MessageDialog from "@/components/MessageDialog";

export default {
  name: 'App',
  components: {
      MessageDialog
  }
}
</script>

<style>
</style>
