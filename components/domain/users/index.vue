<template>
  <div>
    <Header/>
    <div class="py-6 px-16">
      <div class="flex gap-4 justify-between items-center">
        <Tabs
          :active="activeStatus"
          :list="statusList"
          textList="name"
          valueList="value"
          @click="changeStatus"
        />
        <Button @click="show_addUser(true)"> Add user </Button>
      </div>
      <div class="mt-6">
        <Table :head="usersHead" :isLoading="isLoading" :count="count">
          <template #body>
            <tr v-for="user in users" :key="user.id">
              <td>
                <span>
                  {{user.name}}
                </span>
              </td>
              <td>
                <span>
                  {{user.ID}}
                </span>
              </td>
              <td>
                <span>
                  {{user.email}}
                </span>
              </td>
              <td>
                <span>
                  {{user.phone}}
                </span>
              </td>
              <td class="flex items-center justify-center gap-[18px]">
                <Tooltip text="Edit user">
                  <svg
                    class="cursor-pointer"
                    width="20"
                    height="20"
                    fill="#1E40AF"
                    @click="showEditUser(user)">
                    <use xlink:href="#edit" />
                  </svg>
                </Tooltip>
                <Tooltip text="Delete user">
                  <svg
                    class="cursor-pointer"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#677593"
                    @click="showDeleteUser(user)">
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
      <AddModal key="add" v-if="isShowAddUser"/>
      <EditModal key="edit" v-if="isShowEditUser" :activeUser="activeUser"/>
      <DeleteModal key="delete" v-if="isShowDeleteUser" :activeUser="activeUser"/>
    </transition-group>
  </div>
</template>
<script>
import Header from '~/components/ui/header/index.vue'
import Tabs from '@/components/ui/tabs/default.vue'
import Button from '@/components/ui/buttons/default.vue'
import Table from '@/components/ui/table.vue'
import AddModal from './modals/add.vue'
import EditModal from './modals/edit.vue'
import DeleteModal from './modals/delete.vue'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'UsersComponent',
  head: {
    title: 'Users'
  },
  components: {
    Header,
    Tabs,
    Button,
    Table,
    AddModal,
    EditModal,
    DeleteModal
  },
  computed: {
    ...mapState({
      users: state => state.users.users,
      isLoading: state => state.users.isLoading,
      count: state => state.users.count,
      isShowAddUser: state => state.users.isShowAddUser,
      isShowEditUser: state => state.users.isShowEditUser,
      isShowDeleteUser: state => state.users.isShowDeleteUser
    })
  },
  data() {
    return {
      activeStatus: '',
      statusList: [
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
      usersHead: [
        {
          id: 1,
          name: 'Name'
        },
        {
          id: 2,
          name: 'Id'
        },
        {
          id: 3,
          name: 'Email'
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
      activeUser: {}
    }
  },
  methods: {
    ...mapMutations({
      show_addUser: 'users/SHOW_ADDUSER',
      show_editUser: 'users/SHOW_EDITUSER',
      show_deleteUser: 'users/SHOW_DELETEUSER'
    }),
    showEditUser(user) {
      this.activeUser = user
      this.show_editUser(true)
    },
    showDeleteUser(user) {
      this.activeUser = user
      this.show_deleteUser(true)
    },
    changeStatus(item) {
      this.activeStatus = item.value
    },
  }
}
</script>
