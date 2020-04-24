<template>
  <div class="insurance-container">
    <div class="tip">为了家人的安心，建议您选择一份保障：</div>
    <l-checkbox :id="item.id"
                v-for="(item, index) in insList"
                :key="index"
                :checked="item.checked"
                @change="handleChange(item)"
                class="insurance-item">
      <div slot="left-text" class="text">
        <span class="insurance-recom" v-if="index === 0">推荐 |</span> {{item.name}} <i class="iconfont icon-wenhao" @click.stop="showInsIntroduce(item)"></i>
      </div>
    </l-checkbox>
  </div>
</template>

<script>
import LCheckbox from '@/components/common/checkbox'

export default {
  components: {
    LCheckbox
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showDialog: false,
      checkedIndex: 0,
      checkedIns: {},
      insList: this.list
    }
  },
  methods: {
    handleChange (opratedItem) {
      this.$set(opratedItem, 'checked', !opratedItem.checked)
      if (opratedItem.checked) {
        this.$set(this.checkedIns, opratedItem.type, opratedItem)
      } else {
        delete this.checkedIns[opratedItem.type]
      }
      for (const item of this.insList) {
        if (item !== opratedItem && item.type === opratedItem.type) {
          this.$set(item, 'checked', false)
        }
      }
      this.exportInsList(this.checkedIns)
    },
    exportInsList (obj) {
      let checkedInsList = []
      for (const key in obj) {
        checkedInsList.push(obj[key])
      }
      this.$emit('change', checkedInsList)
    },
    showInsIntroduce (item) {
      // this.$emit('showInsIntroduce', item.introduce)
      this.$store.dispatch('showInsuranceNotice', item.id)
    }
  }
}
</script>

<style lang="scss">
.insurance-container {
  padding-top: vw(6);
  .tip {
    position: relative;
    padding: vw(10) vw(6);
    border: 1px solid #efaf8a;
    border-radius: vw(4);
    background-color: #fbf2eb;
    &::after {
      content: "";
      position: absolute;
      bottom: vw(-9);
      left: vw(23);
      border-bottom: 1px solid #efaf8a;
      border-right: 1px solid #efaf8a;
      width: vw(18);
      height: vw(18);
      transform: rotateZ(45deg);
      background-image: linear-gradient(-45deg, #fbf2eb 50%, transparent 50%);
    }
  }
  .insurance-item {
    &:not(:last-child) .checkbox-label {
      border-bottom: vw(1) solid $line-color-light;
    }
    .insurance-recom {
      color: $default-color-orange;
    }
    .icon-wenhao {
      color: $minor-color;
      font-size: vw(14);
    }
  }
}
</style>
