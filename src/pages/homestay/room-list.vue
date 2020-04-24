<template>
  <main-page back
    headerClass="gradient-style"
    class="homestay-room-list-wrapper"
    :title="hotelInfo.name">
    <template slot="scroll">
      <detail-header-image :image="hotelInfo.image"></detail-header-image>

      <div class="block-section image-bottom-section">
        <div class="title">{{ hotelInfo.name }}</div>
        <div v-is-link @click="onAddress">{{ hotelInfo.address }}</div>
      </div>

      <div class="block-section room-list-wrapper" v-if="roomList.length > 0">
        <div class="room-list-item-wrapper"
          v-for="(item, index) of roomList"
          :key="index"
          @click="toDetail(item.id)">
          <img :src="item.image" class="image">
          <div class="right-content">
            <div class="name">{{ item.name }}</div>
            <div class="ext">{{ item.layout }} | {{ item.bedType }}</div>

            <div class="price-wrapper">
              <span class="price">
                <span class="sign">¥</span><span class="price-num">{{ item.price }}</span>
              </span>
              <span>起</span>
            </div>
          </div>
        </div>
      </div>
      <div class="block-section no-room" v-else>
        <span>- 暂无房间信息 -</span>
      </div>
    </template>
  </main-page>
</template>

<script>
import { getHotelInfo, getHomestayList } from '@/api'
import DetailHeaderImage from './components/detail-header-image'

export default {
  components: {
    DetailHeaderImage
  },
  data () {
    return {
      hotelInfo: {},
      roomList: []
    }
  },
  mounted () {
    this.getHotelInfo()
    this.getRoomList()
  },
  methods: {
    async getHotelInfo () {
      this.hotelInfo = await getHotelInfo({ id: this.$route.params.id })
    },
    async getRoomList () {
      this.roomList = (await getHomestayList({ hotelId: this.$route.params.id })).data
    },
    toDetail (id) {
      this.$router.push({ path: `/homestay/detail/${id}` })
    },
    onAddress () {
      const { address, latitude, longitude, name } = this.hotelInfo
      this.$router.push({ path: `/homestay/map`, query: { keyword: address, lat: latitude, lng: longitude, title: name } })
    }
  }
}
</script>

<style lang="scss">
.homestay-room-list-wrapper {
  .image-bottom-section {
    padding-bottom: vw(10);
    .title {
      font-size: vw(18);
      font-weight: 500;
    }
  }
  .room-list-item-wrapper {
    padding-bottom: vw(10);
    display: flex;
    .image {
      width: vw(110);
      height: vw(80);
      margin-right: vw(8);
    }

    .right-content {
      position: relative;
      flex: 1;
      .name {
        font-weight: 500;
      }

      .ext {
        @extend %minor-font;
      }

      .price-wrapper {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: vw(11);

        .price {
          font-size: vw(11);
        }

        .price-num {
          font-size: vw(18);
        }
      }
    }
  }
  .no-room {
    @extend %minor-font;
    padding-bottom: vw(10);
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
