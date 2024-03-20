<template>
  <div>
    <Header/>
    <div class="px-16">
      <div class="py-3 mb-6 flex gap-4 items-center text-[#677593] text-sm">
        <NuxtLink to="/drivers" class="font-medium">
          Drivers
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
                {{item.user.first_name}}
              </span>
            </td>
            <td>
              <span>
                {{item.user.last_name}}
              </span>
            </td>
            <td>
              <span>
                {{item.user.email}}
              </span>
            </td>
            <td>
              <span>
                {{item.user.phone}}
              </span>
            </td>
            <td>
              <span>
                {{item.vehicle ? item.vehicle.id : item.vehicle}}
              </span>
            </td>
            <td>
              <span>
                {{item.license_no}}
              </span>
            </td>
            <td>
              <span>
                {{item.license_issuing_state.name}}
              </span>
            </td>
            <td>
              <span>
                {{item.home_terminal_address}}
              </span>
            </td>
            <td>
              <span>
                {{item.co_driver ? `${item.co_driver.first_name} ${item.co_driver.last_name}` : item.co_driver}}
              </span>
            </td>
            <td>
              <span>
                {{item.history_date}}
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
      history: state => state.drivers.history,
      isLoading: state => state.drivers.isLoading
    })
  },
  data() {
    return {
      head: [
        {
          id: 1,
          name: 'First name'
        },
        {
          id: 2,
          name: 'Last name'
        },
        {
          id: 3,
          name: 'Email'
        },
        {
          id: 4,
          name: 'Phone Number'
        },
        {
          id: 5,
          name: 'Vehicle'
        },
        {
          id: 6,
          name: "Driver's License No"
        },
        {
          id: 7,
          name: "Driver's License Issuing State"
        },
        {
          id: 8,
          name: 'Home Terminal Address'
        },
        {
          id: 9,
          name: 'Co-driver'
        },
        {
          id: 10,
          name: 'Created at'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      get_history: 'drivers/get_history'
    })
  },
  async mounted() {
    await this.get_history(this.$route.params.slug)
  }
}
</script>
