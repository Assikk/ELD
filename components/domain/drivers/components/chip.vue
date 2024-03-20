<template>
  <div class="w-fit px-3 py-2 border border-[#1E40AF] rounded-[32px] text-sm text-[#1E40AF] flex items-center gap-1.5 cursor-pointer"
  :class="value ? 'bg-[#F1FAFF]' : ''"
  @click="$emit('click')">
    <slot/>
    <svg v-if="value" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99961 14.3996C11.5342 14.3996 14.3996 11.5342 14.3996 7.99961C14.3996 4.46499 11.5342 1.59961 7.99961 1.59961C4.46499 1.59961 1.59961 4.46499 1.59961 7.99961C1.59961 11.5342 4.46499 14.3996 7.99961 14.3996ZM10.9653 6.96529C11.2777 6.65288 11.2777 6.14634 10.9653 5.83392C10.6529 5.5215 10.1463 5.5215 9.83392 5.83392L7.19961 8.46824L6.16529 7.43392C5.85287 7.1215 5.34634 7.1215 5.03392 7.43392C4.7215 7.74634 4.7215 8.25287 5.03392 8.56529L6.63392 10.1653C6.94634 10.4777 7.45287 10.4777 7.76529 10.1653L10.9653 6.96529Z" fill="#1E40AF"/>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'ChipComponent',
  props: {
    value: {}
  }
}
</script>
