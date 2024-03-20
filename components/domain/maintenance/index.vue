<template>
  <div>
    <Header/>
    <div class="py-6 px-16">
      <div class="flex justify-end">
        <Button @click="show_addMaintenance(true)">
          Add maintenance
        </Button>
      </div>
      <div class="mt-6">
        <Table :head="maintenanceHead" :isLoading="isLoading" :count="count" :list="maintenances">
          <template #body>
            <tr v-for="item in maintenances" :key="item.id"
            class="transition ease-linear hover:bg-[#F1FAFF] cursor-pointer"
            @click="showServicesModal(item)">
              <td>
                <span>
                  {{item.name}}
                </span>
              </td>
              <td>
                <span>
                  {{item.vehicle}}
                </span>
              </td>
              <td>
                <span>
                  {{item.model}}
                </span>
              </td>
              <td>
                <span>
                  {{item.vin}}
                </span>
              </td>
              <td>
                <span>
                  {{item.notes}}
                </span>
              </td>
              <td class="flex items-center justify-center gap-[18px]">
                <Tooltip text="Edit maintenance">
                  <svg
                    class="cursor-pointer"
                    width="20"
                    height="20"
                    fill="#1E40AF"
                    @click.stop="showEditModal(item)"
                  >
                    <use xlink:href="#edit" />
                  </svg>
                </Tooltip>
                <Tooltip text="Delete maintenance">
                  <svg
                    class="cursor-pointer"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#677593"
                    @click.stop="showDeleteModal(item)"
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
      <AddModal key="add" v-if="isShowAddMaintenance"/>
      <EditModal key="edit" v-if="isShowEditMaintenance" :activeMaintenance="activeMaintenance"/>
      <DeleteModal key="delete" v-if="isShowDeleteMaintenance" :activeMaintenance="activeMaintenance"/>
      <Services key="services" v-if="isShowServices" :activeMaintenance="activeMaintenance"/>
    </transition-group>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import Header from '~/components/ui/header/index.vue'
import Button from '@/components/ui/buttons/default.vue'
import Table from '@/components/ui/table.vue'
import AddModal from './modals/add.vue'
import EditModal from './modals/edit.vue'
import DeleteModal from './modals/delete.vue'
import Services from './modals/services.vue'
export default {
  name: 'maintenanceComponent',
  head: {
    title: 'Maintenance'
  },
  computed: {
    ...mapState({
      maintenances: state => state.maintenance.maintenances,
      isLoading: state => state.maintenance.isLoading,
      count: state => state.maintenance.count,
      isShowAddMaintenance: state => state.maintenance.isShowAddMaintenance,
      isShowEditMaintenance: state => state.maintenance.isShowEditMaintenance,
      isShowDeleteMaintenance: state => state.maintenance.isShowDeleteMaintenance,
      isShowServices: state => state.maintenance.isShowServices
    })
  },
  components: {
    Header,
    Button,
    Table,
    AddModal,
    EditModal,
    DeleteModal,
    Services
  },
  data() {
    return {
      maintenanceHead: [
        {
          id: 1,
          name: 'Name'
        },
        {
          id: 2,
          name: 'Vehicle Id'
        },
        {
          id: 3,
          name: 'Make/Model'
        },
        {
          id: 4,
          name: 'Vin'
        },
        {
          id: 5,
          name: 'Notes'
        },
        {
          id: 6,
          name: 'Actions'
        }
      ],
      activeMaintenance: {}
    }
  },
  methods: {
    ...mapMutations({
      show_addMaintenance: 'maintenance/SHOW_ADDMAINTENANCE',
      show_editMaintenance: 'maintenance/SHOW_EDITMAINTENANCE',
      show_deleteMaintenance: 'maintenance/SHOW_DELETEMAINTENANCE',
      show_services: 'maintenance/SHOW_SERVICES'
    }),
    showEditModal(item) {
      this.activeMaintenance = item
      this.show_editMaintenance(true)
    },
    showDeleteModal(item) {
      this.activeMaintenance = item
      this.show_deleteMaintenance(true)
    },
    showServicesModal(item) {
      this.activeMaintenance = item
      this.show_services(true)
    }
  },
}
</script>
