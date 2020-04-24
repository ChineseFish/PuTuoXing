<template>
  <main-page class="bind-telephone-container" :title="title" back>
    <div slot="header-right" v-if="step !== 0" @click="preStep">上一步</div>
    <div class="section-wrapper" v-if="step === 0">
      <template v-if="binded">
        <div class="telephone-wrapper">
          <div class="input binded">{{ telephone }}</div>
        </div>
        <div class="tips"><b>Tips:</b> 手机号码已绑定，如需替换绑定手机请点击重新绑定</div>
        <div class="button" @click="rebind">重新绑定</div>
      </template>
      <template v-else>
        <div class="telephone-wrapper">
          <l-input v-model="telephone" placeholder="请输入绑定的手机号码" class="input" type="number"></l-input>
        </div>
        <div class="tips"><b>Tips:</b> 绑定手机号码可以方便用户查询订单数据，请绑定订票常用手机号码</div>
        <div class="button" @click="sendCode">发送验证码</div>
      </template>
    </div>
    <div class="section-wrapper" v-else-if="step === 1">
      <div class="telephone-code-wrapper">
        <l-input v-model="code" placeholder="请填入接收到的验证码" class="input" type="number" :maxLength="6"></l-input>
      </div>
      <div class="tips"><b>Tips:</b> 请耐心等待平台发送的验证码</div>
      <div class="button" @click="confirmBind">确认绑定</div>
    </div>
  </main-page>
</template>

<script>
import { sendTelCode, bindTelephone } from '@/api'
import { mapGetters } from 'vuex'
import { isWeiXin } from '@/utils/runtime-env'
export default {
  computed: {
    title () {
      return this.step === 0 ? '绑定手机号码' : '填写验证码'
    },
    ...mapGetters([
      'wxUserInfo'
    ])
  },
  data () {
    return {
      step: 0,
      telephone: '',
      code: '',
      binded: false
    }
  },

  mounted () {
    // alert(this.wxUserInfo.unionid)
    if (this.wxUserInfo.mobile) {
      this.telephone = this.wxUserInfo.mobile
      this.binded = true
    }
  },

  methods: {
    async sendCode () {
      if (!this.wxUserInfo.unionid) {
        this.$toast('当前状态无法绑定')
        return
      }
      await sendTelCode({ mobile: this.telephone })
      this.step = 1
    },
    async confirmBind () {
      console.log('telephone: ', this.telephone, '\ncode: ', this.code)
      const params = {
        mobile: this.telephone,
        verifyCode: this.code,
        unionid: this.wxUserInfo.unionid
      }
      // 如果是微信内的设置 openType 为 wechat
      if (isWeiXin()) {
        params.openType = 'wechat'
      }
      const res = await bindTelephone(params)
      // 绑定成功以后需要把手机号码保存到localStorage里
      if (res.token) {
        this.$store.commit('LOGIN_SUCCESS', res.token)
        this.wxUserInfo.token = res.token
      }
      this.$store.commit('SET_WXUSERINFO', { ...this.wxUserInfo, mobile: this.telephone })

      this.$toast('绑定成功！')
      setTimeout(() => {
        this.$router.go(-1)
      }, 1000)
    },
    preStep () {
      --this.step
    },
    rebind () {
      this.binded = false
      this.telephone = ''
    }
  }
}
</script>

<style lang="scss">
.bind-telephone-container {
  .section-wrapper {
    background-color: #fff;
    padding: vw(20) $padding-aside vw(40);

    .input {
      border-bottom: vw(1) solid $default-color;
      font-size: vw(18);
      margin: vw(20) 0;
      text-align: center;
      input {
        text-align: center;
      }

      &.binded {
        text-align: center;
        color: $default-color;
        font-size: vw(20);
      }
    }

    .tips {
      // @extend %minor-font;
      font-size: vw(12);
      color: $default-color-orange;
      margin-bottom: vw(10);
    }

    .button {
      background-color: $default-color;
      color: #fff;
      text-align: center;
      padding: vw(8);
      border-radius: vw(5);
    }
  }
}
</style>
