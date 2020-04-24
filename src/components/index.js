import LHeader from './header'
import LHeaderImage from './header/header-image'
import BScroll from './better-scroll'
import LDialog from './dialog'
import LToast from './toast'
import MainPage from './layouts/main-page'
import LInput from './common/input'
import LLabels from './labels'
import NoticationBar from './common/notication-bar'
import NumberAdjust from './num-adjust'
import DynamicNoticeBar from './common/dynamic-notice-bar'

import TelephoneBtn from './button/telephone'
import GotoHomeBtn from './button/gotoHome'
import GoBackBtn from './button/go-back'
import IconBtn from './button/icon-btn'

import LListItem from './common/list-item'
import LTagWrapper from './common/tag-wrapper'

export default {
  install: (Vue) => {
    Vue.component('LHeader', LHeader)
    Vue.component('LHeaderImage', LHeaderImage)
    Vue.component('BScroll', BScroll)
    Vue.component('LDialog', LDialog)
    Vue.component('LToast', LToast)
    Vue.component('MainPage', MainPage)
    Vue.component('TelephoneBtn', TelephoneBtn)
    Vue.component('GotoHomeBtn', GotoHomeBtn)
    Vue.component('GoBackBtn', GoBackBtn)
    Vue.component('IconBtn', IconBtn)
    Vue.component('LListItem', LListItem)
    Vue.component('LInput', LInput)
    Vue.component('LLabels', LLabels)
    Vue.component('NoticationBar', NoticationBar)
    Vue.component('NumberAdjust', NumberAdjust)
    Vue.component('LTagWrapper', LTagWrapper)
    Vue.component('DynamicNoticeBar', DynamicNoticeBar)
  }
}
