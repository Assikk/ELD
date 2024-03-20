<template>
  <div class="scrollbar overflow-y-auto h-[580px] flex flex-col gap-4 pr-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Company name
      </p>
      <Input placeholder="Write company name" v-model="form.name">
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Home terminal timezone
      </p>
      <Select placeholder="Choose home terminal timezone"
      :list="timezoneList"
      textList="name"
      valueList="id"
      :activeId="form.timezone"
      @click="(item) => form.timezone = item.id">
      </Select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Email
      </p>
      <Input placeholder="Write email" v-model="form.email">
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Phone
      </p>
      <Input placeholder="Write phone" v-model="form.phone">
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Usdot
      </p>
      <Input placeholder="Write usdot" v-model="form.usdot">
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Company address
      </p>
      <Input placeholder="Write company address" v-model="form.company_address">
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Home terminal address
      </p>
      <Input placeholder="Write home terminal address" v-model="form.terminal_address">
      </Input>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Upload company logo
      </p>
      <Document
      documentId="logo"
      :isShowDate="false"
      :list="form.logo"
      @uploadFile="(file) => form.logo.push(file)"/>
    </div>
  </div>
</template>
<script>
import Input from '@/components/ui/inputs/default.vue'
import Select from '@/components/ui/selects/default.vue'
import Document from '@/components/ui/inputs/document.vue'
export default {
  name: 'FirstStep',
  components: {
    Input,
    Select,
    Document
  },
  data() {
    return {
      form: {
        name: '',
        timezone: '',
        email: '',
        phone: '',
        usdot: '',
        company_address: '',
        terminal_address: '',
        logo: []
      },
      timezoneList: [
        {
          id: 1,
          name: 'UTC +5'
        },
        {
          id: 2,
          name: 'UTC +2'
        },
        {
          id: 3,
          name: 'UTC +3'
        }
      ]
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #13093A;
}
</style>
