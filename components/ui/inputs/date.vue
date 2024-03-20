<template>
    <div class="flex flex-col text-[#13093A] text-sm font-medium">
        <label :for="id"
        :class="[
          {'mb-1': label},
          {'text-[#EF4444]': error}
        ]">
          {{ label }}
        </label>
        <div class="border border-[#DBEAFE] px-3.5 py-2.5 rounded-md flex justify-between gap-2 items-center"
        :class="[
          {'border-[#FCA5A5]': error}
        ]">
          <input :id="id" type="date"
          class="w-full focus:outline-none"
          v-model="date"
          :placeholder="placeholder">
          <div>
            <!-- <svg width="20" height="20" fill="none" stroke="#677593">
              <use xlink:href="#calendar"/>
            </svg> -->
          </div>
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
    id: {},
    label: {
      type: String
    },
    value: '',
    error: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    }
  },
  computed: {
    date: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('updateDate', value)
      }
    }
  }
}
</script>
