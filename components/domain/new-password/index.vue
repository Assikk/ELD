<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="w-[90%] sm:w-[385px]">
      <h1 class="font-extrabold text-3xl text-[#13093A]">
        Enter new password
      </h1>
      <div class="mt-11 flex flex-col gap-6"
      @keypress.enter="confirm">
        <Password label="New password" id="password" v-model="form.password"
        :error="($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength) || ($v.form.password2.$dirty && !$v.form.password2.sameAsPassword)">
          <template #error>
            <span v-if="$v.form.password.$dirty && !$v.form.password.required">
              Enter your password
            </span>
            <span v-else-if="$v.form.password.$dirty && !$v.form.password.minLength">
              Minimum number of characters - 8
            </span>
            <span v-else-if="$v.form.password2.$dirty && !$v.form.password2.sameAsPassword">
              Passwords don't match
            </span>
          </template>
        </Password>
        <Password label="Repeat new password" id="password2" v-model="form.password2"
        :error="($v.form.password2.$dirty && !$v.form.password2.required) || ($v.form.password2.$dirty && !$v.form.password2.minLength) || ($v.form.password2.$dirty && !$v.form.password2.sameAsPassword)">
          <template #error>
            <span v-if="$v.form.password2.$dirty && !$v.form.password2.required">
              Enter your password
            </span>
            <span v-else-if="$v.form.password2.$dirty && !$v.form.password2.minLength">
              Minimum number of characters - 8
            </span>
            <span v-else-if="$v.form.password2.$dirty && !$v.form.password2.sameAsPassword">
              Passwords don't match
            </span>
          </template>
        </Password>
        <Button :disabled="disabledConfirm" @click="confirm">
          Confirm
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
import Password from '@/components/ui/inputs/password.vue'
import Button from '@/components/ui/buttons/default.vue'
import {required, minLength} from 'vuelidate/lib/validators'
export default {
  name: 'NewPasswordComponent',
  components: {
    Password,
    Button
  },
  data() {
    return {
      form: {
        password: '',
        password2: ''
      },
      disabledConfirm: false,
    }
  },
  validations() {
    return {
      form: {
        password: {required, minLength: minLength(8)},
        password2: {required, minLength: minLength(8), sameAsPassword: value => value == this.form.password}
      }
    }
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      new_password: 'authorization/new_password',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      validate_token: 'authorization/validate_token'
    }),
    async confirm() {
      if(this.$v.$invalid) { /* Проверка валидации */
        this.$v.$touch()
        return
      }
      if(!this.disabledConfirm) {
        this.disabledConfirm = true
        try {
          this.loading_alert()
          await this.new_password({
            password: this.form.password,
            password2: this.form.password2,
            token: this.$route.query.token
          })
          this.success_alert('Please, login again')
        } catch(err) {
          this.disabledConfirm = false
          const errors = []
          for(let key in err.response.data) {
            errors.push(`${err.response.data[key]}`)
          }
          this.error_alert(errors)
          // this.error_alert(err.response.data.non_field_errors ? err.response.data.non_field_errors : err.response.data.password)
        }
      }
    }
  },
  async mounted() {
    await this.validate_token(this.$route.query.token)
  }
}
</script>
