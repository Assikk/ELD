<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_addMaintenance(false)"/>
    <div class="relative overflow-y-auto bg-white w-[90%] md:w-[1120px] rounded-md flex flex-col justify-between">
      <div class="px-[52px] pt-[52px] pb-7 h-full">
        <h1 class="text-2xl font-semibold text-[#13093A]">
          Add Maintenance
        </h1>
        <div v-if="isLoading" class="flex justify-center items-center h-[479px] w-[895px]">
          <LoadingDots/>
        </div>
        <div v-else class="mt-6 scrollbar overflow-y-auto h-[455px] flex flex-col gap-4 pr-2">
          <div class="flex flex-col gap-4 mb-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p class="title">
                Vehicle
              </p>
              <Select placeholder="Choose vehicle"
              :list="vehicles"
              textList="id"
              valueList="id"
              :activeId="form.vehicle"
              @click="(item) => form.vehicle = item.id">

              </Select>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p class="title">
                Service name
              </p>
              <Select placeholder="Write service name"
              :list="vehicles"
              textList="id"
              valueList="id"
              :activeId="form.vehicle"
              @click="(item) => form.vehicle = item.id">

              </Select>
            </div>
          </div>
          <TextArea label="Notes" v-model="form.notes"/>
        </div>
      </div>
      <div class="bg-[#B8D5FE] flex gap-4 justify-end py-3 px-6 sticky bottom-0 left-0">
        <Button white medium @click="show_addMaintenance(false)">
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
import {mapState, mapMutations, mapActions} from 'vuex'
import Button from '@/components/ui/buttons/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Select from '@/components/ui/selects/default.vue'
import TextArea from '@/components/ui/textarea.vue'
export default {
  name: 'AddDriverModal',
  components: {
    Button,
    LoadingDots,
    Select,
    TextArea
  },
  computed: {
    ...mapState({
      vehicles: state => state.vehicles.vehicles
    })
  },
  data() {
    return {
      isLoading: true,
      form: {
        vehicle: '',
        notes: ''
      }
    }
  },
  methods: {
    ...mapMutations({
      show_addMaintenance: 'maintenance/SHOW_ADDMAINTENANCE'
    }),
    ...mapActions({
      get_vehicles: 'vehicles/get_vehicles'
    }),
    async save() {
      console.log('1');
    },
  },
  async mounted() {
    await this.get_vehicles()
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
