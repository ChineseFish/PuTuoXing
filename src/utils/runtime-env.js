export const isWeiXin = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  const matched = ua.match(/MicroMessenger/i)
  if (!matched) {
    return false
  }
  return matched.toString() === 'micromessenger'
}

export const isAndroidApp = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  const matched = ua.match(/ziubaoAndroid/i)
  return matched
}

class SystemInfo {
  constructor () {
    this.androidAppId = 'com.tongda.ziubao'
    this.ua = window.navigator.userAgent
  }

  isAndroid = () => {
    return this.ua.match('Android')
  }

  isIOS = () => {
    return !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }

  isWebView = () => {
    return this.isAndroidWebview() || this.isIOSWebview()
  }

  isSafari = () => {
    return /safari/.test(this.ua.toLowerCase()) && !(/chrome/.test(this.ua.toLowerCase()))
  }

  isAndroidWebview = (appId) => {
    if (this.isAndroid() && this.androidAppId === appId) {
      return true
    }
    return false
  }

  isIOSWebview = () => {
    const isSafari = this.isSafari()
    if (this.isIOS() && !isSafari) {
      return true
    }
    return false
  }

  os = () => {
    if (this.isAndroid()) {
      return 'Android'
    }
    if (this.isIOS()) {
      return 'iOS'
    }
    return ''
  }
}

export const systemInfo = new SystemInfo()
