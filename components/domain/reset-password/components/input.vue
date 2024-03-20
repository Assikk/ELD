<template>
  <div class="flex gap-2 bg-[#4F4F4F] px-4 py-[11px] text-lg rounded-[10px]">
    <label :for="id" class="text-white w-[150px] line1">
      {{label}}
    </label>
    <input type="password" :id="id"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="outline-none bg-[transparent]">
  </div>
</template>
<script>
export default {
  name: 'InputComponent',
  props: {
    id: {},
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    value: {}
  }
}
</script>
<style scoped>
.line1 {
  overflow: hidden;
	text-overflow: ellipsis;
  display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

</style>
