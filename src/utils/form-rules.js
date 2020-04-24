import Vue from 'vue'
import Toast from '@/components/toast'

Vue.use(Toast)

export const judgeIdCard = (id, type = 1) => {
  if (!id) {
    Vue.prototype.$toast('证件号码必填')
    return false
  }

  // 校验身份证格式
  switch (type) {
    case 1: {
      const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|([1−9]\d5\d2((0[1−9])|(10|11|12))(([0−2][1−9])|10|20|30|31)\d2[0−9Xx])/
      const status = reg.test(id)
      if (!status) {
        Vue.prototype.$toast('身份证格式有误')
      }
      return status
    }
    case 3: {
      const reg1 = /^1[45][0-9]{7}|([P|p|S|s]\\d{7})|([S|s|G|g]\\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\\d{8})|([H|h|M|m]\\d{8,10})$/
      const reg2 = /^[a-zA-Z0-9]{5,17}$/
      if (reg1.test(id) || reg2.test(id)) {
        return true
      }
      Vue.prototype.$toast('护照格式有误')
      return false
    }
  }
}
