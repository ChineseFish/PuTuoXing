<template>
  <div class="icon-btn-wrapper" @click="onClick">
    <div class="icon-btn-icon" :style="{ 'backgroundColor': defaultObj.color || color }">
      <i class="iconfont" :class="`icon-${defaultObj.icon || icon}`"></i>
    </div>
    <p class="text">{{ defaultObj.text || text }}</p>
  </div>
</template>

<script>
const defaultObjMap = {
  'home': {
    method () {
      this.$router.push({ name: 'Index' })
    },
    icon: 'shouye-xianxing',
    text: '返回首页',
    color: 'rgb(126, 158, 244)'
  },
  'plane': {
    method () {
      this.$router.push({ name: 'PlaneTicket' })
    },
    icon: 'home-plane',
    text: '飞机票',
    color: '#EFD47F'
  },
  'ship': {
    method () {
      this.$router.push({ name: 'ShipTicketNav' })
    },
    icon: 'home-ship',
    text: '船票',
    color: '#E8997F'
  },
  'train': {
    method () {
      this.$router.push({ name: 'TrainTicket' })
    },
    icon: 'home-train',
    text: '火车票',
    color: '#D8F28D'
  },
  'bus': {
    method () {
      this.$router.push({ name: 'BusTicketIndex' })
    },
    icon: 'home-bus',
    text: '大巴票',
    color: '#A080EA'
  },
  'tel': {
    method () {
      window.location.href = 'tel://0580-2266222'
    },
    icon: 'telephone',
    text: '联系客服',
    color: 'rgb(137, 233, 218)'
  },
  'order': {
    method () {
      console.log(this)
      this.$router.push({ name: 'OrderList' })
    },
    icon: 'dingdan',
    text: '我的订单',
    color: ''
  },
  'shipOrder': {
    icon: 'dingdan',
    text: '我的订单',
    color: ''
  },
  'feedback': {
    method () {
      this.$router.push({ name: 'Feedback', query: this.options })
    },
    icon: 'feedback',
    text: '我要吐槽',
    color: 'rgb(160, 128, 234)'
  }
}
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String
    },
    color: {
      type: String
    },
    type: {
      type: String
    },
    options: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      clickMethod: null,
      defaultObj: {}
    }
  },

  mounted () {
    this.defaultObj = defaultObjMap[this.type] || {}
    this.clickMethod = this.defaultObj.method
  },

  methods: {
    onClick () {
      this.clickMethod && typeof this.clickMethod === 'function' && this.clickMethod()
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-btn {
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    .text {
      font-size: vw(12);
      color: #555;
    }
  }

  &-icon {
    width: vw(45);
    height: vw(45);
    border-radius: 50%;
    background-color: $default-color;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: vw(5);
  }
}
</style>
