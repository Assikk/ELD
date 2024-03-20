<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_documents(false)"/>
    <div class="relative overflow-y-auto bg-white max-h-[90%] h-[90%] w-[90%] md:w-[960px] rounded-md flex flex-col justify-between">
      <div class="px-[52px] pt-[52px] pb-7 h-full">
        <h1 class="text-2xl font-semibold text-[#13093A]">
          Vehicle documents
        </h1>
        <div class="mt-6">
          <Table :head="documentsHead" :isLoading="false" small>
            <template #body>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    Annual Inspection
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.annual_inspection_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.annual_inspection_status" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.annual_inspection_status == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.annual_inspection_status == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.annual_inspection_status}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="text-[#13093A] font-medium">
                    Registration
                  </span>
                </td>
                <td>
                  <span>
                    {{documents.registration_end}}
                  </span>
                </td>
                <td>
                  <span v-if="documents.registration_status" class="py-0.5 px-2.5 rounded-[10px] text-xs font-medium"
                  :class="documents.registration_status == 'Approved' ? 'bg-[#D1FAE5] text-[#065F46]' : documents.registration_status == 'End soon' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                    {{documents.registration_status}}
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
  name: 'AddVehiclesModal',
  props: {
    activeVehicle: {}
  },
  components: {
    Table
  },
  computed: {
    ...mapState({
      documents: state => state.vehicles.documents
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
      show_documents: 'vehicles/SHOW_DOCUMENTS'
    }),
    ...mapActions({
      get_documents: 'vehicles/get_documents'
    })
  },
  async mounted() {
    await this.get_documents(this.activeVehicle.id)
  }
}
</script>
