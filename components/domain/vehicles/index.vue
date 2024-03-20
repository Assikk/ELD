<template>
<div>
  <Header @search="searchVehicles"/>
  <div class="py-6 px-16">
    <div class="flex gap-4 justify-between items-center">
      <Tabs :active="activeStatus" :list="list" textList="name" valueList="value" @click="changeStatus"/>
      <div class="flex gap-6">
        <Button @click="show_addVehicle(true)">
          Add vehicle
        </Button>
      </div>
    </div>
    <div class="mt-6">
      <Table :head="vehiclesHead" :isLoading="isLoading" :count="count" :list="vehicles" @changePage="changePage">
        <template #body>
          <tr v-for="vehicle in vehicles" :key="vehicle.id"
          class="transition ease-linear hover:bg-[#F1FAFF] cursor-pointer"
          @click="$router.push(`/vehicles/${vehicle.id}`)">
            <td>
              <span class="text-sm font-medium text-[#111827]">
                {{vehicle.id}}
              </span>
            </td>
            <td>
              <span>
                {{vehicle.drivers.first_name}} {{vehicle.drivers.last_name}}
              </span>
            </td>
            <td>
              <span>
                {{vehicle.model.name}}
              </span>
            </td>
            <td>
              <span v-if="vehicle.documents" class="px-2.5 py-0.5 rounded-[10px] text-xs font-medium bg-[#D1FAE5] text-[#065F46]">
                {{vehicle.documents}}
              </span>
            </td>
            <td>
              <span>
                {{vehicle.eld_device.name}}
              </span>
            </td>
            <td>
              <span>
                {{vehicle.vin}}
              </span>
            </td>
            <td>
              <span>
                {{vehicle.activated}}
              </span>
            </td>
            <td>
              <span>
                {{vehicle.terminated}}
              </span>
            </td>
            <td class="flex items-center justify-center gap-[18px]">
              <Tooltip text="Vehicle Documents" position="left">
                <svg class="cursor-pointer" width="20" height="20" fill="none" stroke="#13093A"
                @click.stop="showDocuments(vehicle)">
                  <use xlink:href="#docs"/>
                </svg>
              </Tooltip>
              <Tooltip text="Edit Vehicle">
                <svg class="cursor-pointer" width="20" height="20" fill="#1E40AF"
                @click.stop="showEditVehicle(vehicle)">
                  <use xlink:href="#edit"/>
                </svg>
              </Tooltip>
              <Tooltip text="Delete Vehicle">
                <svg class="cursor-pointer" width="20" height="20" fill="none" stroke="#677593"
                @click.stop="showDeleteVehicle(vehicle)">
                  <use xlink:href="#delete"/>
                </svg>
              </Tooltip>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <transition-group name="fade">
      <AddModal key="add" v-if="isShowAddVehicle"/>
      <EditModal :activeVehicle="activeVehicle" key="edit" v-if="isShowEditVehicle"/>
      <DeleteModal :activeVehicle="activeVehicle" v-if="isShowDeleteVehicle" key="delete"/>
      <Documents key="documents" v-if="isShowDocuments" :activeVehicle="activeVehicle"/>
    </transition-group>
  </div>
</div>
</template>
<script>
import Tabs from '../../ui/tabs/default.vue'
import Button from '@/components/ui/buttons/default.vue'
import Table from '@/components/ui/table.vue'
import AddModal from './modals/add.vue'
import EditModal from './modals/edit.vue'
import DeleteModal from './modals/delete.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
import Header from '~/components/ui/header/index.vue'
import Documents from './modals/documents.vue'
export default {
  name: 'vehiclesComponent',
  head: {
    title: 'Vehicles'
  },
  components: {
    Tabs,
    Button,
    Table,
    AddModal,
    EditModal,
    DeleteModal,
    Header,
    Documents
  },
  computed: {
    ...mapState({
      isLoading: state => state.vehicles.isLoading,
      vehicles: state => state.vehicles.vehicles,
      isShowAddVehicle: state => state.vehicles.isShowAddVehicle,
      isShowEditVehicle: state => state.vehicles.isShowEditVehicle,
      isShowDeleteVehicle: state => state.vehicles.isShowDeleteVehicle,
      count: state => state.vehicles.count,
      search: state => state.search.search,
      isShowDocuments: state => state.vehicles.isShowDocuments
    })
  },
  data() {
    return {
      activeStatus: '',
      list: [
        {
          id: 1,
          name: 'Active',
          value: ''
        },
        {
          id: 2,
          name: 'Deactive',
          value: true
        }
      ],
      activePage: 1,
      vehiclesHead: [
        {
          id: 1,
          name: 'Vehicle Id'
        },
        {
          id: 2,
          name: 'Driver'
        },
        {
          id: 3,
          name: 'Make/Model'
        },
        {
          id: 4,
          name: 'Documents'
        },
        {
          id: 5,
          name: 'ELD'
        },
        {
          id: 6,
          name: 'Vin'
        },
        {
          id: 7,
          name: 'Activated'
        },
        {
          id: 8,
          name: 'Terminated'
        },
        {
          id: 9,
          name: 'Actions'
        },
      ],
      activeVehicle: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addVehicle: 'vehicles/SHOW_ADDVEHICLE',
      show_editVehicle: 'vehicles/SHOW_EDITVEHICLE',
      show_deleteVehicle: 'vehicles/SHOW_DELETEVEHICLE',
      show_documents: 'vehicles/SHOW_DOCUMENTS'
    }),
    ...mapActions({
      get_vehicles: 'vehicles/get_vehicles',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_vehicles({search: this.search, page: this.activePage, is_deleted: this.activeStatus})
    },
    showEditVehicle(item) {
      this.activeVehicle = item
      this.show_editVehicle(true)
    },
    async searchVehicles() {
      await this.get_vehicles({search: this.search, page: this.activePage, is_deleted: this.activeStatus})
    },
    async changePage(page) {
      this.activePage = page
      await this.get_vehicles({search: this.search, page: this.activePage, is_deleted: this.activeStatus})
    },
    showDeleteVehicle(vehicle) {
      this.activeVehicle = vehicle
      this.show_deleteVehicle(true)
    },
    showDocuments(vehicle) {
      this.activeVehicle = vehicle
      this.show_documents(true)
    }
  },
  async mounted() {
    await this.get_vehicles({page: 1})
  }
}
</script>
