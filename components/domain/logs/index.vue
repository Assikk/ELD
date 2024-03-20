<template>
  <div>
    <Header/>
    <div class="py-6 px-16">
      <Table :head="logsHead" :isLoading="isLoading" :count="count" :list="logs" @changePage="changePage">
        <template #body>
          <tr v-for="log in logs" :key="log.id"
          class="transition ease-linear hover:bg-[#F1FAFF] cursor-pointer"
          @click="$router.push(`/logs/${log.trip.id}`)">
            <td>
              <span>
                {{log.trip.driver.user.first_name}} {{log.trip.driver.user.last_name}}
              </span>
            </td>
            <td>
              <span>
                {{log.trip.trailer_code}}
              </span>
            </td>
            <td>
              <span class="py-0.5 px-[13.5px] rounded-[10px] text-xs font-medium"
              :class="log.status == 'SB' ? 'bg-[#FEF3C7] text-[#92400E]' : log.status == 'ON' ? 'bg-[#DBEAFE] text-[#1E40AF]' : log.status == 'OFF' ? 'bg-[#F3F4F6] text-[#1F2937]' : 'bg-[#D1FAE5] text-[#065F46]'">
                {{log.status}}
              </span>
            </td>
            <td>
              <span>
                {{log.last_known_location.address}}
              </span>
            </td>
            <td>
              <span class="text-xs font-medium py-0.5 px-2.5 rounded-[10px] bg-[#D1FAE5] text-[#065F46]">
                {{log.warnings_violations}}
              </span>
            </td>
            <td>
              <span class="text-[#F07F1C]">
                {{log.break}}
              </span>
            </td>
            <td>
              <span class="text-[#059669]">
                {{log.drive}}
              </span>
            </td>
            <td>
              <span class="text-[#275DE7]">
                {{log.shift}}
              </span>
            </td>
            <td>
              <span class="text-[#C30707]">
                {{log.cycle}}
              </span>
            </td>
            <td>
              <span>
                {{log.recap}}
              </span>
            </td>
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Header from '~/components/ui/header/index.vue'
import Table from '@/components/ui/table.vue'
export default {
  name: 'LogsComponent',
  head: {
    title: 'Logs'
  },
  components: {
    Header,
    Table
  },
  computed: {
    ...mapState({
      logs: state => state.logs.logs,
      isLoading: state => state.logs.isLoading,
      count: state => state.logs.count
    })
  },
  data() {
    return {
      logsHead: [
        {
          id: 1,
          name: 'Driver'
        },
        {
          id: 2,
          name: 'Truck no'
        },
        {
          id: 3,
          name: 'Status'
        },
        {
          id: 4,
          name: 'Last known location'
        },
        {
          id: 5,
          name: 'Warning & Violations'
        },
        {
          id: 6,
          name: 'Break',
          color: '#F07F1C'
        },
        {
          id: 7,
          name: 'Drive',
          color: '#059669'
        },
        {
          id: 8,
          name: 'Shift',
          color: '#275DE7'
        },
        {
          id: 9,
          name: 'Cycle',
          color: '#C30707'
        },
        {
          id: 10,
          name: 'Recap'
        }
      ],
      activePage: 1
    }
  },
  methods: {
    ...mapActions({
      get_logs: 'logs/get_logs'
    }),
    async changePage(page) {
      this.activePage = page
      await this.get_logs({page: this.activePage})
    }
  },
  async mounted() {
    await this.get_logs({page: 1})
  }
}
</script>
