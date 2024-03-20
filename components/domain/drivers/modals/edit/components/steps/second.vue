<template>
  <div class="scrollbar overflow-y-auto max-h-[510px] flex flex-col gap-4 pr-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        MVR
      </p>
      <Document
      documentId="MVR"
      :start="form.mvr_start" @updateStart="(value) => form.mvr_start = value"
      :expiry="form.mvr_end" @updateExpiry="(value) => form.mvr_end = value"
      :list="form.mvr_files"
      @uploadFile="(file) => uploadFile(file, 2)"
      @deleteFile="deleteFile"/>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        CDL
      </p>
      <Document
      documentId="CDL"
      :start="form.cdl_start" @updateStart="(value) => form.cdl_start = value"
      :expiry="form.cdl_end" @updateExpiry="(value) => form.cdl_end = value"
      :list="form.cdl_files"
      @uploadFile="(file) => uploadFile(file, 1)"
      @deleteFile="deleteFile"/>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        SSN card
      </p>
      <Document
      documentId="SSN card"
      :start="form.ssn_card_start" @updateStart="(value) => form.ssn_card_start = value"
      :expiry="form.ssn_card_end" @updateExpiry="(value) => form.ssn_card_end = value"
      :list="form.ssn_card_files"
      @uploadFile="(file) => uploadFile(file, 3)"
      @deleteFile="deleteFile"/>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Drug test
      </p>
      <Document
      documentId="Drug test"
      :start="form.drug_test_start" @updateStart="(value) => form.drug_test_start = value"
      :expiry="form.drug_test_end" @updateExpiry="(value) => form.drug_test_end = value"
      :list="form.drug_test_files"
      @uploadFile="(file) => uploadFile(file, 7)"
      @deleteFile="deleteFile"/>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Application
      </p>
      <Document
      documentId="Application"
      :start="form.application_start" @updateStart="(value) => form.application_start = value"
      :expiry="form.application_end" @updateExpiry="(value) => form.application_end = value"
      :list="form.application_files"
      @uploadFile="(file) => uploadFile(file, 8)"
      @deleteFile="deleteFile"/>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Medical card
      </p>
      <Document
      documentId="Medical card"
      :start="form.medical_card_start" @updateStart="(value) => form.medical_card_start = value"
      :expiry="form.medical_card_end" @updateExpiry="(value) => form.medical_card_end = value"
      :list="form.medical_card_files"
      @uploadFile="(file) => uploadFile(file, 9)"
      @deleteFile="deleteFile"/>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Employment verification
      </p>
      <Document
      documentId="Employment verification"
      :start="form.employment_verification_start" @updateStart="(value) => form.employment_verification_start = value"
      :expiry="form.employment_verification_end" @updateExpiry="(value) => form.employment_verification_end = value"
      :list="form.employment_verification_files"
      @uploadFile="(file) => uploadFile(file, 10)"
      @deleteFile="deleteFile"/>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <p class="title">
        Other Document
      </p>
      <Document
      documentId="Other Document"
      :start="form.other_doc_start" @updateStart="(value) => form.other_doc_start = value"
      :expiry="form.other_doc_end" @updateExpiry="(value) => form.other_doc_end = value"
      :list="form.other_document_files"
      @uploadFile="(file) => uploadFile(file, 4)"
      @deleteFile="deleteFile"/>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapActions} from 'vuex'
import Document from '@/components/ui/inputs/document.vue'
export default {
  name: 'SecondStep',
  components: {
    Document
  },
  props: {
    form: {}
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      save_file: 'drivers/save_file',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      delete_file: 'drivers/delete_file'
    }),
    async uploadFile(file, type) {
      try {
        this.loading_alert()
        await this.save_file({
          form: {
            file: file,
            driver: this.form.id,
            document_type: type
          },
          id: this.form.id
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
