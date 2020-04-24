<template>
  <div class="dynamic-notice-bar" v-if="noticeMessages && noticeMessages.length > 0">
    <i class="iconfont icon-tongzhi"></i>
    <div v-for="(item, index) of noticeMessages" :key="index" class="item" @click="jump(item)">
      <span v-if="item.label" class="label">{{item.label}}</span>
      <span :class="type === 'home' ? 'notice-title' : ''">{{ item.notice }}</span>
    </div>
  </div>
</template>

<script>
import { getNoticeMessages } from '@/api'

export default {
  props: {
    type: String
  },
  data () {
    return {
      noticeMessages: []
    }
  },
  mounted () {
    this.getNoticeMessages()
  },
  methods: {
    async getNoticeMessages () {
      this.noticeMessages = await getNoticeMessages({ type: this.type })
    },
    jump (item) {
      if (item.path) {
        this.$router.push({ path: item.path })
      }
    }
  }
}
</script>

<style lang="scss">
.dynamic-notice-bar {
  padding: vw(3) vw(10);
  background: grb(244, 244, 244);
  display: flex;
  align-items: center;
  color: $default-color-orange;
  .item {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .label {
    padding: vw(1) vw(5);
    border: vw(1) solid $default-color-orange;
    font-size: vw(9);
    border-radius: vw(4);
    margin-right: vw(10);
  }
  i {
    margin-right: vw(5);
  }
  .notice-title {
    margin-right: vw(10);
    flex: 1;
    @extend %minor-font;
  }
}
</style>
