<template>
  <div class="checkbox-container" @click.stop.prevent="handleClick">
    <div class="checkbox-label">
      <slot name="left-text"></slot>
      <input type="checkbox" v-model="value" :id="`checkbox-${id}`" hidden/>
      <label :for="`checkbox-${id}`" class="checkbox-beauty" @click.stop="handleClick"></label>
      <slot name="right-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    checked: {
      type: Boolean,
      default: false
    },
    label: String,
    disable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: this.checked
    }
  },
  methods: {
    handleClick () {
      this.$emit('change', !this.value)
      // this.value = !this.value
    }
  },
  watch: {
    checked (newVal) {
      this.value = newVal
    },
    value (newVal) {
      // this.$emit('change', newVal)
    }
  }
}
</script>

<style lang="scss">
.checkbox-container {
  display: inline;
  overflow: hidden;
  .checkbox-label {
    padding: vw(12) 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: vw(25);
  }
  %common {
    content: '✓';
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    background: $default-color;
  }
  .checkbox-beauty {
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 50%;
    text-align: center;
    border: 1px solid #bbb;
    display: inline-block;
    margin: auto 10px auto 3px;
    vertical-align: middle;
  }

  .checkbox-name {
    vertical-align: middle;
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  input[type="checkbox"]:checked+.checkbox-beauty::after {
    @extend %common;
  }

  input[type="checkbox"]:checked+.checkbox-beauty {
    background: $default-color;
    border: 1px solid $default-color;
    overflow: hidden;
  }
}

</style>
