<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_services(false)"/>
    <div class="relative overflow-y-auto bg-white max-h-[90%] h-[90%] w-[90%] md:w-[960px] rounded-md flex flex-col justify-between">
      <div class="px-[52px] pt-[52px] pb-7 h-full">
        <h1 class="text-2xl font-semibold text-[#13093A]">
          Driver services
        </h1>
        <div class="mt-6">
          <Table :head="servicesHead" :isLoading="false" small count="50">
            <template #body>
              <tr v-for="item in services" :key="item.id">
                <td>
                  <span class="text-[#13093A] font-medium">
                    {{item.name}}
                  </span>
                </td>
                <td>
                  <span>
                    {{item.serviceDate}}
                  </span>
                </td>
                <td>
                  <span>
                    {{item.nextService}}
                  </span>
                </td>
                <td>
                  <span class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="item.status == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : item.status == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{item.status}}
                  </span>
                </td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import Table from '@/components/ui/table.vue'
export default {
  name: 'ServicesModal',
  props: {
    activeMaintenance: {}
  },
  components: {
    Table
  },
  computed: {
    ...mapState({
      services: state => state.maintenance.services
    })
  },
  data() {
    return {
      servicesHead: [
        {
          id: 1,
          name: 'Service name'
        },
        {
          id: 2,
          name: 'Service data'
        },
        {
          id: 3,
          name: 'Next Service'
        },
        {
          id: 4,
          name: 'Status'
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      show_services: 'maintenance/SHOW_SERVICES'
    })
  },
  mounted() {
    console.log(this.activeMaintenance);
  }
}
</script>
