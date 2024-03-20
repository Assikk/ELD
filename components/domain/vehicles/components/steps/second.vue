<template>
  <div class="overflow-y-auto max-h-[510px] flex flex-col gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Annual Inspection
      </p>
      <Document documentId="Inspection" :start="form.annual_inspection_start" @updateStart="(value) => form.annual_inspection_start = value"
      :expiry="form.annual_inspection_end" @updateExpiry="(value) => form.annual_inspection_end = value"
      :list="form.annual_inspection_files"
      @uploadFile="(file) => uploadFile(file, 5)"
      @deleteFile="deleteFile"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Registration
      </p>
      <Document documentId="Registration" :start="form.registration_start" @updateStart="(value) => form.registration_start = value"
      :expiry="form.registration_end" @updateExpiry="(value) => form.registration_end = value"
      :list="form.registration_files"
      @uploadFile="(file) => uploadFile(file, 6)"
      @deleteFile="deleteFile"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Other Document
      </p>
      <Document documentId="Other" :start="form.other_doc_start" @updateStart="(value) => form.other_doc_start = value"
      :expiry="form.other_doc_end" @updateExpiry="(value) => form.other_doc_end = value"
      :list="form.other_document_files"
      @uploadFile="(file) => uploadFile(file, 4)"
      @deleteFile="deleteFile"
      />
    </div>
    <TextArea label="Notes" v-model="form.notes"/>
  </div>
</template>
<script>
import Document from '@/components/ui/inputs/document.vue'
import TextArea from '@/components/ui/textarea.vue'
import {mapMutations, mapActions} from 'vuex'
export default {
  name: 'SecondStep',
  components: {
    Document,
    TextArea
  },
  props: {
    form: {}
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      save_file: 'vehicles/save_file',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      delete_file: 'vehicles/delete_file'
    }),
    async uploadFile(file, type) {
      try {
        this.loading_alert()
        await this.save_file({
          file: file,
          vehicle: this.form.id,
          document_type: type
        })
        this.success_alert('Document has been successfully added')
        this.$emit('saveFile')
      } catch(err) {
        const errors = []
        for(let key in err.response.data) {
          errors.push(`${key} - ${err.response.data[key][0]}`)
        }
        this.error_alert(errors)
      }
    },
    async deleteFile(fileId) {
      try {
        this.loading_alert()
        await this.delete_file({fileId: fileId, id: this.form.id})
        this.success_alert('Document has been successfully deleted')
        this.$emit('deleteFile')
      } catch(err) {
        const errors = []
        for(let key in err.response.data) {
          errors.push(`${key} - ${err.response.data[key][0]}`)
        }
        this.error_alert(errors)
      }
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
