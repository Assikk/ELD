<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_addDriver(false)"/>
    <div class="relative overflow-y-auto bg-white max-h-[90%] h-[90%] w-[90%] md:w-[1120px] rounded-md flex flex-col justify-between">
      <div class="px-[52px] pt-[52px] pb-7 h-full">
        <h1 class="text-2xl font-semibold text-[#13093A]">
          Add driver
        </h1>
        <div v-if="isLoading" class="flex justify-center items-center h-full w-[895px]">
          <LoadingDots/>
        </div>
        <div v-else>
          <Tabs class="my-6" :list="listTabs" :active="activeTab" @click="clicktab"/>
          <FirstStep v-if="activeTab == 1" :form="form" :v="$v"/>
          <SecondStep v-if="activeTab == 2" :form="form" @saveFile="getDriver" @deleteFile="getDriver"/>
        </div>
      </div>
      <div class="bg-[#B8D5FE] flex gap-4 justify-end py-3 px-6 sticky bottom-0 left-0">
        <Button white medium @click="show_addDriver(false)">
          Cancel
        </Button>
        <Button medium :disabled="disabledStep" @click="nextStep">
          Save
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Button from '@/components/ui/buttons/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Tabs from '~/components/ui/tabs/full.vue'
import FirstStep from './components/steps/first.vue'
import SecondStep from './components/steps/second.vue'
import {required, requiredIf, alpha, email, minLength, numeric} from 'vuelidate/lib/validators'
export default {
  name: 'AddDriverModal',
  components: {
    Button,
    LoadingDots,
    Tabs,
    FirstStep,
    SecondStep,
  },
  computed: {
    ...mapState({
      driver: state => state.drivers.driver
    })
  },
  data() {
    return {
      isLoading: true,
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
      disabledStep: false,
      isActiveTabs: false,
      form: {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password2: '',
        vehicle: '',
        license_no: '',
        license_issuing_state: '',
        home_terminal_address: '',
        co_driver: '',
        personal_conv: false,
        yard_move: false,
        ssb: false,
        shorthaul: false,
        adv_driving_conds: false,
        mvr_start: null,
        mvr_end: null,
        mvr_files: [],
        cdl_start: null,
        cdl_end: null,
        cdl_files: [],
        ssn_card_start: null,
        ssn_card_end: null,
        ssn_card_files: [],
        drug_test_start: null,
        drug_test_end: null,
        drug_test_files: [],
        application_start: null,
        application_end: null,
        application_files: [],
        medical_card_start: null,
        medical_card_end: null,
        medical_card_files: [],
        employment_verification_start: null,
        employment_verification_end: null,
        employment_verification_files: [],
        other_doc_start: null,
        other_doc_end: null,
        other_document_files: []
      }
    }
  },
  validations() {
    return {
      form: {
        first_name: {required, alpha},
        last_name: {required, alpha},
        email: {required, email},
        phone: {required, numeric},
        password: {requiredIfPassword: requiredIf(() => {
          return !this.isActiveTabs
        }),
        minLength: minLength(8)},
        password2: {requiredIfPassword2: requiredIf(() => {
          return !this.isActiveTabs
        }),
        minLength: minLength(8)},
        license_no: {required},
        license_issuing_state: {required},
        home_terminal_address: {required}
      }
    }
  },
  methods: {
    ...mapMutations({
      show_addDriver: 'drivers/SHOW_ADDDRIVER',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      get_vehicles: 'vehicles/get_vehicles',
      get_states: 'states/get_states',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      create_driver: 'drivers/create_driver',
      change_driver: 'drivers/change_driver',
      get_driver: 'drivers/get_driver'
    }),
    async nextStep() {
      if(this.activeTab == 1) {
        if(this.$v.form.$invalid) { /* Проверка валидации */
          this.$v.form.$touch()
          return
        }
        if(!this.disabledStep) {
          this.disabledStep = true
          this.loading_alert()
          try {
            if(!this.isActiveTabs) {
              await this.create_driver(this.form)
              this.success_alert('The driver has been successfully created')
              for (let key in this.driver) {
                if(this.form.hasOwnProperty(key)) {
                  this.form[key] = this.driver[key]
                }
              }
              this.isActiveTabs = true
            } else {
              await this.change_driver({id: this.form.id, form: this.form})
              this.success_alert('The driver has been successfully edited')
            }
            this.activeTab = 2
          } catch(err) {
            const errors = []
            for(let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key][0]}`)
            }
            this.error_alert(errors)
          }
          this.disabledStep = false
        }

      } else {
        await this.change_driver({id: this.form.id, form: this.form})
        this.success_alert('The driver has been successfully edited')
        this.show_addDriver(false)
      }
    },
    clicktab(tab) {
      if(this.isActiveTabs) {
        this.activeTab = tab.id
      }
    },
    async getDriver() {
      await this.get_driver(this.form.id)
      const newForm = structuredClone(this.driver)
      for (let key in newForm) {
        if(this.form.hasOwnProperty(key)) {
          this.form[key] = newForm[key]
        }
      }
      this.form.vehicle = this.form.vehicle.id
      if(this.form.co_driver) {
        this.form.co_driver = this.form.co_driver.id
      }
      this.form.first_name = newForm.user.first_name
      this.form.last_name = newForm.user.last_name
      this.form.email = newForm.user.email
      this.form.phone = newForm.user.phone
    },
  },
  async mounted() {
    await this.get_vehicles()
    await this.get_states()
    this.isLoading = false
  }
}
</script>
