<template>
  <l-dialog :show.sync="showTicketTypes" class="ticket-type-choose-dialog">
    <div class="ticket-type-choose-dialog-title">请选择票种</div>
    <div class="ticket-type-choose-dialog-content">
      <div class="ticket-item" :class="{ 'ticket-item-disabled': item.disabled }" v-for="(item, index) in types" :key="index" @click="choose(index)">
        <div class="ticket-title">
          <span>{{ item.ticketType }}</span>
          <span v-if="item.surplusTicket">{{ item.surplusTicket }}</span>
          <span v-if="item.seatType">({{ item.seatType }})</span>
        </div>
        <span class="ticket-item-right">
          <span :class="item.disabled ? 'ticket-item-disabled' : 'price'">￥{{ item.price }}</span>
          <i class="iconfont icon-forward"></i>
        </span>
      </div>
    </div>
  </l-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    ticketTypes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showTicketTypes: false,
      types: {}
    }
  },
  watch: {
    show: {
      handler (newVal) {
        this.showTicketTypes = this.show
        if (newVal) {
          this.getTypes()
        }
      },
      immediate: true
    },
    showTicketTypes (newVal) {
      this.$emit('update:show', newVal)
    }
  },
  mounted () {
    this.getTypes()
  },
  methods: {
    choose (index) {
      if (this.types[index].disabled) {
        return
      }
      this.$emit('choose', this.ticketTypes[index])
    },
    getTypes () {
      this.types = this.ticketTypes.map((item, index) => {
        if (!item.surplusTicket) {
          return item
        }
        let newItem = Object.assign({}, item)
        let surplusTicketInfo = newItem.surplusTicket
        if (isNaN(surplusTicketInfo)) {
          if (surplusTicketInfo === '无') {
            newItem.disabled = true
          }
          surplusTicketInfo = `${surplusTicketInfo}票`
        } else {
          surplusTicketInfo = `${surplusTicketInfo}张`
        }
        newItem.surplusTicket = `(${surplusTicketInfo})`
        return newItem
      })
    }
  }
}
</script>

<style lang="scss">
.ticket-type-choose-dialog {
  &-title {
    font-weight: 700;
    font-size: vw(16);
    text-align: center;
    padding-bottom: vw(10);
  }
  &-content {
    .ticket-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      line-height: 2;
      &-disabled {
        color: #bbb;
      }
    }
    .ticket-title {
      display: flex;
      align-items: center;
    }
    .ticket-item-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
