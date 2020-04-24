<template>
  <div class="ticket-passenger-form">
    <div class="section-title-with-border-left">{{ addText }}信息</div>
    <div v-for="(passengerValue, index) of values"
         :key="passengerValue.__ob__.dep.id"
         class="ticket-passenger-form-wrapper">
      <div class="ticket-passenger-form-sub"
           v-if="values.length > 1"
           @click="delPassenger(index)">
        <i class="iconfont icon-sub2"></i>
      </div>
      <div class="ticket-passenger-form-content">
        <ticket-passenger-item
          :value="passengerValue"
          :values="values"
          :index="index"
          :passengerTypes="passengerTypes"
          :idTypes="idTypes"
          :hasChild="hasChild">
        </ticket-passenger-item>
      </div>
    </div>
    <div class="ticket-passenger-form-add" @click="addPassenger">
      <i class="iconfont icon-add2"></i>
      <span>添加{{ addText }}</span>
    </div>

    <popup-container :show.sync="showPassengerList" appendToBody position="bottom" :title="`选择${addText}`">
      <ticket-passenger-choose-list @confirm="addPassengerConfirm"
        :addText="addText"
        :passengerTypes="passengerTypes"
        :idTypes="idTypes"
        :limit="limit"
        :hasChild="hasChild">
      </ticket-passenger-choose-list>
    </popup-container>
  </div>
</template>

<script>
import FormItem from '@/components/form/form-item'
import PopupContainer from '@/components/layouts/popup-container'
import TicketPassengerChooseList from './ticket-passenger-choose-list'
import TicketPassengerItem from './ticket-passenger-item'
import { mapGetters } from 'vuex'

export default {
  components: {
    FormItem,
    PopupContainer,
    TicketPassengerChooseList,
    TicketPassengerItem
  },

  props: {
    addText: {
      type: String,
      default: '乘客'
    },
    fields: {
      type: Array
    },
    values: {
      type: Array
    },
    limit: {
      type: [Number, String],
      default: 5
    },
    hasChild: {
      type: Boolean,
      default: false
    },
    type: String
  },

  computed: {
    isLogin () {
      return this.$store.getters.token
    },
    ...mapGetters([
      'defaultPassengerTypes',
      'defaultIdTypes',
      'collector'
    ]),
    passengerTypes () {
      // if (!this.hasChild) {
      //   return this.defaultPassengerTypes
      // }
      return { ...this.defaultPassengerTypes, 2: '儿童票' }
    },
    idTypes () {
      if (this.type === 'bus') {
        return { 1: '身份证' }
      }
      return this.defaultIdTypes
    }
  },

  data () {
    return {
      selectIndex: 0,
      showPassengerList: false,
      showEditPassenger: false
    }
  },

  created () {
    // if (this.values.length === 0) {
    //   this.addPassenger()
    // }
  },

  methods: {
    addPassenger () {
      console.log(this.values.length, this.limit)
      if (this.limit && this.values.length >= this.limit) {
        this.$toast(`该订单最多只能添加${this.limit}位乘客`)
      } else {
        this.showPassengerList = true
      }
    },
    addPassengerConfirm (value) {
      this.showPassengerList = false
      if (!this.collector.name && value.length > 0) {
        // this.collector.name = value[0].name
        this.$set(this.collector, 'name', value[0].name)
      }
      // this.$store.commit('SET_PASSENGERS', { type: this.type, value })
    },
    delPassenger (index) {
      this.values[index].checked = false
      this.selectIndex = 0
      // this.$store.commit('SET_PASSENGERS', { type: this.type, value: this.values })
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/transition.scss';

.ticket-passenger-form {
  padding-top: vw(15);
  &-wrapper {
    display: flex;
    border-bottom: 1px solid $line-color-light;
  }

  &-content {
    flex: 1;
  }

  &-sub {
    height: 100%;
    margin: auto 0;
    .icon-sub2 {
      color: red;
      margin-right: vw(10);
    }
  }

  &-add {
    padding: vw(10) 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $default-color;
    .icon-add2 {
      margin-right: vw(10);
    }
    font-size: vw(16);
  }

  &-dialog {
    .title {
      font-size: vw(18);
    }
    .content {
      display: flex;
      margin-top: vw(10);
      justify-content: center;
      flex-wrap: wrap;
      .item {
        padding: vw(5) vw(10);
        margin: vw(10);
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: vw(14);
      }

      .item-selected {
        border-color: $default-color;
        color: $default-color;
      }
    }
  }
}
</style>
