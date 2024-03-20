<template>
  <button class="bg-[#385CD3] rounded-[40px] w-[467px] py-5 text-center text-white font-medium text-xl"
  @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent'
}
</script>
