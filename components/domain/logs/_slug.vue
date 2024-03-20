<template>
  <div class="relative min-h-[100vh] h-full mb-[62px]">
    <Header/>
    <div class="px-16">
      <div class="py-3 mb-6 flex gap-4 items-center text-[#677593] text-sm">
        <NuxtLink to="/logs" class="font-medium">
          Logs
        </NuxtLink>
        <svg width="20" height="20" fill="#8B9AB6" class="rotate-180">
          <use xlink:href="#arrow"/>
        </svg>
        <p>
          Driver
        </p>
      </div>
      <LoadingDots v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      <div v-else class="mt-12 flex flex-col gap-16">
        <div class="flex flex-col gap-5">
          <div class="flex items-center gap-4 justify-between">
            <div class="flex gap-3 items-center">
              <div class="w-6 h-6 bg-[#D1FAE5] rounded-xl"/>
              <p class="text-2xl font-semibold text-[#13093A]">
                {{log.driver.user.first_name}} {{log.driver.user.last_name}}
              </p>
              <p class="text-xs font-medium py-[2.5px] px-[14.5px] rounded-xl"
              :class="log.logs[0].status.status == 'SB' ? 'bg-[#FEF3C7] text-[#92400E]' : log.logs[0].status.status == 'ON' ? 'bg-[#DBEAFE] text-[#1E40AF]' : log.logs[0].status.status == 'OFF' ? 'bg-[#F3F4F6] text-[#1F2937]' : 'bg-[#D1FAE5] text-[#065F46]'">
                {{log.logs[0].status.status}}
              </p>
            </div>
            <div class="flex gap-3">
              <Button white>
                Report
              </Button>
              <Button white>
                Current Location
              </Button>
            </div>
          </div>
          <div class="flex items-center gap-4 justify-between">
            <div>
              <p class="text-lg text-[#8B9AB6]">
                <span class="text-[#677593] font-medium">Phone No:</span> {{log.driver.user.phone}}
              </p>
            </div>
            <div>
              date
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-6">
          <div v-for="num in 4" :key="num" class="border border-[#DBEAFE] rounded p-6 flex gap-4 items-center justify-between">
            <div class="flex flex-col">
              <p class="uppercase font-medium text-2xl text-[#13093A]">
                Break
              </p>
              <p class="text-lg text-[#8B9AB6] mt-6 mb-3">
                Time
              </p>
              <div class="flex gap-3 items-center text-sm font-medium">
                <p class="py-1 px-2 rounded-xl bg-[#FEE2E2] text-[#991B1B]">
                  -2:38
                </p>
                <p class="text-[#677593]">
                  All 08:00
                </p>
              </div>
            </div>
            <div>
              right
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <p class="font-semibold text-[#13093A] text-2xl">
            Information
          </p>
          <Table :head="informationHead" :isLoading="isLoading" :pagination="false">
            <template #body>
              <tr v-for="item in log.logs" :key="item.id">
                <td>
                  <span class="py-0.5 px-[13.5px] rounded-[10px] text-xs font-medium"
                  :class="item.status.status == 'SB' ? 'bg-[#FEF3C7] text-[#92400E]' : item.status.status == 'ON' ? 'bg-[#DBEAFE] text-[#1E40AF]' : item.status.status == 'OFF' ? 'bg-[#F3F4F6] text-[#1F2937]' : 'bg-[#D1FAE5] text-[#065F46]'">
                    {{item.status.status}}
                  </span>
                </td>
              </tr>
            </template>
          </Table>
        </div>
        <div class="flex flex-col gap-8">
          <p class="font-semibold text-[#13093A] text-2xl">
            Log form
          </p>
          <div class="grid grid-cols-2 border-b border-[#DBEAFE]">
            <div v-for="(item, index) in logForm" :key="index"
            class="flex flex-col gap-2 p-6 border-t border-[#DBEAFE]"
            :class="index % 2 === 0 ? 'border-x' : 'border-r'">
              <p class="text-lg text-[#13093A] font-medium">
                {{item.title}}
              </p>
              <p class="text-sm text-[#677593]">
                {{item.name}}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <p class="font-semibold text-[#13093A] text-2xl">
            Trip Planner
          </p>
          <yandex-map :settings="settings" class="h-[772px]"
          zoom="15"
          :coords="[38.899513, -77.036527]">
          <ymap-marker :coords="[38.899513, -77.036527]"/>
          </yandex-map>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Header from '~/components/ui/header/index.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Button from '@/components/ui/buttons/default.vue'
import Table from '@/components/ui/table.vue'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  name: 'SingleLogComponent',
  head: {
    title: 'Log'
  },
  components: {
    Header,
    LoadingDots,
    Button,
    Table,
    yandexMap,
    ymapMarker
  },
  computed: {
    ...mapState({
      log: state => state.logs.log
    }),
    logForm() {
      const logForm = [
        {
          id: 1,
          title: 'Driver',
          name: `${this.log.driver.user.first_name} ${this.log.driver.user.last_name}`
        },
        {
          id: 2,
          title: 'Truck',
          name: this.log.driver.vehicle.id
        },
        {
          id: 3,
          title: 'Distance',
          name: this.log.distance
        },
        {
          id: 4,
          title: 'Trailers',
          name: this.log.trailer_code
        },
        {
          id: 5,
          title: 'Co driver',
          name: this.log.driver.co_driver
        },
        {
          id: 6,
          title: 'Shipping Docs',
          name: this.log.document_code
        },
        {
          id: 7,
          title: 'Signature',
          name: this.log.signature
        },
        {
          id: 8,
          title: 'Internal Note',
          name: this.log.notes
        },
      ]
      return logForm
    }
  },
  data() {
    return {
      isLoading: true,
      informationHead: [
        {
          id: 1,
          name: 'Status'
        },
        {
          id: 2,
          name: 'Start'
        },
        {
          id: 3,
          name: 'Duration'
        },
        {
          id: 4,
          name: 'Location'
        },
        {
          id: 5,
          name: 'Vehicle'
        },
        {
          id: 6,
          name: 'Odometer'
        },
        {
          id: 7,
          name: 'Eng, Hours'
        },
        {
          id: 8,
          name: 'Notes'
        },
        {
          id: 9,
          name: 'Document'
        },
        {
          id: 10,
          name: 'Trailer'
        }
      ],
      settings: {
        apiKey: '',
        lang: 'en_US',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
      }
    }
  },
  methods: {
    ...mapActions({
      get_log: 'logs/get_log'
    })
  },
  async mounted() {
    await this.get_log(this.$route.params.slug)
    this.isLoading = false
  }
}
</script>
