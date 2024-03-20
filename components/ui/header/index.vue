<template>
  <header>
    <div class="flex items-center gap-16 justify-between px-16 py-3.5">
      <Search @input="(event) => $emit('search', event)"/>
      <p class="text-[#677593] font-medium">
        <!-- {{$auth.user.first_name}} {{$auth.user.last_name}} -->
        {{$auth.user.email}}
      </p>
    </div>
    <div class="py-5 px-16 border-y border-[#DBEAFE] flex justify-between">
      <div v-for="item in list" :key="item.id" class="flex items-center gap-1">
        <p class="font-medium text-sm"
        :style="{'color': item.textColor}">
          {{item.name}}
        </p>
        <p class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
        :style="{'color': item.countColor, 'background': item.countBackground}">
          {{item.count}}
        </p>
      </div>
    </div>
  </header>
</template>
<script>
import Search from './components/search.vue'
export default {
  name: 'HeaderComponent',
  components: {
    Search
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: 'Drivers on duty',
          textColor: '#275DE7',
          count: 2,
          countColor: '#1E40AF',
          countBackground: '#DBEAFE'
        },
        {
          id: 2,
          name: 'Drivers on the road',
          textColor: '#059669',
          count: 2,
          countColor: '#065F46',
          countBackground: '#D1FAE5'
        },
        {
          id: 3,
          name: 'Drivers off duty',
          textColor: '#131313',
          count: 2,
          countColor: '#1F2937',
          countBackground: '#F3F4F6'
        },
        {
          id: 4,
          name: 'Sleeper berth',
          textColor: '#F07F1C',
          count: 2,
          countColor: '#92400E',
          countBackground: '#FEF3C7'
        },
        {
          id: 5,
          name: 'Yard move',
          textColor: '#275DE7',
          count: 2,
          countColor: '#1E40AF',
          countBackground: '#DBEAFE'
        },
        {
          id: 6,
          name: 'Personal conveyance',
          textColor: '#131313',
          count: 2,
          countColor: '#1F2937',
          countBackground: '#F3F4F6'
        }
      ]
    }
  },
}
</script>
