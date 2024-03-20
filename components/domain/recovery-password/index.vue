<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="w-[90%] sm:w-[385px] text-[#13093A]">
      <div>
        <h1 class="mb-3 font-extrabold text-3xl">
          Forgot your password?
        </h1>
        <p class="text-sm font-medium">
          Please enter the email you us to sign in to system
        </p>
      </div>
      <div class="mt-11 flex flex-col"
      @keypress.enter="send">
        <Input label="Email address" id="email" v-model="email"
        :error="($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)">
          <template #error>
            <span v-if="$v.email.$dirty && !$v.email.required">
              Enter your email
            </span>
            <span v-else-if="$v.email.$dirty && !$v.email.email">
              Incorrect mail
            </span>
          </template>
        </Input>
        <Button class="mt-6 mb-4" @click="send" :disabled="disabledSend">
          Send
        </Button>
        <NuxtLink to="/login" class="text-sm font-medium">
          Back to Sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapActions} from 'vuex'
import Input from '@/components/ui/inputs/default.vue'
import Button from '@/components/ui/buttons/default.vue'
import {required, email} from 'vuelidate/lib/validators'
export default {
  name: 'RecoveryPasswordComponent',
  components: {
    Input,
    Button
  },
  data() {
    return {
      email: '',
      disabledSend: false,
    }
  },
  validations: {
    email: {required, email}
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      reset_password: 'authorization/reset_password',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert'
    }),
    async send() {
      if(this.$v.$invalid) { /* Проверка валидации */
        this.$v.$touch()
        return
      }
      if(!this.disabledSend) {
        this.disabledSend = true
        try {
          this.loading_alert()
          await this.reset_password({
            email: this.email
          })
          this.success_alert('Please select a new password')
        } catch(err) {
          this.disabledSend = false
          this.error_alert(err.response.data.email)
        }
      }
    }
  }
}
</script>
