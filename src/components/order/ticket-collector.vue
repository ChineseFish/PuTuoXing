<template>
  <div class="ticket-collector">
    <form-item title="联系人" placeholder="订票联系人姓名" v-model="collectorObj.name"></form-item>
    <form-item title="身份证" placeholder="订票联系人身份证" v-model="collectorObj.id" maxLength="18" v-if="(type === 'scenery' || type === 'homestay') && !isRealName"></form-item>
    <form-item title="手机号" placeholder="用于接收订票信息" v-model="collectorObj.tel" maxLength="11"></form-item>
  </div>
</template>

<script>
import FormItem from '@/components/form/form-item'
export default {
  components: {
    FormItem
  },
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    type: {
      type: String
    },
    isRealName: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    collectorObj () {
      return this.value
    }
  }
}
</script>

<style lang="scss">

</style>
