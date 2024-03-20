<template>
  <div>
    <Header @search="searchDrivers"/>
    <div class="py-6 px-16">
      <div class="flex gap-4 justify-between items-center">
        <Tabs
          :active="activeStatus"
          :list="list"
          textList="name"
          valueList="value"
          @click="changeStatus"
        />
        <div class="flex gap-6">
          <Button @click="show_addDriver(true)"> Add driver </Button>
          <Button white @click="updateDrivers">
            Refresh
            <template #next-icon>
              <svg width="16" height="16" fill="none" stroke="#13093A">
                <use xlink:href="#refresh" />
              </svg>
            </template>
          </Button>
        </div>
      </div>
      <div class="mt-6">
        <Table :head="driversHead" :isLoading="isLoading" :count="count" :list="drivers" @changePage="changePage">
          <template #body>
            <tr v-for="driver in drivers" :key="driver.id"
            class="transition ease-linear hover:bg-[#F1FAFF] cursor-pointer"
            @click="$router.push(`/drivers/${driver.id}`)">
              <td>
                <div class="flex items-center justify-center gap-4">
                  <span class="text-sm font-medium text-[#111827]">
                    {{driver.user_full_name}}
                  </span>
                  <span class="w-3.5 h-3.5 rounded-xl" :class="driver.status ? 'bg-[#D1FAE5]' : 'bg-[#FEE2E2]'" />
                </div>
              </td>
              <td>
                <span class="text-sm font-medium text-[#111827]"> {{driver.co_driver ? `${driver.co_driver.first_name} ${driver.co_driver.last_name}` : driver.co_driver}}</span>
              </td>
              <td>
                <span> {{driver.vehicle ? driver.vehicle.id : driver.vehicle}} </span>
              </td>
              <td>
                <span class="text-[#059669]"> {{driver.app_version}} </span>
              </td>
              <td>
                <span> {{driver.activated}} </span>
              </td>
              <td>
                <span> {{driver.terminated}} </span>
              </td>
              <td class="flex items-center justify-center gap-[18px]">
                <Tooltip text="Driver Documents" position="left">
                  <svg class="cursor-pointer" width="20" height="20" fill="none" stroke="#13093A"
                  @click.stop="showDocuments(driver)">
                    <use xlink:href="#docs"/>
                  </svg>
                </Tooltip>
                <Tooltip text="Notify Driver">
                  <svg
                    class="cursor-pointer"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#DE3730"
                    @click.stop="show_notify(true)"
                  >
                    <use xlink:href="#warning2" />
                  </svg>
                </Tooltip>
                <Tooltip text="Edit Driver">
                  <svg
                    class="cursor-pointer"
                    width="20"
                    height="20"
                    fill="#1E40AF"
                    @click.stop="showEditDriver(driver)"
                  >
                    <use xlink:href="#edit" />
                  </svg>
                </Tooltip>
                <Tooltip text="Delete Driver">
                  <svg
                    class="cursor-pointer"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#677593"
                    @click.stop="showDeleteDriver(driver)"
                  >
                    <use xlink:href="#delete" />
                  </svg>
                </Tooltip>
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
    <transition-group name="fade">
      <AddModal key="add" v-if="isShowAddDriver"/>
      <EditModal
        :activeDriver="activeDriver"
        key="edit"
        v-if="isShowEditDriver"
      />
      <DeleteModal
        :activeDriver="activeDriver"
        key="delete"
        v-if="isShowDeleteDriver"
      />
      <Notify key="notify" v-if="isShowNotify"/>
      <Documents key="documents" v-if="isShowDocuments" :activeDriver="activeDriver"/>
    </transition-group>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Header from '~/components/ui/header/index.vue'
import Tabs from '@/components/ui/tabs/default.vue'
import Button from '@/components/ui/buttons/default.vue'
import Table from '@/components/ui/table.vue'
import AddModal from './modals/add/index.vue'
import EditModal from './modals/edit/index.vue'
import DeleteModal from './modals/delete.vue'
import Notify from './modals/notify.vue'
import Documents from './modals/documents.vue'
export default {
  name: 'DriversComponent',
  head: {
    title: 'Drivers',
  },
  components: {
    Header,
    Tabs,
    Button,
    Table,
    AddModal,
    EditModal,
    DeleteModal,
    Notify,
    Documents,
  },
  computed: {
    ...mapState({
      isShowAddDriver: (state) => state.drivers.isShowAddDriver,
      isShowEditDriver: (state) => state.drivers.isShowEditDriver,
      isShowDeleteDriver: (state) => state.drivers.isShowDeleteDriver,
      drivers: (state) => state.drivers.drivers,
      isLoading: state => state.drivers.isLoading,
      count: state => state.drivers.count,
      search: state => state.search.search,
      isShowNotify: state => state.drivers.isShowNotify,
      isShowDocuments: state => state.drivers.isShowDocuments
    }),
  },
  data() {
    return {
      activeStatus: '',
      list: [
        {
          id: 1,
          name: 'Active',
          value: '',
        },
        {
          id: 2,
          name: 'Deactive',
          value: true,
        },
      ],
      driversHead: [
        {
          id: 1,
          name: 'name',
        },
        {
          id: 2,
          name: 'Co-driver',
        },
        {
          id: 3,
          name: 'Vehicle ID',
        },
        {
          id: 4,
          name: 'App Version',
        },
        {
          id: 5,
          name: 'Activated',
        },
        {
          id: 6,
          name: 'Terminated',
        },
        {
          id: 8,
          name: 'Actions',
        },
      ],
      activeDriver: {},
      activePage: '',
    }
  },
  methods: {
    ...mapMutations({
      show_addDriver: 'drivers/SHOW_ADDDRIVER',
      show_editDriver: 'drivers/SHOW_EDITDRIVER',
      show_deleteDriver: 'drivers/SHOW_DELETEDRIVER',
      set_search: 'search/SET_SEARCH',
      show_notify: 'drivers/SHOW_NOTIFY',
      show_documents: 'drivers/SHOW_DOCUMENTS'
    }),
    ...mapActions({
      get_drivers: 'drivers/get_drivers',
    }),
    async changeStatus(item) {
      this.activeStatus = item.value
      await this.get_drivers({search: this.search, page: this.activePage, is_deleted: this.activeStatus})
    },
    showEditDriver(driver) {
      this.activeDriver = driver
      this.show_editDriver(true)
    },
    showDeleteDriver(driver) {
      this.activeDriver = driver
      this.show_deleteDriver(true)
    },
    async searchDrivers() {
      await this.get_drivers({search: this.search, page: this.activePage, is_deleted: this.activeStatus})
    },
    async changePage(page) {
      this.activePage = page
      await this.get_drivers({search: this.search, page: this.activePage, is_deleted: this.activeStatus})
    },
    async updateDrivers() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_drivers({page: 1})
    },
    showDocuments(driver) {
      this.activeDriver = driver
      this.show_documents(true)
    }
  },
  async mounted() {
    await this.get_drivers({ page: 1 })
  },
}
</script>
