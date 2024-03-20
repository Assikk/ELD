<template>
  <div class="scrollbar overflow-y-auto h-[580px] flex flex-col gap-4 pr-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        New Password
      </p>
      <Password placeholder="Password" id="newPassword" v-model="form.password">
      </Password>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Confirm Password
      </p>
      <Password placeholder="Password" id="confirmPassword" v-model="form.password2">
      </Password>
    </div>
  </div>
</template>
<script>
import Password from '@/components/ui/inputs/password.vue'
export default {
  name: 'FirstStep',
  components: {
    Password
  },
  data() {
    return {
      form: {
        password: '',
        password2: ''
      },
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #13093A;
}
</style>
