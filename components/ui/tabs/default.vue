<template>
  <div class="flex">
    <div v-for="item in list" :key="item.id" class="min-w-[137px] text-center pb-4 border-b text-sm font-medium cursor-pointer"
    :class="active == item[valueList] ? 'border-[#1E40AF] text-[#1E40AF]' : 'border-[#DBEAFE] text-[#677593]'"
    @click="$emit('click', item)">
      {{item[textList]}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabsComponent',
  props: {
    active: {},
    list: {
      type: Array
    },
    textList: {},
    valueList: {
    }
  },
}
</script>
