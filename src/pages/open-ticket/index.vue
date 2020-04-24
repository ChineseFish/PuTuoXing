<template>
  <main-page class="open-ticket-list-wrapper" title="发票列表" back>
    <l-tab v-model="selected">
      <l-tab-item v-for="(item, index) of items" :key="index">
        {{ item }}
      </l-tab-item>
    </l-tab>

    <div class="list-wrapper" slot="scroll">
      <div class="list-item-wrapper" v-for="(item, index) of list" :key="index">
        <div class="status-label" :style="statusStyle(item.status)">{{ item.status === 1 ? '已开票' : '审核中' }}</div>
        <div class="line">
          <span class="title">开票方：</span>
          <span class="text">{{ item.buyerName }}</span>
        </div>
        <div class="line">
          <span class="title">开票类型：</span>
          <span class="text">{{ item.name }}</span>
        </div>
        <div class="line" v-if="item.applyTime">
          <span class="title">开票申请时间：</span>
          <span class="text">{{ item.applyTime }}</span>
        </div>
        <div class="line">
          <span class="title">订单号：</span>
          <span class="text">{{ item.orderNo }}</span>
        </div>
        <div class="line">
          <span class="title">邮箱：</span>
          <span class="text">{{ item.email }}</span>
        </div>
        <div class="line" v-if="item.invoiceUrl">
          <span class="title">发票链接：</span>
          <a :href="item.invoiceUrl" v-if="isWeixin">点击此处查看发票</a>
          <span v-else style="color: green;">请前往微信公众内查看具体发票</span>
        </div>
      </div>
    </div>
  </main-page>
</template>

<script>
import { getBillingList } from '@/api'
import { LTab, LTabItem } from '@/components/tab'
import { isWeiXin } from '@/utils/runtime-env'
export default {
  components: {
    LTab, LTabItem
  },
  computed: {
    isWeixin () {
      return isWeiXin()
    }
  },
  data () {
    return {
      selected: 0,
      items: ['审核中', '已开票'],
      list: []
    }
  },
  watch: {
    selected (newVal) {
      this.getBillingList(newVal)
    }
  },
  mounted () {
    this.getBillingList(this.selected)
  },
  methods: {
    async getBillingList (status) {
      const res = await getBillingList({ status })
      this.list = res
    },
    statusStyle (status) {
      if (status === 1) {
        return 'color: green;'
      } else {
        return 'color: #ff7d13;'
      }
    }
  }
}
</script>

<style lang="scss">
.open-ticket-list-wrapper {
  .list-wrapper {

  }

  .list-item-wrapper {
    background: #fff;
    margin: vw(5);
    border-radius: vw(5);
    padding: vw(10);

    position: relative;

    .status-label {
      position: absolute;
      top: vw(10);
      right: vw(10);
      font-size: vw(12);
    }

    .title {
      width: vw(100);
      display: inline-block;
      font-weight: 500;
    }

    .text {
      color: #555;
    }
  }
}
</style>
