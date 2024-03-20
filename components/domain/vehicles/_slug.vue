<template>
  <div>
    <Header/>
    <div class="px-16">
      <div class="py-3 mb-6 flex gap-4 items-center text-[#677593] text-sm">
        <NuxtLink to="/vehicles" class="font-medium">
          Vehicles
        </NuxtLink>
        <svg width="20" height="20" fill="#8B9AB6" class="rotate-180">
          <use xlink:href="#arrow"/>
        </svg>
        <p>
          History
        </p>
      </div>
      <Table :head="head" :isLoading="isLoading" small>
        <template #body>
          <tr v-for="item in history" :key="item.id">
            <td>
              <span>
                {{item.vin}}
              </span>
            </td>
            <td>
              <span>
                {{item.brand.name}}
              </span>
            </td>
            <td>
              <span>
                {{item.model.name}}
              </span>
            </td>
            <td>
              <span>
                {{item.license_plate_no}}
              </span>
            </td>
            <td>
              <span>
                {{item.year}}
              </span>
            </td>
            <td>
              <span>
                {{item.licence_plate_issuing_state.name}}
              </span>
            </td>
            <td>
              <span>
                {{item.fuel_type}}
              </span>
            </td>
            <td>
              <span>
                {{item.eld_device.name}}
              </span>
            </td>
            <td>
              <span>
                {{item.created_at}}
              </span>
            </td>
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import Header from '~/components/ui/header/index.vue'
import {mapState, mapActions} from 'vuex'
import Table from '@/components/ui/table.vue'
export default {
  name: 'HistoryVehicleComponent',
  components: {
    Header,
    Table
  },
  computed: {
    ...mapState({
      history: state => state.vehicles.history,
      isLoading: state => state.vehicles.isLoading
    })
  },
  data() {
    return {
      head: [
        {
          id: 1,
          name: 'VIN'
        },
        {
          id: 2,
          name: 'Makes'
        },
        {
          id: 3,
          name: 'Models'
        },
        {
          id: 4,
          name: 'License Plate No'
        },
        {
          id: 5,
          name: 'Year'
        },
        {
          id: 6,
          name: 'License Plate Issuing State'
        },
        {
          id: 7,
          name: 'Fuel Type'
        },
        {
          id: 8,
          name: 'Eld Device'
        },
        {
          id: 9,
          name: 'Created at'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      get_history: 'vehicles/get_history'
    })
  },
  async mounted() {
    await this.get_history(this.$route.params.slug)
  }
}
</script>
