<template>
  <div class="passenger-list-item-wrapper">
    <div class="passenger-list-item-right" @click="editPassenger(value)" v-is-link>
      <div class="line">
        <span class="name">{{ value.name }}</span>
        <span class="label">{{ passengerTypes[value.passengerType] || '成人票' }}</span>
      </div>
      <div class="line">
        <span class="id">{{ idTypes[value.type] || '身份证' }}  {{ value.id }}</span>
      </div>
    </div>

    <popup-container :show.sync="showEditPassenger"
      appendToBody
      position="bottom"
      :title="`编辑${addText}`">
      <ticket-passenger-edit :value="value"
        :passengerTypes="passengerTypes"
        :idTypes="idTypes"
        @update="updated"
        :methods="methods"
        :hasChild="hasChild">
      </ticket-passenger-edit>
    </popup-container>
  </div>
</template>

<script>
import PopupContainer from '@/components/layouts/popup-container'
import TicketPassengerEdit from './ticket-passenger-edit'
import { updatePassenger } from '@/api'
import { isObjectEmpty } from '@/utils/type-judgement'

export default {
  components: {
    PopupContainer,
    TicketPassengerEdit
  },

  props: {
    addText: {
      type: String,
      default: '乘客'
    },
    value: {},
    values: {},
    index: {
      type: Number,
      default: 0
    },
    passengerTypes: {
      type: Object,
      default: () => {}
    },
    idTypes: {
      type: Object,
      default: () => {}
    },
    hasChild: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      methods: updatePassenger,
      showEditPassenger: false
    }
  },

  methods: {
    editPassenger (item) {
      this.value = item
      this.showEditPassenger = true
    },
    updated (value) {
      console.log('update value: ', this.value)
      this.showEditPassenger = false

      if (this.values && !isObjectEmpty(this.values)) {
        console.log('xxxx', this.values)
        this.$set(this.values, this.index, value)
      }
    }
  }
}
</script>

<style lang="scss">
.passenger-list-item-right {
  padding: vw(15) 0;
  border-bottom: vw(1) solid #eee;
  background-color: #fff;
  &-checkbox {
    margin-right: vw(10);
  }

  &-right {
    flex: 1;
  }

  .line {
    display: flex;
    align-items: center;
  }

  .name {
    margin-right: vw(5);
  }

  .label {
    font-size: vw(9);
    border: vw(1) solid $default-color;
    border-radius: vw(2);
    padding: vw(1) vw(6);
    color: $default-color;
  }

  .id {
    @extend %minor-font;
  }
}
</style>
