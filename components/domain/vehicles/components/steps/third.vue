<template>
  <div>
    <Table :head="head" :isLoading="false" small class="overflow-x-auto">
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
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Table from '@/components/ui/table.vue'
export default {
  name: 'ThirdStep',
  components: {
    Table
  },
  computed: {
    ...mapState({
      vehicle: state => state.vehicles.vehicle,
      history: state => state.vehicles.history
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
    await this.get_history(this.vehicle.id)
  }
}
</script>
