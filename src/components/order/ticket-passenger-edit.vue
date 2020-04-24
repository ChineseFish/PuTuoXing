<template>
  <div class="ticket-passenger-edit-form-container">
    <div class="form-wrapper">
      <form-item :title="`${addText}类型`" class="form-item" type="custom">
        <span v-for="(value, key) of passengerTypes"
          :key="key"
          class="label"
          :class="{ 'label-select': passengerObj.passengerType == key }"
          @click="choosePassengerType(key)">
          {{ value }}
        </span>
      </form-item>
      <form-item title="证件类型" class="form-item" type="custom">
        <span v-for="(value, key) of idTypes"
          :key="key"
          class="label"
          :class="{ 'label-select': passengerObj.type == key }"
          @click="chooseIdType(key)">
          {{ value }}
        </span>
      </form-item>
      <form-item title="姓名" class="form-item" v-model="passengerObj.name" :placeholder="`请输入${addText}姓名`"></form-item>
      <form-item title="证件号码" class="form-item" v-model="passengerObj.id" placeholder="请输入有效证件号码"></form-item>
    </div>
    <div class="ticket-passenger-button-wrapper">
      <mu-button color="primary" full-width class="ticket-passenger-button" @click="editPassenger">确定</mu-button>
    </div>
  </div>
</template>

<script>
import FormItem from '@/components/form/form-item'

export default {
  components: {
    FormItem
  },

  props: {
    addText: {
      type: String,
      default: '乘客'
    },
    value: {
      type: Object,
      default: () => {}
    },
    passengerTypes: {
      type: Object,
      default: () => {}
    },
    idTypes: {
      type: Object,
      default: () => {}
    },
    methods: Function,
    hasChild: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      passengerObj: {}
    }
  },

  mounted () {
    console.log(this.value)
    this.passengerObj = Object.assign({}, this.value)
  },

  methods: {
    async editPassenger () {
      let res = await this.methods(this.passengerObj, this.value)
      this.$emit('update', res)
    },
    choosePassengerType (key) {
      console.log('choose.', key)
      if (!this.hasChild && parseInt(key) === 2) {
        this.$toast('无法选择儿童票')
        return
      }
      this.$set(this.passengerObj, 'passengerType', key)
    },
    chooseIdType (key) {
      this.$set(this.passengerObj, 'type', key)
    }
  }
}
</script>

<style lang="scss">
.ticket-passenger-edit-form-container {
  flex: 1;
  background-color: #efefef;
}
.form-wrapper {
  background-color: #fff;
  padding: 0 vw(15);
  .form-item {
    height: vw(50);
    input {
      padding: vw(10) 0;
    }
    .label {
      border: vw(1) solid #7f7f7f;
      color: #333;
      border-radius: vw(2);
      padding: vw(2) vw(6);
      font-size: vw(12);
      margin-right: vw(10);

      &-select {
        border-color: $default-color;
        background-color: $default-color;
        color: #fff;
      }
    }
  }
}

.ticket-passenger-button-wrapper {
  margin: vw(15);
}
</style>
