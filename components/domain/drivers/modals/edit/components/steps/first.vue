<template>
  <div class="scrollbar overflow-y-auto h-[580px] flex flex-col gap-4 pr-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        First Name
      </p>
      <Input placeholder="Write name" v-model="form.first_name"
      :error="(v.form.first_name.$dirty && !v.form.first_name.required) || (v.form.first_name.$dirty && !v.form.first_name.alpha)">
      <template #error>
          <span v-if="v.form.first_name.$dirty && !v.form.first_name.required">
            Write name
          </span>
          <span v-else-if="v.form.first_name.$dirty && !v.form.first_name.alpha">
            Write only letters
          </span>
        </template>
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Last Name
      </p>
      <Input placeholder="Write last name" v-model="form.last_name"
      :error="(v.form.last_name.$dirty && !v.form.last_name.required) || (v.form.last_name.$dirty && !v.form.last_name.alpha)">
        <template #error>
          <span v-if="v.form.last_name.$dirty && !v.form.last_name.required">
            Write last name
          </span>
          <span v-else-if="v.form.last_name.$dirty && !v.form.last_name.alpha">
            Write last name
          </span>
        </template>
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Email
      </p>
      <Input placeholder="Write email" v-model="form.email"
      :error="(v.form.email.$dirty && !v.form.email.required) || (v.form.email.$dirty && !v.form.email.email)">
        <template #error>
          <span v-if="v.form.email.$dirty && !v.form.email.required">
            Write email
          </span>
          <span v-else-if="v.form.email.$dirty && !v.form.email.email">
            Write correct email
          </span>
        </template>
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Phone number
      </p>
      <Input placeholder="Whrite phone number" v-model="form.phone"
      :error="(v.form.phone.$dirty && !v.form.phone.required) || (v.form.phone.$dirty && !v.form.phone.numeric)">
        <template #error>
          <span v-if="v.form.phone.$dirty && !v.form.phone.required">
            Write phone number
          </span>
          <span v-else-if="v.form.phone.$dirty && !v.form.phone.numeric">
            Write correct phone number
          </span>
        </template>
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        New password
      </p>
      <Password placeholder="Password" id="newPassword" v-model="form.password"
      :error="(v.form.password.$dirty && !v.form.password.minLength) || (v.form.password.$dirty && !v.form.password.requiredIfPassword)">
        <template #error>
          <span v-if="v.form.password.$dirty && !v.form.password.minLength">
            Minimum number of characters - 8
          </span>
          <span v-else-if="v.form.password.$dirty && !v.form.password.requiredIfPassword">
            Write password
          </span>
        </template>
      </Password>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Confirm password
      </p>
      <Password placeholder="Password" id="confirmPassword" v-model="form.password2"
      :error="(v.form.password2.$dirty && !v.form.password2.minLength) || (v.form.password2.$dirty && !v.form.password2.requiredIfPassword2)">
        <template #error>
          <span v-if="v.form.password2.$dirty && !v.form.password2.minLength">
            Minimum number of characters - 8
          </span>
          <span v-else-if="v.form.password2.$dirty && !v.form.password2.requiredIfPassword2">
            Confirm password
          </span>
        </template>
      </Password>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Vehicle ID
      </p>
      <Select placeholder="Choose vehicle id"
      :list="vehicles"
      textList="id"
      valueList="id"
      :activeId="form.vehicle"
      @click="(item) => form.vehicle = item.id">
      </Select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Driver's License No
      </p>
      <Input placeholder="Write driver's license no" v-model="form.license_no"
      :error="v.form.license_no.$dirty && !v.form.license_no.required">
        <template #error>
          <span v-if="v.form.license_no.$dirty && !v.form.license_no.required">
            Write driver's license no
          </span>
        </template>
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Driver's License Issuing State
      </p>
      <Select placeholder="Choose driver's license issuing state"
      :list="states"
      textList="name"
      valueList="id"
      :activeId="form.license_issuing_state"
      @click="(item) => form.license_issuing_state = item.id">
      </Select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Home Terminal Address
      </p>
      <Input placeholder="Write home terminal address" v-model="form.home_terminal_address"
      :error="v.form.home_terminal_address.$dirty && !v.form.home_terminal_address.required">
        <template #error>
          <span v-if="v.form.home_terminal_address.$dirty && !v.form.home_terminal_address.required">
            Write home terminal address
          </span>
        </template>
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Co-driver
      </p>
      <Select placeholder="Choose co-driver"
      :list="driversWithoutCodriver"
      textList="user_full_name"
      valueList="id"
      :activeId="form.co_driver"
      @click="(item) => form.co_driver = item.id">
      </Select>
    </div>
    <div class="flex gap-4">
      <Chip :value="form.personal_conv" @click="form.personal_conv = !form.personal_conv">
        Allow Personal Conveyance
      </Chip>
      <Chip :value="form.yard_move" @click="form.yard_move = !form.yard_move">
        Allow Yard Move
      </Chip>
      <Chip :value="form.ssb" @click="form.ssb = !form.ssb">
        Enable SSB
      </Chip>
      <Chip :value="form.shorthaul" @click="form.shorthaul = !form.shorthaul">
        Enable ShortHaul
      </Chip>
      <Chip :value="form.adv_driving_conds" @click="form.adv_driving_conds = !form.adv_driving_conds">
        Adverse Driving Conditions
      </Chip>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import Input from '@/components/ui/inputs/default.vue'
import Password from '@/components/ui/inputs/password.vue'
import Select from '@/components/ui/selects/default.vue'
import Chip from '../../../../components/chip.vue'
export default {
  name: 'FirstStep',
  components: {
    Input,
    Password,
    Select,
    Chip,
  },
  computed: {
    ...mapState({
      states: state => state.states.states,
      vehicles: state => state.vehicles.vehicles
    }),
    ...mapGetters({
      driversWithoutCodriver: 'drivers/driversWithoutCodriver'
    })
  },
  props: {
    form: {},
    v: {}
  },
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
