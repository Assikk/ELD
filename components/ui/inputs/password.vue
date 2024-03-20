<template>
  <div class="flex flex-col text-[#13093A] text-sm font-medium">
    <label :for="id"
    :class="[
      {'mb-1': label},
      {'text-[#EF4444]': error}
    ]">
      {{label}}
    </label>
    <div class="relative border border-[#DBEAFE] rounded-md py-2.5 px-3.5"
    :class="[
      {'border-[#FCA5A5]': error}
    ]">
      <input :id="id" :type="type"
      class="w-full outline-none"
      :value="value"
      @input="$emit('input', $event.target.value)">
      <svg v-if="type == 'password'" class="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer" width="24" height="24" fill="none" stroke="#DBEAFE"
      @click="type = 'text'">
        <use xlink:href="#open-eye"/>
      </svg>
      <svg v-else class="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer" width="24" height="24" fill="none" stroke="#DBEAFE"
      @click="type = 'password'">
        <use xlink:href="#close-eye"/>
      </svg>
    </div>
    <p class="text-xs font-medium text-[#EF4444]"
    :class="[
      {'mt-1': error}
    ]">
      <slot name="error"/>
    </p>
  </div>
</template>
<script>
export default {
  name: 'PasswordInput',
  props: {
    label: {
      type: String
    },
    id: {
      type: String
    },
    value: {},
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: 'password'
    }
  }
}
</script>
