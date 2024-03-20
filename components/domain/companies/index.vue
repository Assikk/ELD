<template>
  <div>
    <Header/>
    <div class="py-6 px-16">
      <div class="flex justify-end">
        <Button @click="show_addCompany(true)">
          Add company
        </Button>
      </div>
      <div class="mt-6">
        <Table :head="companiesHead" :isLoading="isLoading" :count="count" :list="companies">
          <template #body>
            <tr v-for="item in companies" :key="item.id">
              <td>
                <span>
                  {{item.name}}
                </span>
              </td>
              <td>
                <span>
                  {{item.address}}
                </span>
              </td>
              <td>
                <span>
                  {{item.usdot}}
                </span>
              </td>
              <td>
                <span>
                  {{item.phone}}
                </span>
              </td>
              <td class="flex items-center justify-center gap-[18px]">
                <Tooltip text="Edit company">
                  <svg
                    class="cursor-pointer"
                    width="20"
                    height="20"
                    fill="#1E40AF"
                    @click="showEditModal(item)"
                  >
                    <use xlink:href="#edit" />
                  </svg>
                </Tooltip>
                <Tooltip text="Delete company">
                  <svg
                    class="cursor-pointer"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#677593"
                    @click.stop="showDeleleModal(item)"
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
      <AddModal key="add" v-if="isShowAddCompany"/>
      <EditModal key="edit" v-if="isShowEditCompany" :activeCompany="activeCompany"/>
      <DeleteModal key="delete" v-if="isShowDeleteCompany" :activeCompany="activeCompany"/>
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
export default {
  name: 'companiesComponent',
  head: {
    title: 'Companies'
  },
  computed: {
    ...mapState({
      companies: state => state.companies.companies,
      isLoading: state => state.companies.isLoading,
      count: state => state.companies.count,
      isShowAddCompany: state => state.companies.isShowAddCompany,
      isShowEditCompany: state => state.companies.isShowEditCompany,
      isShowDeleteCompany: state => state.companies.isShowDeleteCompany
    })
  },
  components: {
    Header,
    Button,
    Table,
    AddModal,
    EditModal,
    DeleteModal
  },
  data() {
    return {
      companiesHead: [
        {
          id: 1,
          name: 'Name'
        },
        {
          id: 2,
          name: 'Address'
        },
        {
          id: 3,
          name: 'Usdot'
        },
        {
          id: 4,
          name: 'Phone'
        },
        {
          id: 5,
          name: 'Actions'
        }
      ],
      activeCompany: {}
    }
  },
  methods: {
    ...mapMutations({
      show_addCompany: 'companies/SHOW_ADDCOMPANY',
      show_editCompany: 'companies/SHOW_EDITCOMPANY',
      show_deleteCompany: 'companies/SHOW_DELETECOMPANY'
    }),
    showEditModal(item) {
      this.activeCompany = item
      this.show_editCompany(true)
    },
    showDeleleModal(item) {
      this.activeCompany = item
      this.show_deleteCompany(true)
    }
  },
}
</script>
