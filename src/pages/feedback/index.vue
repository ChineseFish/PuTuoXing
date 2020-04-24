<template>
  <main-page title="意见反馈" back>
    <div slot="scroll" class="feedback-container">
      <div class="feedback-header-text-wrapper">
        <span>
          感谢您对{{ title }}的支持，为了您将来有更好的用户体验，可将您的想法告诉我们，如遇一些问题需要及时跟进的请拨打客服热线
          <a :href="`tel://${serviceHotline}`">{{ serviceHotline }}</a>
        </span>
      </div>

      <div class="feedback-title">问题类型:</div>
      <div class="feedback-type-choose-wrapper">
        <mu-radio v-model="feedbackType"
          v-for="(item, index) of feedbackTypes"
          :key="index"
          :value="index"
          :label="item"
          class="radio">
        </mu-radio>
      </div>

      <div class="feedback-title">反馈内容:</div>
      <div class="feedback-input-wrapper">
        <textarea type="textarea"
          v-model="feedbackContent"
          rows="5"
          placeholder="请在此处填入您宝贵建议，问题不限于购票异常，体验不佳，吐槽开发等..."
          maxlength="500" />
        <div class="char-cnt">{{ charCnt }} / 500</div>
      </div>

      <form-item title="手机号："
        class="feedback-tel"
        v-model="tel"
        placeholder="选填，方便我们与您联系">
      </form-item>

      <div slot="feedback-commit-wrapper">
        <mu-button color="primary" full-width @click="commit">提交建议</mu-button>
      </div>
    </div>
  </main-page>
</template>

<script>
import FormItem from '@/components/form/form-item'
// import { getStrLen } from '@/utils/common'
import { createFeedback } from '@/api'
export default {
  components: {
    FormItem
  },

  props: {
    category: ''
  },

  computed: {
    charCnt () {
      return this.feedbackContent.length
    },
    title () {
      return this.category === 'ship' ? '水上客运订票平台' : '自游宝'
    },
    serviceHotline () {
      return this.category === 'ship' ? '0580-2626888' : '0580-2266222'
    }
  },

  data () {
    return {
      feedbackType: 0,
      feedbackTypes: ['购票疑问', '产品建议', '功能异常', '其他'],
      feedbackContent: '',
      tel: '',
      showDialog: false
    }
  },

  mounted () {
    this.tel = this.$store.getters.collector.tel || ''

    console.log(this.$route, window.history)
  },

  methods: {
    async commit () {
      const params = {
        type: this.feedbackType,
        content: this.feedbackContent,
        tel: this.tel
      }
      console.log('params: ', params)
      try {
        this.validator(this.params)
        let res = await createFeedback(params)
        console.log('commit: ', res)
        this.$store.commit('SHOW_DIALOG', '感谢您的反馈，我们将积极采纳您的建议。')
        setTimeout(() => {
          this.$store.commit('HIDE_DIALOG')
          this.$router.back()
        }, 1000)
      } catch (err) {
        this.$toast(err.message)
      }
    },
    closeDialog () {
      this.showDialog = false
    },
    validator (params) {
      const charLimit = 5
      if (this.charCnt < charLimit) {
        throw new Error(`请输入不少于${charLimit}个字的问题描述`)
      }
    }
  }
}
</script>

<style lang="scss">
.feedback {
  &-container {
    background-color: #fff;
    color: #333;
    padding: $padding-aside;
  }

  &-title {
    font-weight: 500;
    color: inherit;
    text-decoration: underline;
  }

  &-header-text-wrapper {
    background-color: $default-color-tips;
    border: 1px solid $default-color-tips-border;
    color: #333;
    padding: vw(10);
    margin-bottom: vw(15);
    border-radius: vw(2);
  }

  &-type-choose-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    margin: vw(5) 0;
  }

  &-input-wrapper {
    border: 1px solid #eee;
    background-color: #eee;
    margin: vw(5) 0 vw(10);
    position: relative;
    border-radius: vw(2);

    textarea {
      background-color: inherit;
      width: 100%;
      border: none;
      padding: vw(10);
      // height: 100%;
    }
    .char-cnt {
      position: absolute;
      right: vw(10);
      bottom: vw(5);
      font-size: vw(12);
      color: #777;
    }
  }

  &-tel {
    margin-bottom: vw(15);
  }
}
</style>
