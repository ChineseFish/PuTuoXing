<template>
  <div class="login-container">
    <l-header title="登录">
      <i class="iconfont icon-close3" @click="close" slot="left" v-if="!hideClose"></i>
    </l-header>
    <div class="login-form">
      <div class="login-form-item">
        <l-input placeholder="请输入手机号码" v-model="mobile" type="number"></l-input>
      </div>
      <div class="login-form-item" v-if="passwordWay">
        <l-input placeholder="请输入密码" v-model="password" type="password"></l-input>
      </div>
      <div class="login-form-item" v-else>
        <l-input placeholder="请输入收到的验证码" v-model="code" class="login-form-item-code-input" type="number" :maxLength="6"></l-input>
        <div class="login-form-item-send-msg" @click="sendCode" v-if="!second">点击发送验证码</div>
        <div v-else class="login-form-item-second">{{ second }}秒后再次获取</div>
      </div>
      <div class="login-form-button-commit" @click="toLogin">登录</div>
      <div class="login-form-change-way">
        <span @click="changeWay">{{ passwordWay ? '短信验证码登录' : '使用密码登录'}}</span>
      </div>
    </div>

    <template>
      <l-part-line text="其他方式登录" class="login-form-part-line" @click.native="test"></l-part-line>
      <div class="login-form-weixin" @click="wechatLogin" v-if="showWeixinLogin">
        <i class="iconfont icon-weixin"></i>
        <div>微信登录</div>
      </div>
    </template>
  </div>
</template>

<script>
import PopupContainer from '@/components/layouts/popup-container'
import LInput from '@/components/common/input'
import LPartLine from '@/components/common/part-line'
import { isWeiXin, isAndroidApp, systemInfo } from '@/utils/runtime-env'
import { sendTelCode, authLogin, getWxUserInfo } from '@/api'

export default {
  components: {
    PopupContainer,
    LInput,
    LPartLine
  },

  data () {
    return {
      codeTimer: null,
      second: 0,
      hideClose: false,
      passwordWay: false,
      mobile: '',
      code: '',
      password: '',
      showWeixinLogin: false
    }
  },

  computed: {
    isWeixin () {
      // 微信内置浏览器使用
      return false
    },
    noOtherWay () {
      return true
    }
  },

  mounted () {
    if (!this.$route.name) {
      this.hideClose = true
    }

    if (systemInfo.isIOS() && window.cordova) {
      Wechat.isInstalled((installed) => {
        this.showWeixinLogin = true
      }, (reason) => {
        this.showWeixinLogin = false
      })
    }

    // 说明在安卓手机内
    if (isAndroidApp()) {
      this.showWeixinLogin = true
    }
  },

  methods: {
    close (flag = true) {
      const handle = this.$parent.hide
      handle && typeof handle === 'function' && handle()
      if (flag) {
        this.$store.commit('LOGIN_CLOSE')
      }
    },
    async sendCode () {
      let res = await sendTelCode({ mobile: this.mobile })
      if (res) {
        this.second = 60
        this.countDown()
      }
    },
    countDown () {
      this.codeTimer = setInterval(() => {
        if (this.second > 0) {
          --this.second
        } else {
          clearInterval(this.codeTimer)
        }
      }, 1000)
    },
    async toLogin () {
      const params = {
        mobile: this.mobile,
        verifyCode: !this.passwordWay ? this.code : null,
        password: this.passwordWay ? this.password : null
      }
      if (isWeiXin()) {
        params.openType = 'wechat'
      }
      let res = await authLogin(params)
      this.$store.commit('LOGIN_SUCCESS', res.token)
      this.$store.commit('SET_WXUSERINFO', res.userInfo)
      this.close(false)
    },
    changeWay () {
      this.passwordWay = !this.passwordWay
    },
    test () {
      const ua = 'cccc;ziubaoAndroid'
      if (ua.match(/ziubaoAndroid/i)) {
        this.$toast(ua.match(/ziubaoAndroid/i))
      }
    },
    async wechatLogin () {
      if (systemInfo.isIOS()) {
        const scope = 'snsapi_userinfo'
        const state = '_' + (+new Date())
        Wechat.auth(scope, state, async (response) => {
          if (response.code) {
            this.getWxUserInfo(response.code)
          }
        }, (reason) => {
          this.$toast('微信授权登录失败')
        })
      }

      if (systemInfo.isAndroid()) {
        try {
          const { status, response } = JSON.parse(WeChatTongDaPay.wxLoginJs())
          if (status === 'success' && response.code) {
            this.getWxUserInfo(response.code)
          } else {
            this.$toast('微信授权登录失败')
          }
        } catch (err) {
          this.$toast('微信授权登录失败: ', err.message)
        }
      }
    },
    async getWxUserInfo (code) {
      let res = await getWxUserInfo({ code, openType: 'app' })
      this.$toast('微信授权登录成功')
      this.$store.commit('LOGIN_SUCCESS', res.token)
      this.$store.commit('SET_WXUSERINFO', res)
      // 如果没有手机号码，引导用户先绑定个手机号码
      if (!res.mobile) {
        this.$router.push({ name: 'BindTelephone' })
      }
      this.close(false)
    }
  }
}
</script>

<style lang="scss">
.login {
  &-container {

  }

  &-form {
    padding: vw(40) vw(30) vw(10);

    &-item {
      padding: vw(15) 0 vw(5);
      border-bottom: 1px solid $line-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-send-msg {
        color: $default-color;
      }
      &-second {
        color: $minor-color;
      }
      &-code-input {
        margin-right: vw(20);
      }
    }

    &-button {
      &-commit {
        padding: vw(12);
        margin-top: vw(40);
        box-sizing: border-box;
        width: 100%;
        background-color: $default-color;
        color: #fff;
        letter-spacing: vw(20);
        margin-right: vw(-20);
        text-align: center;
        border-radius: 5px;
      }
    }

    &-change-way {
      text-align: right;
      font-size: vw(12);
      padding-top: vw(10);
      color: $default-color;
    }

    &-part-line {
      padding: vw(30) vw(30) !important;
      color: $minor-color;
    }

    &-weixin {
      text-align: center;
      .icon-weixin {
        color: $weixin-color;
        font-size: vw(45);
      }
    }
  }
}

</style>
