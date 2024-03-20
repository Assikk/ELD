<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_addVehicle(false)"/>
    <div class="relative overflow-y-auto bg-white max-h-[90%] h-[90%] w-[90%] md:w-[960px] rounded-md flex flex-col justify-between">
      <div class="px-[52px] pt-[52px] pb-7 h-full">
        <h1 class="text-2xl font-semibold text-[#13093A]">
          Add vehicle
        </h1>
        <div v-if="isLoading" class="flex justify-center items-center h-full">
          <LoadingDots/>
        </div>
        <div v-else>
          <Tabs class="my-6" :list="listTabs" :active="activeTab" @click="clicktab"/>
          <FirstStep :form="information" :validations="$v" v-if="activeTab == 1"/>
          <SecondStep :form="information" v-if="activeTab == 2" @saveFile="getVehicle" @deleteFile="getVehicle"/>
        </div>
      </div>
      <div class="bg-[#B8D5FE] flex gap-4 justify-end py-3 px-6 sticky bottom-0 left-0">
        <Button white medium @click="show_addVehicle(false)">
          Cancel
        </Button>
        <Button :disabled="disabledStep" medium @click="nextStep">
          Save
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators'
import Tabs from '~/components/ui/tabs/full.vue'
import Button from '@/components/ui/buttons/default.vue'
import FirstStep from '../components/steps/first.vue'
import SecondStep from '../components/steps/second.vue'
import ThirdStep from '../components/steps/third.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
export default {
  name: 'AddVehiclesModal',
  components: {
    Tabs,
    Button,
    FirstStep,
    SecondStep,
    ThirdStep,
    LoadingDots
  },
  computed: {
    ...mapState({
      vehicle: state => state.vehicles.vehicle
    })
  },
  data() {
    return {
      listTabs: [
        {
          id: 1,
          name: 'Information'
        },
        {
          id: 2,
          name: 'Documents'
        },
      ],
      activeTab: 1,
      information: {
        id: null,
        brand: '',
        vin: '',
        model: '',
        license_plate_no: '',
        year: '',
        licence_plate_issuing_state: '',
        fuel_type: '',
        eld_device: '',
        annual_inspection_start: null,
        annual_inspection_end: null,
        annual_inspection_files: [],
        registration_start: null,
        registration_end: null,
        registration_files: [],
        other_doc_start: null,
        other_doc_end: null,
        other_document_files: [],
        notes: ''
      },
      isLoading: true,
      disabledStep: false,
      isActiveTabs: false
    }
  },
  validations: {
    information: {
      brand: {required},
      vin: {required, vinCode: (value) => {
        return value && value.length == 17
      }},
      model: {required},
      license_plate_no: {required},
      year: {required},
      licence_plate_issuing_state: {required},
      fuel_type: {required},
      eld_device: {required}
    }
  },
  methods: {
    ...mapMutations({
      show_addVehicle: 'vehicles/SHOW_ADDVEHICLE',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      get_brands: 'brands/get_brands',
      get_models: 'models/get_models',
      get_states: 'states/get_states',
      get_devices: 'device/get_devices',
      create_vehicle: 'vehicles/create_vehicle',
      edit_vehicle: 'vehicles/edit_vehicle',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_vehicle: 'vehicles/get_vehicle'
    }),
    async nextStep() {
      if(this.activeTab == 1) {
        if(this.$v.$invalid) { /* Проверка валидации */
          this.$v.$touch()
          return
        }
      }
      if(!this.disabledStep) {
        this.disabledStep = true
        try {
          this.loading_alert()
          if(this.information.id) {
            await this.edit_vehicle({id: this.information.id, form: this.information})
            this.success_alert('The vehicle has been successfully edited')
          } else {
            await this.create_vehicle(this.information)
            for (let key in this.vehicle) {
              if(this.information.hasOwnProperty(key)) {
                this.information[key] = this.vehicle[key]
              }
            }
            this.success_alert('The vehicle has been successfully created')
            this.isActiveTabs = true
          }
          if(this.activeTab == 1) {
            this.activeTab = 2
          } else this.show_addVehicle(false)
        } catch(err) {
          const errors = []
          for(let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
          this.error_alert(errors)
        }
        this.disabledStep = false
      }
    },
    clicktab(tab) {
      if(this.isActiveTabs) {
        this.activeTab = tab.id
      }
    },
    async getVehicle() {
      await this.get_vehicle(this.information.id)
      const form = structuredClone(this.vehicle)
      for (let key in form) {
        if(this.information.hasOwnProperty(key)) {
          this.information[key] = form[key]
        }
      }
    }
  },
  async mounted() {
    await this.get_brands()
    await this.get_models()
    await this.get_states()
    await this.get_devices()
    this.isLoading = false
  },
}
</script>
