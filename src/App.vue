<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view/>
    <!-- </keep-alive> -->

    <popup-container :show.sync="showLogin" position="bottom">
      <login-view></login-view>
    </popup-container>

    <mu-dialog :open.sync="showDialog" scrollable :padding="80">
      <div v-html="dialogMsg" style="fontSize: 14px;"></div>
    </mu-dialog>
  </div>
</template>

<script>
import PopupContainer from '@/components/layouts/popup-container'
import LoginView from '@/components/login/login'
import { systemInfo } from '@/utils/runtime-env'

export default {
  name: 'App',
  components: {
    PopupContainer,
    LoginView
  },

  computed: {
    showLogin: {
      set (value) {
        this.$store.commit('CHANGE_LOGIN_STATE', value)
      },
      get () {
        return this.$store.getters.showLogin
      }
    },
    showDialog: {
      set (value) {
        this.$store.commit('DIALOG_STATUS_CHANGE', value)
      },
      get () {
        return this.$store.getters.showDialog
      }
    },
    dialogMsg () {
      return this.$store.getters.dialogMsg
    }
  },

  watch: {
  },

  mounted () {
    console.log('os: ', systemInfo.os())
    // this.wxAccessLogin()
    console.log('-----host:', window.location)

    if (window.location.host.indexOf('zyb.') > -1) {
      this.$store.dispatch('wxAccessLogin')
    }
  },

  methods: {
  }
}
</script>

<style lang="scss">
#app {
  height: 100vh;
  font-size: vw(14);
}
body {
  // max-width: 1024px;
  // margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: $background-color;
  font-size: vw(14);
  position: relative;
  .iconfont {
    font-size: vw(18);
  }
}
</style>
