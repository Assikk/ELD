<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_documents(false)"/>
    <div class="relative overflow-y-auto bg-white max-h-[90%] h-[90%] w-[90%] md:w-[960px] rounded-md flex flex-col justify-between">
      <div class="px-[52px] pt-[52px] pb-7 h-full">
        <h1 class="text-2xl font-semibold text-[#13093A]">
          Driver documents
        </h1>
        <div class="mt-6">
          <Table :head="documentsHead" :isLoading="false" small>
            <template #body>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    MVR
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.mvr_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.mvr_status" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.mvr_status == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.mvr_status == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.mvr_status}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    CDL
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.cdl_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.cdl_status" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.cdl_status == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.cdl_status == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.cdl_status}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    SSN card
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.ssn_card_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.ssn_card_status" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.ssn_card_status == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.ssn_card_status == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.ssn_card_status}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    Drug test
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.drug_test_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.drug_test_end" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.drug_test_end == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.drug_test_end == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.drug_test_end}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    Application
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.application_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.application_end" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.application_end == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.application_end == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.application_end}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    Medical card
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.medical_card_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.medical_card_status" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.medical_card_status == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.medical_card_status == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.medical_card_status}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    Employment verification
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.employment_verification_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.employment_verification_status" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.employment_verification_status == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.employment_verification_status == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.employment_verification_status}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    Other Document
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.other_doc_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.other_doc_status" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.other_doc_status == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.other_doc_status == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.other_doc_status}}
                  </span>
                </td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Table from '@/components/ui/table.vue'
export default {
  name: 'DocumentsModal',
  props: {
    activeDriver: {}
  },
  components: {
    Table
  },
  computed: {
    ...mapState({
      documents: state => state.drivers.documents
    })
  },
  data() {
    return {
      documentsHead: [
        {
          id: 1,
          name: 'Document name'
        },
        {
          id: 2,
          name: 'Expiry date'
        },
        {
          id: 3,
          name: 'Status'
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      show_documents: 'drivers/SHOW_DOCUMENTS'
    }),
    ...mapActions({
      get_documents: 'drivers/get_documents'
    })
  },
  async mounted() {
    await this.get_documents(this.activeDriver.id)
  }
}
</script>
