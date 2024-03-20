<template>
  <input type="text" class="py-3 px-3.5 outline-none bg-[#F1FAFF] rounded-md text-sm text-[#677593]"
  :placeholder="placeholder"
  :value="value"
  @input="handleInput($event)">
</template>
<script>
export default {
  name: 'SearchComponent',
  props: {
    placeholder: {
      type: String
    },
    value: {}
  },
  methods: {
    handleInput(event) {
      setTimeout(() => {
        this.$emit('input', event.target.value)
      }, 750);
    }
  }
}
</script>
