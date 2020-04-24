<template>
  <main-page class="jh-qa-container" back title="建行龙支付常见问题">
    <div slot="scroll" class="jh-qa-content">
      <div class="qa-item" v-for="(item, index) of qaList" :key="index">
        <div class="question">Q{{ index }}: <span class="question-text">{{ item.q }}</span></div>
        <div class="answer">A: <span class="answer-text">{{ item.a }}</span></div>
      </div>
    </div>
  </main-page>
</template>

<script>

export default {
  data () {
    return {
      qaList: [
        {
          q: '建行信用卡是否可以享受优惠？',
          a: '不行，必须要绑定建行储蓄卡，才可以享受优惠。'
        }, {
          q: '如果没有建行卡是否也可以享受立减优惠？',
          a: '也可以，您可以绑定任何其他银行储蓄卡，但必须先充值到龙支付钱包上才可以享受立减优惠。'
        }, {
          q: '为什么建行app下载不了？',
          a: '请使用wifi下载。'
        }, {
          q: '为什么下了自游宝app，选不了龙支付？',
          a: '请先删除App, 从自游宝微信公众号上-个人中心，重新下载App，下载方法见公众号内文章视频。'
        }, {
          q: '为什么我下载了自游宝app,建行app, 用龙支付，还是享受不到立减优惠？',
          a: '要开通龙支付功能，有建行储蓄卡的绑定储蓄卡，没有建行卡的，绑定其他银行储蓄卡，在龙支付钱包上要充值相应金额，支付时选 “龙支付钱包”，即可享受立减优惠！ 信用卡暂不支持立减优惠活动！'
        }, {
          q: '为什么第二次用龙支付支付时支付界面上看不到立减优惠？',
          a: '第二次至第四次龙支付是随机优惠，支付界面上看到是应付金额，但输入支付密码时建行龙支付系统会随机减5-20元。'
        }, {
          q: '目前哪些人群可以享受建行龙支付优惠',
          a: '目前仅浙江省内用户（不包含宁波）可以享受建行龙支付，是否能享受龙支付优惠一切以建行显示的优惠为准。'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.jh-qa {
  &-container {

  }

  &-content {
    background-color: #fff;
    padding: $padding-aside;

    .qa-item {
      padding: vw(10) 0;
      font-weight: 500;
      .answer-text {
        font-weight: 400;
        color: #555;
        font-size: vw(12);
        padding-top: vw(3);
      }
    }
  }
}
</style>
