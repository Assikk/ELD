<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_deleteVehicle(false)"/>
    <div class="relative bg-white text-center rounded-md p-6 flex flex-col gap-4 w-[350px]">
      <div>
        <svg class="mx-auto" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="#FEE2E2"/>
          <path d="M24 21V23M24 27H24.01M17.0718 31H30.9282C32.4678 31 33.4301 29.3333 32.6603 28L25.7321 16C24.9623 14.6667 23.0378 14.6667 22.268 16L15.3398 28C14.57 29.3333 15.5322 31 17.0718 31Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h2 class="font-bold text-lg my-3 text-[#1F2937]">
          Delete vehicle
        </h2>
        <p class="text-sm text-[#6B7280]">
          Are you sure you want delete vehicle?
        </p>
      </div>
      <div class="flex gap-3">
        <Button white full @click="show_deleteVehicle(false)">
          No
        </Button>
        <Button warning :disabled="disabledDelete" full @click="deleteVehicle">
          Yes
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapActions} from 'vuex'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'DeletePartnerModal',
  components: {
    Button
  },
  props: {
    activeVehicle: {}
  },
  data() {
    return {
      disabledDelete: false
    }
  },
  methods: {
    ...mapMutations({
      show_deleteVehicle: 'vehicles/SHOW_DELETEVEHICLE',
      loading_alert: 'alert/LOADING_ALERT',

    }),
    ...mapActions({
      delete_vehicle: 'vehicles/delete_vehicle',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert'
    }),
    async deleteVehicle() {
      if(!this.disabledDelete) {
        this.disabledDelete = true
        try {
          this.loading_alert()
          await this.delete_vehicle(this.activeVehicle.id)
          this.success_alert('The vehicle has been successfully deleted')
        } catch(err) {
          const errors = []
          for(let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
          this.error_alert(errors)
          this.disabledDelete = false
        }
      }
    }
  },
}
</script>
