<template>
  <div class="flex flex-col text-[#13093A] text-sm font-medium">
    <label :for="id"
    :class="[
      {'mb-1': label},
      {'text-[#EF4444]': error}
    ]">
      {{label}}
    </label>
    <input :id="id" :type="type"
    class="border border-[#DBEAFE] rounded-md py-2.5 px-3.5 outline-none"
    :class="[
      {'border-[#FCA5A5]': error}
    ]"
    :value="value"
    @input="handle($event)"
    :placeholder="placeholder">
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
  name: 'DefaultInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
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
    },
    placeholder: {
      type: String
    },
    uppercase: {
      type: Boolean,
      deafult: false
    }
  },
  methods: {
    handle(event) {
      if(this.uppercase) {
        event.target.value = event.target.value.toUpperCase()
      }
      this.$emit('input', event.target.value)
    }
  }
}
</script>
