<template>
  <div class="overflow-y-auto max-h-[510px] flex flex-col gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Makes
      </p>
      <Select placeholder="Choose Make"
      :list="brands"
      textList="name"
      valueList="id"
      :activeId="form.brand"
      :error="validations.information.brand.$dirty && !validations.information.brand.required"
      @click="(item) => form.brand = item.id">
        <template #error>
          <span v-if="validations.information.brand.$dirty && !validations.information.brand.required">
            Choose Make
          </span>
        </template>
      </Select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        VIN
      </p>
      <Input uppercase placeholder="Write VIN" v-model="form.vin"
      :error="validations.information.vin.$dirty && !validations.information.vin.required">
        <template #error>
          <span v-if="validations.information.vin.$dirty && !validations.information.vin.required">
            Write VIN
          </span>
          <span v-else-if="validations.information.vin.$dirty && !validations.information.vin.vinCode">
            There must be 17 characters
          </span>
        </template>
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Models
      </p>
      <Select
      placeholder="Choose model"
      :list="models"
      textList="name"
      valueList="id"
      :activeId="form.model"
      :error="validations.information.model.$dirty && !validations.information.model.required"
      @click="(item) => form.model = item.id">
        <template #error>
          <span v-if="validations.information.model.$dirty && !validations.information.model.required">
            Choose model
          </span>
        </template>
      </Select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        License Plate No
      </p>
      <Input placeholder="Write license plate no" v-model="form.license_plate_no"
      :error="validations.information.license_plate_no.$dirty && !validations.information.license_plate_no.required">
        <template #error>
          <span v-if="validations.information.license_plate_no.$dirty && !validations.information.license_plate_no.required">
            Write license plate no
          </span>
        </template>
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Year
      </p>
      <Select placeholder="Choose year"
      :list="years"
      textList="name"
      valueList="value"
      :activeId="form.year"
      :error="validations.information.year.$dirty && !validations.information.year.required"
      @click="(item) => form.year = item.value">
        <template #error>
          <span v-if="validations.information.year.$dirty && !validations.information.year.required">
            Choose year
          </span>
        </template>
      </Select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        License Plate Issuing State
      </p>
      <Select placeholder="Choose license plate issuing S=state"
      :list="states"
      textList="name"
      valueList="id"
      :activeId="form.licence_plate_issuing_state"
      :error="validations.information.licence_plate_issuing_state.$dirty && !validations.information.licence_plate_issuing_state.required"
      @click="(item) => form.licence_plate_issuing_state = item.id">
        <template #error>
          <span v-if="validations.information.licence_plate_issuing_state.$dirty && !validations.information.licence_plate_issuing_state.required">
            Choose license plate issuing S=state
          </span>
        </template>
      </Select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Fuel Type
      </p>
      <Select placeholder="Choose fuel type"
      :list="fuel"
      textList="name"
      valueList="value"
      :activeId="form.fuel_type"
      :error="validations.information.fuel_type.$dirty && !validations.information.fuel_type.required"
      @click="(item) => form.fuel_type = item.value">
        <template #error>
          <span v-if="validations.information.fuel_type.$dirty && !validations.information.fuel_type.required">
            Choose fuel type
          </span>
        </template>
      </Select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Eld Device
      </p>
      <Select placeholder="Choose eld device"
      :list="devices"
      textList="name"
      valueList="id"
      :activeId="form.eld_device"
      :error="validations.information.eld_device.$dirty && !validations.information.eld_device.required"
      @click="(item) => form.eld_device = item.id">
        <template #error>
          <span v-if="validations.information.eld_device.$dirty && !validations.information.eld_device.required">
            Choose eld device
          </span>
        </template>
      </Select>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Input from '@/components/ui/inputs/default.vue'
import Select from '@/components/ui/selects/default.vue'
export default {
  name: 'FirstStep',
  components: {
    Input,
    Select
  },
  props: {
    form: {},
    validations: {}
  },
  computed: {
    ...mapState({
      brands: state => state.brands.brands,
      models: state => state.models.models,
      years: state => state.years.years,
      states: state => state.states.states,
      fuel: state => state.fuel.list,
      devices: state => state.device.devices,
    })
  },
  data() {
    return {
      listMakes: [
        {
          id: 1,
          name: 'Peterbilt',
        },
        {
          id: 2,
          name: 'Ram',
        },
        {
          id: 3,
          name: 'Ford',
        },
        {
          id: 4,
          name: 'Volvo',
        },
        {
          id: 5,
          name: 'mack',
        },
        {
          id: 6,
          name: 'Hino',
        },
        {
          id: 7,
          name: 'Chevrolet',
        },
        {
          id: 8,
          name: 'Mack',
        },
      ],
    }
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
