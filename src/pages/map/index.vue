<template>
  <main-page back title="地图" class="map-container">
    <div ref="map-content"
      id="map-content"
      class="map-content">
      <div class="map-searchbar">
      </div>
    </div>
    <div class="map-panel">
      <div class="name" v-if="name">
        <i class="iconfont icon-qichepiao"></i>
        {{ name }}
      </div>
      <div class="content">
        <div class="left">
          <div class="address">地址：{{ keyword || poi.address }}</div>
          <div class="address" v-if="tel || poi.tel">联系方式：<a :href="`tel://${tel || poi.tel}`">{{ tel || poi.tel }}</a></div>
        </div>
        <div class="right" @click="goHere">
          <i class="iconfont icon-go-here"></i>
          <div class="go-here">去这里</div>
        </div>
      </div>
    </div>
  </main-page>
</template>

<script>
import AMap from 'AMap'

export default {
  data () {
    return {
      map: null,
      infoWindow: null,
      markers: [],
      poi: {}
    }
  },

  props: {
    keyword: String,
    city: String,
    name: String,
    tel: String,
    lat: String,
    lng: String
  },

  mounted () {
    let center
    if (this.lng && this.lat) {
      AMap.convertFrom([this.lng, this.lat], 'baidu', (status, result) => {
        if (result.info === 'ok') {
          console.log('result:', result)
          const { lng, lat } = result.locations[0]
          center = [lng, lat]
          console.log(center)
          this.initMap(center)
        }
      })
    } else {
      this.initMap(center)
    }
  },

  methods: {
    initMap (center) {
      this.map = new AMap.Map('map-content', {
        resizeEnable: true,
        center: center,
        zoom: 13
      })

      AMap.plugin([
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.Geolocation',
        'AMap.Autocomplete',
        'AMap.PlaceSearch'
      ], () => {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        this.map.addControl(new AMap.ToolBar())
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        this.map.addControl(new AMap.Scale())

        const placeSearch = new AMap.PlaceSearch({
          // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
          city: '全国',
          pageSize: 1,
          map: this.map
        })

        if (center) {
          this.addMarkers(center[0], center[1])
          return
        }

        let keyword = this.keyword
        if (keyword === '杭州市秋涛路407号') {
          keyword = '杭州汽车南站'
        }

        placeSearch.search(keyword, (status, result) => {
          console.log('result.poiList: ', result.poiList)
          const pois = result.poiList && result.poiList.pois
          if (!pois || pois.length === 0) {
            return
          }
          console.log('pois: ', pois)
          this.poi = pois[0]
          this.addMarkers(pois[0].location.lng, pois[0].location.lat)
          console.log(result)
        })
      })
    },
    addMarkers (lng, lat) {
      this.map.clearMap()
      console.log('lng: ', lng, 'lat: ', lat)
      // 只需要添加一个点
      const marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
        map: this.map
      })
      this.map.add(marker)
    },
    goHere () {
      const lng = this.lng || this.poi.location.lng
      const lat = this.lat || this.poi.location.lat
      window.location.href = `https://m.amap.com/navigation/index/daddr=${lng}%2C${lat}%2C${this.keyword}`
    }
  }
}
</script>

<style lang="scss">
.map-container {
  display: flex;
  flex-direction: column;
  .map-content {
    // height: calc(100vh)
    flex: 1;
  }

  .map-panel {
    background-color: #fff;
    height: vw(120);
    width: 100%;
    display: flex;
    flex-direction: column;
    .name {
      background-color: rgb(230, 245, 255);
      padding: vw(8) vw(15);
    }
    .content {
      padding: vw(8) vw(15);
      // font-size: vw(12);
      display: flex;
      align-items: center;
      .left {
        flex: 1;
      }
      .right {
        color: $default-color;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: vw(80);
        .iconfont {
          font-size: vw(40);
          height: vw(48);
        }
        .go-here {
          // margin-top: vw(-10);
        }
      }
    }
  }
}
</style>
