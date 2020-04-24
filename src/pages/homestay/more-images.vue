<template>
  <main-page title="房屋相册" class="more-images-wrapper" back>
    <template slot="scroll">
      <div class="block-section" v-for="(item, index) of homestayImagesInfo" :key="index">
        <div class="homestay-detail-images-title">
          <span class="text">{{ item.groupName }}</span>
        </div>
        <img v-for="(image, imageIndex) of item.images"
          :key="imageIndex"
          :src="image"
          style="margin: 5px 0;"
          onerror="this.style.display='none'">
      </div>
    </template>
  </main-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'homestayImagesInfo'
    ])
  },
  mounted () {
    if (!this.homestayImagesInfo) {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss">
.more-images-wrapper {

}
</style>
