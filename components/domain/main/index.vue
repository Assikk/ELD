<template>
  <div class="flex flex-col h-screen">
    <Header/>
    <div class="py-6 px-16 flex gap-8 height">
      <div class="w-[75%]">
        <yandex-map :settings="settings" class="h-full"
        zoom="15"
        :coords="[38.896622, -77.042559]">
          <ymap-marker :coords="[38.899513, -77.036527]"/>
        </yandex-map>
      </div>
      <div class="flex flex-col w-[25%]">
        <div class="relative scrollbar flex-grow overflow-y-auto flex flex-col border border-[#DBEAFE] py-4 rounded-md">
          <Search class="mx-4 mb-4" placeholder="Search driver"/>
          <div v-if="units.length > 0">
            <div class="border-t border-[#DBEAFE] p-4 flex justify-between text-sm text-[#677593] transition ease-linear  cursor-pointer"
            :class="activeUnit.id == unit.id ? 'bg-[#e3f0f7]' : 'hover:bg-[#F1FAFF]'"
            v-for="unit in units" :key="unit.id"
            @click="activeUnit = unit">
              <div>
                <p class="text-base text-[#13093A] font-medium">
                  {{unit.name}}
                </p>
                <div class="flex items-center gap-2 mt-2 mb-2.5">
                  <svg width="20" height="20" fill="none" stroke="#677593">
                    <use xlink:href="#location"/>
                  </svg>
                  <p>
                    {{unit.address}}
                  </p>
                </div>
                <div class="flex items-center gap-2 mt-2 mb-2.5">
                  <svg width="20" height="20" fill="none" stroke="#677593">
                    <use xlink:href="#timer"/>
                  </svg>
                  <p>
                    {{unit.time}}
                  </p>
                </div>
              </div>
              <div class="h-fit py-0.5 px-3 rounded-[10px] text-xs font-medium"
              :class="unit.status == 'mph' ? 'bg-[#D1FAE5] text-[#065F46]' : unit.status == 'sb' ? 'bg-[#FEF3C7] text-[#92400E]' : unit.status == 'on' ? 'bg-[#DBEAFE] text-[#1E40AF]' : 'bg-[#F3F4F6] text-[#1F2937]'">
                {{unit.status}}
              </div>
            </div>
          </div>
          <p v-else class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            Nothing was found
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/ui/header/index.vue'
import Search from './components/search.vue'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  name: 'MainComponent',
  head: {
    title: 'All units'
  },
  components: {
    Header,
    Search,
    yandexMap,
    ymapMarker,
  },
  data() {
    return {
      settings: {
        apiKey: '',
        lang: 'en_US',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
      },
      units: [
        {
          id: 1,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'mph'
        },
        {
          id: 2,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'sb'
        },
        {
          id: 3,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 4,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'on'
        },
        {
          id: 5,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 6,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 7,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 8,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 9,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 10,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 11,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 12,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 13,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 14,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 15,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 16,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 17,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 18,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 19,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
        {
          id: 20,
          name: 'Name Surname (Unt 111)',
          address: '3.41 mi SE of Mountain House, CA',
          time: '10-09-2023, 01:25 MDT',
          status: 'off'
        },
      ],
      activeUnit: {},
    }
  }
}
</script>
<style scoped>
.height {
  height: calc(100% - 132px);
}
</style>
