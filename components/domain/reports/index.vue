<template>
  <div>
    <Header/>
    <div class="py-6 px-16">
      <div class="flex justify-end">
        <Button>
          New report
        </Button>
      </div>
      <Table class="mt-6" :isLoading="isLoading" :count="count" :head="reportsHead">

      </Table>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '~/components/ui/header/index.vue'
import Button from '@/components/ui/buttons/default.vue'
import Table from '@/components/ui/table.vue'
export default {
  name: 'ReportsComponent',
  head: {
    title: 'Reports'
  },
  components: {
    Header,
    Button,
    Table
  },
  computed: {
    ...mapState({
      reports: state => state.reports.reports,
      isLoading: state => state.reports.isLoading,
      count: state => state.reports.count
    })
  },
  data() {
    return {
      reportsHead: [
        {
          id: 1,
          name: 'Name'
        },
        {
          id: 2,
          name: 'Type'
        },
        {
          id: 3,
          name: 'Created time'
        },
        {
          id: 4,
          name: 'Recipent'
        },
        {
          id: 5,
          name: 'Status'
        },
        {
          id: 6,
          name: 'Download'
        },
        {
          id: 7,
          name: 'Download'
        },
        {
          id: 8,
          name: 'Actions'
        }
      ]
    }
  }
}
</script>
