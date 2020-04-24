<template>
  <div class="open-ticket-wrapper">
    <div class="desc-wrapper">
      <p>开票审核将会在24小时内审核完成，并通过邮件的方式发送电子发票到指定邮箱，请注意查收。</p>
    </div>
    <!-- <div class="">请选择开票类型</div> -->
    <div class="title">发票名称类型</div>
    <div v-if="!canHandlingFee && !canServerFee && !canBusInvoiced" class="warning-tip">没有可以选择的类型，无法开具发票！！</div>
    <div class="type-wrapper">
      <mu-radio v-model="nameType"
        value="订票服务费"
        label="订票服务费"
        class="radio"
        :disabled="!canHandlingFee">
      </mu-radio>
      <mu-radio v-model="nameType"
        value="退票服务费"
        label="退票服务费"
        class="radio"
        :disabled="!canServerFee">
      </mu-radio>
      <mu-radio v-model="nameType"
        value="大巴交通服务费"
        label="大巴交通服务费"
        class="radio"
        :disabled="!canBusInvoiced"
        v-if="orderNo.indexOf('Bus') > -1">
      </mu-radio>
    </div>
    <!-- <div class="">请选择开票类型</div> -->
    <div class="title">提交方式</div>
    <div class="type-wrapper">
      <mu-radio v-model="type"
        v-for="(item, index) of types"
        :key="index"
        :value="index"
        :label="item"
        class="radio">
      </mu-radio>
    </div>

    <div class="" v-if="type === 0">
      <l-input placeholder="*姓名" class="input" v-model="buyerName"></l-input>
      <l-input placeholder="*接收邮件的email" class="input" v-model="email"></l-input>
    </div>

    <div class="" v-else>
      <l-input placeholder="*公司抬头" class="input" v-model="companyName"></l-input>
      <l-input placeholder="*接收邮件的email" class="input" v-model="email"></l-input>
      <l-input :placeholder="taxNumberPlaceholder" class="input" v-model="taxNumber"></l-input>
      <l-input placeholder="公司地址（选填）" class="input" v-model="companyAddress"></l-input>
      <l-input placeholder="座机号码（选填）" class="input" v-model="landline"></l-input>
      <l-input placeholder="开户银行（选填）" class="input" v-model="bankAddress"></l-input>
      <l-input placeholder="银行账号（选填）" class="input" v-model="bankAccount"></l-input>
    </div>
    <l-input placeholder="备注（选填）- 如需备注行程日期请务必填写" class="input" v-model="remark"></l-input>

    <div class="">
      <span class="title">预计开票金额（以审核为准）：</span>
      <span class="price">¥{{ invoiceAmount }}</span>
    </div>

    <mu-button v-if="!(!canHandlingFee && !canServerFee && !canBusInvoiced)"
      class="commit-button"
      full-width color="primary"
      @click="applyBilling">提交审核</mu-button>
  </div>
</template>

<script>
import { applyBilling } from '@/api'
import store from 'store'

const OPEN_TICKET_KEY = 'OPEN_TICKET_KEY'
let openTicketParams = store.get(OPEN_TICKET_KEY) || {}

export default {
  props: {
    orderNo: String,
    canHandlingFee: false,
    canServerFee: false,
    canBusInvoiced: false,
    mobile: String,
    refundServerFee: Number,
    handlingFee: Number,
    colletorName: String,
    price: Number
  },
  computed: {
    taxNumberPlaceholder () {
      if (this.type === 1) {
        return '*税号'
      } else {
        return '税号（选填）'
      }
    }
  },
  watch: {
    colletorName (newVal) {
      this.buyerName = newVal
    },
    nameType (newVal) {
      console.log('newVal: ', newVal)
      this.calcInvoiceAmount()
    }
  },
  data () {
    return {
      types: ['个人', '公司', '政府、事业、部队'],
      type: 0,
      taxNumber: openTicketParams.taxNumber || '',
      email: openTicketParams.email || '',
      name: '',
      buyerName: openTicketParams.buyerName || this.colletorName,
      // names: ['订票服务费', '退票服务费'],
      nameType: '',
      companyName: '',
      invoiceAmount: 0,
      landline: openTicketParams.landline || '',
      companyAddress: openTicketParams.companyAddress || '',
      bankAccount: openTicketParams.bankAccount || '',
      bankAddress: openTicketParams.bankAddress || '',
      remark: ''
    }
  },
  mounted () {
    console.log(this.mobile, this.refundServerFee, this.handlingFee, this.colletorName)
  },
  methods: {
    async applyBilling () {
      this.calcInvoiceAmount()
      openTicketParams = {
        type: this.type + 1,
        taxNumber: this.taxNumber,
        email: this.email,
        buyerName: this.type === 0 ? this.buyerName : this.companyName,
        mobile: this.mobile,
        name: this.nameType,
        orderNo: this.orderNo,
        invoiceAmount: this.invoiceAmount,
        remark: this.remark,
        companyAddress: this.companyAddress,
        bankAddress: this.bankAddress,
        landline: this.landline,
        bankAccount: this.bankAccount
      }
      // localstorage 存一下
      store.set(OPEN_TICKET_KEY, openTicketParams)
      await applyBilling(openTicketParams)

      this.$emit('applyBilling')
    },
    calcInvoiceAmount () {
      if (this.nameType === '订票服务费') {
        this.invoiceAmount = this.handlingFee
      } else if (this.nameType === '退票服务费') {
        this.invoiceAmount = this.refundServerFee
      } else if (this.nameType === '大巴交通服务费') {
        this.invoiceAmount = this.price + this.handlingFee
      }
    }
  }
}
</script>

<style lang="scss">
.open-ticket-wrapper {
  padding: $padding-aside;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  .title {
    font-weight: 500;
    margin-bottom: vw(-5);
  }
  .type-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: vw(5);
    color: #333;
  }

  .desc-wrapper {
    padding: vw(10);
    border: 1px dotted $default-color;
    margin-bottom: vw(10);
    border-radius: vw(5);
    font-size: vw(12);
    color: $default-color;
  }

  .warning-tip {
    color: $default-color-orange;
    font-size: vw(12)
  }

  .input {
    border-bottom: 1px solid #3f3f3f;
    line-height: 2;
  }

  .commit-button {
    margin-top: vw(10);
    // position: fixed;
    // bottom: 0;
    // left: 0;
  }
}
</style>
