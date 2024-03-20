<template>
  <div class="bg-[#3D3D3D] flex justify-center items-center">
    <div class="w-[577px]">
      <h1 class="font-medium text-[32px] text-center text-white">
        Forgot password?
      </h1>
      <div class="mt-14 mb-[42px] flex flex-col gap-4">
        <Input label="New password" id="newPassword" placeholder="Value" v-model="form.newPassword">
        </Input>
        <Input label="Repeat new password" id="repeatPassword" placeholder="Value" v-model="form.repeatPassword">
        </Input>
      </div>
      <div class="flex items-center">
        <Button class="mx-auto" @click="send">
          Confirm
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import Input from './components/input.vue'
import Button from './components/button.vue'
import {required} from 'vuelidate/lib/validators'
export default {
  name: 'ResetpasswordComponent',
  head: {
    title: 'Reset password ELD'
  },
  components: {
    Input,
    Button
  },
  data() {
    return {
      form: {
        newPassword: '',
        repeatPassword: ''
      }
    }
  },
  validations() {
    return {
      form: {
        newPassword: {required},
        repeatPassword: {required}
      }
    }
  },
  methods: {
    ...mapActions({
      error_alert: 'alert/error_alert',
    }),
    send() {
      if(this.$v.form.$invalid) { /* Проверка валидации */
        this.$v.form.$touch()
        const errors = ['Please fill in the passwords']
        this.error_alert(errors)
        return
      }
      console.log('1');
    }
  }
}
</script>
