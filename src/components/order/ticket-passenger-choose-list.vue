<template>
  <main-page>
    <div class="ticket-passenger-tips">
      <i class="iconfont icon-xinxi-xianxingyuankuang"></i>
      <span>此订单最多可添加{{ limit }}人，已经添加{{ checkedCnt }}人</span>
    </div>
    <div class="ticket-passenger-add-button-wrapper">
      <mu-button flat color="primary" full-width class="ticket-passenger-add-button" @click="addPassenger">添加{{addText}}</mu-button>
    </div>

    <div class="passenger-list" slot="scroll">
      <div class="passenger-list-item" v-for="(item, index) of passengerListValues" :key="item.__ob__.dep.id">
        <common-item deletable flex @delete="deletePassenger(item, index)">
          <mu-checkbox v-model="item.checked"
            class="item-checkbox"
            :disabled="(!item.checked && checkedCnt === limit) ||
              (item.passengerType === '2' && !hasChild )">
          </mu-checkbox>
          <ticket-passenger-item :value="item"
            :addText="addText"
            :values="passengerListValues"
            :index="index"
            class="item-right"
            :passengerTypes="passengerTypes"
            :idTypes="idTypes"
            :hasChild="hasChild">
          </ticket-passenger-item>
        </common-item>
      </div>
    </div>

    <div class="ticket-passenger-button-wrapper" slot="bottom">
      <mu-button color="primary" full-width class="ticket-passenger-button" @click="confirm">确定</mu-button>
    </div>

    <popup-container :show.sync="showEditPassenger" appendToBody position="bottom" :title="passengerObj.title">
      <ticket-passenger-add :value="passengerObj.value"
        :addText="addText"
        :passengerTypes="passengerTypes"
        :idTypes="idTypes"
        @update="updated"
        :title="passengerObj.title"
        :methods="passengerObj.methods"
        :hasChild="hasChild">
      </ticket-passenger-add>
    </popup-container>
  </main-page>
</template>

<script>
import PopupContainer from '@/components/layouts/popup-container'
import TicketPassengerAdd from './ticket-passenger-edit'
import { getPassengerList, addPassenger, deletePassenger } from '@/api'
import { mapGetters } from 'vuex'
import TicketPassengerItem from './ticket-passenger-item'
import CommonItem from '@/components/common/common-item'

export default {
  components: {
    PopupContainer,
    TicketPassengerAdd,
    TicketPassengerItem,
    CommonItem
  },

  props: {
    addText: {
      type: String,
      default: '乘客'
    },
    passengerTypes: {
      type: Object,
      default: () => {}
    },
    idTypes: {
      type: Object,
      default: () => {}
    },
    limit: {
      type: [String, Number],
      default: 5
    },
    hasChild: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters([
      'passengerValues',
      'passengerListValues'
    ]),
    checkedCnt () {
      let cnt = 0
      for (let item of this.passengerListValues) {
        item.checked && ++cnt
      }
      return cnt
    }
  },

  data () {
    return {
      passengerList: [],
      choosedPassengerList: [],
      showEditPassenger: false,
      passengerObj: {
        title: '',
        methods: undefined,
        value: {},
        optType: ''
      },
      checkedValues: []
    }
  },

  mounted () {
    this.checkedValues = this.passengerValues
    // edit操作已经如何入passenger-item内，这里的弹出层只需要为add服务即可
    this.passengerObj.title = '新增' + this.addText
    this.passengerObj.methods = addPassenger
    this.passengerObj.value = { passengerType: 1, type: 1 }

    this.mergePassengerList().then(() => {
      this.setPassengerChecked()
      // this.sortPassenger()
    })
  },

  methods: {
    async setPassengerChecked () {
      for (let listItem of this.passengerListValues) {
        for (let checked of this.checkedValues) {
          if (checked.id === listItem.id) {
            this.$set(listItem, 'checked', true)
          }
        }
      }
    },
    async mergePassengerList () {
      let passengerListValuesTmp = this.passengerListValues
      try {
        await getPassengerList()
      } catch (err) {
        throw new Error(err)
      }

      // 拿本地数据与线上数据进行对比
      let updateFlag = false
      for (let localPassenger of passengerListValuesTmp) {
        let exist = false
        for (let item of this.passengerListValues) {
          if (localPassenger.id === item.id) {
            exist = true
            updateFlag = true
          }
        }

        if (!exist) {
          // 早期的数据可能没有passengerType
          if (!localPassenger.passengerType) {
            localPassenger.passengerType = 1
          }

          if (!localPassenger.type) {
            localPassenger.type = 1
          }

          await addPassenger(localPassenger)
          this.passengerListValues.push(localPassenger)
        }
      }

      // 如果线上数据发生更新，则再次获取一次列表，保持数据同步
      if (updateFlag) {
        await getPassengerList()
      }
    },
    addPassenger () {
      this.passengerObj.value = { passengerType: 1, type: 1 }
      this.showEditPassenger = true
    },
    async getPassengerList () {
      try {
        const res = await getPassengerList()
        this.setPassengerChecked()
        return res
      } catch (err) {
        throw new Error(err)
      }
    },
    async deletePassenger (item, index) {
      await deletePassenger(item, index)
    },
    updated () {
      this.showEditPassenger = false
    },
    confirm () {
      this.choosedPassengerList = []
      this.passengerListValues.forEach(item => {
        if (item.checked) {
          this.choosedPassengerList.push(item)
        }
      })
      this.$emit('confirm', this.choosedPassengerList)
    }
  }
}
</script>x

<style lang="scss">
.passenger-list {
  margin-top: vw(10);
  &-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    .item-checkbox {
      margin: 0 vw(15);
    }
    .item-right {
      flex: 1;
    }
    &-right {
      padding: vw(15) 0;
    }
  }
}

.ticket-passenger-button-wrapper {
  margin: vw(15);
}

.ticket-passenger-tips {
  background-color: $default-color;
  color: #fff;
  padding: vw(5) vw(15);
  font-size: vw(12);
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    margin-right: vw(5);
  }
  // margin-bottom: vw(10);
}

.ticket-passenger-add-button-wrapper {
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  text-align: center;
  display: flex;
  box-shadow: vw(1) vw(2) vw(3) #aaa;
  .ticket-passenger-add-button {
    flex: 1;
    font-size: vw(16);
    height: vw(45);
  }
}
</style>
