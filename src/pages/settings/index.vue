<template>
  <main-page back title="设置" class="mine-settings-wrapper">
    <template slot="scroll">
      <div class="list-wrapper">
        <l-list-item v-for="(item, index) of list"
          :key="index"
          :item="item">
        </l-list-item>
      </div>

      <div class="list-wrapper">
        <div @click="logout" class="logout-item">退出登录</div>
      </div>
    </template>
  </main-page>
</template>

<script>

export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogout')
      this.$loading('正在注销中...')
      setTimeout(() => {
        this.$router.back()
        this.$loading.close()
      }, 500)
    }
  }
}
</script>

<style lang="scss">
.mine-settings-wrapper {
  .list-wrapper {
    background-color: #fff;

    .logout-item {
      padding: vw(10);
      text-align: center;
      color: $default-color-orange;
    }
  }
}
</style>
