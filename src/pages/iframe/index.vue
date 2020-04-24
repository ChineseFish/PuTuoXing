<template>
  <main-page noHeader>
    <l-header back :title="title" v-if="back"></l-header>
      <iframe :src="url" ref="iframe"></iframe>
  </main-page>
</template>

<script>
export default {
  props: {
    url: {
      type: String
    },
    back: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },

  mounted () {
    if (!this.url) {
      this.$router.back()
    }
  }
}
</script>

<style>
.iframe-wrapper {
  /* height: 100vh; */
  flex: 1;
}
</style>
