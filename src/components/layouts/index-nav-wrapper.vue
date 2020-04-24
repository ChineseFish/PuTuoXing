<template>
  <div class="index-nav-wrapper">
    <div class="index-nav">
      <div :class="blur ? 'tab-blur' : 'tab-bk'"></div>
      <l-nav v-model="selected">
        <l-nav-item v-for="(item, index) in navItems" :key="index">
          {{ item.title }}
        </l-nav-item>
      </l-nav>
    </div>
    <component :is="compId" v-if="compId"></component>
  </div>
</template>

<script>
import { LNav, LNavItem } from '@/components/nav'

export default {
  components: {
    LNav,
    LNavItem
  },

  props: {
    navItems: {
      type: Array,
      default: () => []
    },
    blur: {
      type: Boolean,
      default: false
    },
    defaultSelected: {
      type: Number,
      default: 0
    }
  },

  computed: {
    compId () {
      return this.navItems[this.selected].component
    }
  },

  watch: {
    selected (newVal, oldVal) {
      console.log('selected: ', this.selected)
      // if (this.navItems[newVal].path) {
      //   this.$router.push(this.navItems[newVal].path)
      //   this.selected = oldVal
      // }

      const componentName = this.navItems[newVal].componentName
      const query = this.navItems[newVal].query
      console.log('query: ', query)
      if (componentName) {
        this.$router.push({ name: componentName, query })
      }
    }
  },

  data () {
    return {
      selected: this.defaultSelected
    }
  }
}
</script>

<style lang="scss">
$tab-h: vw(40);
.index-nav-wrapper {
  .index-nav {
    overflow: hidden;
    position: relative;
    // margin-top: - $tab-h + vw(1);
    margin-top: vw(-4);
    height: $tab-h;
  }
  %tab-common {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $tab-h - vw(4);
    overflow: hidden;
    z-index: 5;
  }
  %tab-common-before {
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    content: "";
  }
  .tab-blur {
    @extend %tab-common;
    &::before {
      @extend %tab-common-before;
      background-color: rgba(7, 17, 27, .7);
      filter: blur(15px);
    }
  }
  .tab-bk {
    @extend %tab-common;
    &::before {
      @extend %tab-common-before;
      background-color: rgba(38, 162, 255, .8);
      background: linear-gradient(rgba(38, 122, 255, .85), rgba(18, 200, 255, .7));
      filter: blur(1px);
    }
  }
  .l-nav {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    line-height: $tab-h;
    color: #fff;
    background-color: transparent;
    z-index: 10;
  }
  .l-nav-item {
    font-weight: 700;
    &.is-selected {
      color: $default-color;
      background-color: $white;
      position: relative;
      font-size: vw(15);
      &::before {
        content: "";
        position: absolute;
        left: vw(-16);
        bottom: 0;
        width: vw(17);
        height: 100%;
        background: url(../.././assets/bus-index-tab.png) no-repeat;
        background-position: 0 vw(-2);
        background-size: vw(40) vw(42);
      }
      &::after {
        content: "";
        position: absolute;
        right: vw(-12);
        bottom: 0;
        width: vw(17);
        height: 100%;
        background: url(../.././assets/bus-index-tab.png) no-repeat;
        background-position: vw(-16) vw(-2);
        background-size: vw(40) vw(42);
      }
    }
  }
}
</style>
