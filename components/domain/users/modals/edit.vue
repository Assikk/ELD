<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_editUser(false)"/>
    <div class="relative overflow-y-auto bg-white w-[90%] md:w-[1120px] rounded-md flex flex-col justify-between">
      <div class="px-[52px] pt-[52px] pb-7 h-full">
        <h1 class="text-2xl font-semibold text-[#13093A]">
          Edit User
        </h1>
        <div v-if="isLoading" class="flex justify-center items-center h-[479px] w-[895px]">
          <LoadingDots/>
        </div>
        <div v-else class="mt-6 scrollbar overflow-y-auto h-[455px] flex flex-col gap-4 pr-2">
          <div class="flex flex-col gap-4 mb-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p class="title">
                First name
              </p>
              <Input placeholder="White first name">
              </Input>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p class="title">
                Last name
              </p>
              <Input placeholder="White last name">
              </Input>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p class="title">
                ID
              </p>
              <Input placeholder="White ID">
              </Input>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p class="title">
                Email
              </p>
              <Input placeholder="White email">
              </Input>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p class="title">
                Phone number
              </p>
              <Input placeholder="White phone number">
              </Input>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p class="title">
                Password
              </p>
              <Password placeholder="Password" id="password" v-model="form.password">
              </Password>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p class="title">
                Confirm password
              </p>
              <Password placeholder="Password" id="confirmPassword" v-model="form.password2">
              </Password>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#B8D5FE] flex gap-4 justify-end py-3 px-6 sticky bottom-0 left-0">
        <Button white medium @click="show_editUser(false)">
          Cancel
        </Button>
        <Button medium @click="save">
          Save
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import Button from '@/components/ui/buttons/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Input from '@/components/ui/inputs/default.vue'
import Password from '@/components/ui/inputs/password.vue'
export default {
  name: 'EditDriverModal',
  components: {
    Button,
    LoadingDots,
    Input,
    Password
  },
  props: {
    activeUser: {}
  },
  data() {
    return {
      isLoading: true,
      form: {
        password: '',
        password2: ''
      }
    }
  },
  methods: {
    ...mapMutations({
      show_editUser: 'users/SHOW_EDITUSER'
    }),
    async save() {
      console.log('1');
    },
  },
  async mounted() {
    this.isLoading = false
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
