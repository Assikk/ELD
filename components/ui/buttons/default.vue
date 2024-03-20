<template>
  <button class="bg-[#1E40AF] text-[#F1FAFF] rounded-md py-2.5 px-3 flex items-center justify-center gap-3 text-sm"
  :class="[
  {'w-fit': small},
  {'min-w-[160px] w-fit': medium},
  {'w-full': full},
  {'white': white},
  {'warning': warning}
  ]"
  :disabled="disabled"
  @click="$emit('click')">
    <template>
      <slot name="prev-icon"/>
    </template>
    <slot/>
    <template>
      <slot name="next-icon"/>
    </template>
  </button>
</template>
<script>
export default {
  name: 'ButtonDefault',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    medium: {
      type: Boolean,
      default: false
    },
    white: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
button:disabled {
  background: #888;
  color: #B0B0B0;
}
.white {
  background: white;
  border: 1px solid #DBEAFE;
  color: #13093A;
}
.warning {
  background: #DC2626;
}
</style>
