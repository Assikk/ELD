<template>
  <div class="rounded-md border border-[#DBEAFE] flex flex-col justify-between">
    <div :class="small ? 'min-h-[500px]' : 'min-h-[600px]'">
      <div v-if="isLoading" class="flex justify-center items-center"
      :class="small ? 'min-h-[530px]' : 'min-h-[600px]'">
        <LoadingDots/>
      </div>
      <table v-else>
        <thead>
          <tr>
            <th v-for="item in head" :key="item.id"
            :style="item.color ? `color: ${item.color}` : 'color: #13093A'">
              {{item.name}}
            </th>
          </tr>
        </thead>
        <tbody>
          <slot name="body"/>
        </tbody>
      </table>
    </div>
    <div v-if="pagination" class="px-6 py-[21px] flex items-center justify-between gap-4">
      <p class="text-sm text-[#8B9AB6]">
        Showing <span class="font-medium">{{activePage}}</span> to <span class="font-medium">{{list.length}}</span> of <span class="font-medium">{{count}}</span> results
      </p>
      <Pagination :pageCount="Math.ceil(count / 10)" :clickHandler="change"/>
    </div>
  </div>
</template>
<script>
import LoadingDots from '@/components/ui/loading/dots.vue'
import Pagination from './pagination.vue'
export default {
  name: 'TableComponent',
  components: {
    LoadingDots,
    Pagination
  },
  props: {
    head: {
      type: Array
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    count: {},
    list: {
      default: 10
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activePage: 1
    }
  },
  methods: {
    change(page) {
      this.activePage = page
      if(page > 1) {
        this.activePage = `${page - 1}${page - 1}`
      }
      this.$emit('changePage', page)
    }
  },
}
</script>
<style scoped>
table {
  width: 100%;
}
thead {
  background: #F1FAFF;
}
thead tr th {
  padding: 12px 24px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  /* color: #13093A; */
  text-transform: uppercase;
  letter-spacing: 0.6px;
}
tbody tr td {
  text-align: center;
  padding: 27px 8px;
  border-bottom: 1px solid #DBEAFE;
  font-size: 14px;
  line-height: 20px;
  color: #677593;
}
</style>
