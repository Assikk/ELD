<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="w-[90%] sm:w-[385px]">
      <svg class="mx-auto" width="242" height="29">
        <use xlink:href="#logo-green"/>
      </svg>
      <h1 class="font-bold text-3xl text-[#13093A] mt-12 mb-14">
        Sign in to your account
      </h1>
      <div class="flex flex-col gap-6"
      @keypress.enter="auth">
        <Input label="Email address" id="email" v-model="form.email"
        :error="($v.form.email.$dirty && !$v.form.email.required) || ($v.form.email.$dirty && !$v.form.email.email)">
        <template #error>
          <span v-if="$v.form.email.$dirty && !$v.form.email.required">
            Enter your email
          </span>
          <span v-else-if="$v.form.email.$dirty && !$v.form.email.email">
            Incorrect mail
          </span>
        </template>
        </Input>
        <Password label="Password" id="password" v-model="form.password"
        :error="($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength)">
          <template #error>
          <span v-if="$v.form.password.$dirty && !$v.form.password.required">
            Enter your password
          </span>
          <span v-else-if="$v.form.password.$dirty && !$v.form.password.minLength">
            Minimum number of characters - 8
          </span>
        </template>
        </Password>
        <NuxtLink class="text-right text-sm font-medium text-[#13093A]" to="/recovery-password">
          Forgot your password?
        </NuxtLink>
        <Button @click="auth" :disabled="disabledSign">
          Sign in
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapActions} from 'vuex'
import {required, email, minLength} from 'vuelidate/lib/validators'
import Input from '@/components/ui/inputs/default.vue'
import Password from '@/components/ui/inputs/password.vue'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'LoginComponent',
  head: {
    title: 'Sign in'
  },
  components: {
    Input,
    Password,
    Button
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      disabledSign: false,
    }
  },
  validations: {
    form: {
      email: {required, email},
      password: {required, minLength: minLength(8)}
    }
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert'
    }),
    async auth() {
      if(this.$v.$invalid) { /* Проверка валидации */
        this.$v.$touch()
        return
      }
      if(!this.disabledSign) {
        this.disabledSign = true
      }
      try {
        this.loading_alert()
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        this.success_alert('The login was completed successfully')
        // this.$router.push('/')
      } catch(err) {
        console.log(err);
        this.disabledSign = false
        this.error_alert(err.response.data.non_field_errors)
      }
    }
  }
}
</script>
