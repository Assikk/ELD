<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_editCompany(false)"/>
    <div class="relative overflow-y-auto bg-white max-h-[90%] h-[90%] w-[90%] md:w-[1120px] rounded-md flex flex-col justify-between">
      <div class="px-[52px] pt-[52px] pb-7 h-full">
        <h1 class="text-2xl font-semibold text-[#13093A]">
          Edit company
        </h1>
        <div v-if="isLoading" class="flex justify-center items-center h-full w-[895px]">
          <LoadingDots/>
        </div>
        <div v-else>
          <Tabs class="my-6" :list="listTabs" :active="activeTab" @click="clicktab"/>
          <FirstStep v-if="activeTab == 1"/>
          <SecondStep v-if="activeTab == 2"/>
        </div>
      </div>
      <div class="bg-[#B8D5FE] flex gap-4 justify-end py-3 px-6 sticky bottom-0 left-0">
        <Button white medium @click="show_editCompany(false)">
          Cancel
        </Button>
        <Button medium :disabled="disabledStep" @click="nextStep">
          Save
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Button from '@/components/ui/buttons/default.vue'
import Tabs from '~/components/ui/tabs/full.vue'
import FirstStep from './components/steps/first.vue'
import SecondStep from './components/steps/second.vue'
export default {
  name: 'EditCompanyModal',
  components: {
    LoadingDots,
    Button,
    Tabs,
    FirstStep,
    SecondStep
  },
  props: {
    activeCompany: {}
  },
  data() {
    return {
      isLoading: true,
      listTabs: [
        {
          id: 1,
          name: 'Information'
        },
        {
          id: 2,
          name: 'Security'
        }
      ],
      activeTab: 1,
      isActiveTabs: false,
      disabledStep: false
    }
  },
  methods: {
    ...mapMutations({
      show_editCompany: 'companies/SHOW_EDITCOMPANY'
    }),
    nextStep() {
      if(!this.disabledStep) {
        this.disabledStep = true
        if(this.activeTab == 1) {
          this.activeTab = 2
          this.isActiveTabs = true
          this.disabledStep = false
        } else this.show_editCompany(false)
      }
    },
    clicktab(tab) {
      if(this.isActiveTabs) {
        this.activeTab = tab.id
      }
    },
  },
  mounted() {
    console.log(this.activeCompany);
    this.isLoading = false
  }
}
</script>
