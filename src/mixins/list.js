export default {
  data () {
    return {
      list: [],
      listParams: {},
      getListMethod: null,
      page: 1,
      pageSize: 10,
      isLoaded: false
    }
  },
  created () {

  },
  mounted () {
    if (!this.getListMethod) {
      throw new Error('请设置获取列表方法')
    }

    this.getList()
  },
  methods: {
    async getMoreList () {
      const params = { ...this.listParams, page: ++this.page, pageSize: this.pageSize }
      const res = await this.getListMethod(params)
      this.list = this.list.concat(res.data)
    },
    async getList () {
      this.isLoaded = false
      console.log('listParams: ', this.listParams)
      this.page = 1
      const params = { ...this.listParams, page: 1, pageSize: this.pageSize }
      const res = await this.getListMethod(params)
      this.list = res.data
      this.isLoaded = true
    },
    async pulldown (scroll) {
      console.log('pulldown', scroll)
      await this.getList()
      console.log('pulldown: ', this.$parent)
      scroll.finishPullDown()
    },
    async scrollToEnd (scroll) {
      await this.getMoreList()
      scroll.finishPullUp()
    }
  }
}
