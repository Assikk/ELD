<template>
  <div>
    <div class="border border-[#DBEAFE] rounded-md py-2.5 px-3.5 flex items-center gap-4 justify-between cursor-pointer"
    v-if="!isShowForm"
    @click="isShowForm = true">
      <p class="text-sm text-[#677593]">
        Add document
      </p>
      <svg  width="20" height="20" fill="none" stroke="#677593">
        <use xlink:href="#plus"/>
      </svg>
    </div>
    <div v-if="isShowForm" class="mt-4 border border-[#DBEAFE] rounded-md py-2.5 px-3.5">
      <div class="flex items-center gap-4 justify-between">
        <p class="text-sm text-[#677593]">
          Add document
        </p>
        <svg  width="20" height="20" fill="none" stroke="#677593" class="cursor-pointer"
        @click="isShowForm = false">
          <use xlink:href="#minus"/>
        </svg>
      </div>
      <div v-if="isShowDate" class="grid grid-cols-2 gap-6 mt-[22px]">
        <Date placeholder="Start data" v-model="start" @updateDate="(value) => $emit('updateStart', value)"/>
        <Date placeholder="Expiry data" v-model="expiry" @updateDate="(value) => $emit('updateExpiry', value)"/>
      </div>
      <AddFile :id="documentId" @upload="uploadFile" class="mt-6">
        <div class="flex flex-col items-center justify-center py-6 border-2 border-[#DBEAFE] border-dashed cursor-pointer">
          <svg width="48" height="48" fill="none" stroke="#677593">
            <use xlink:href="#document"/>
          </svg>
          <p class="text-sm font-medium text-[#13093A]">
            Drag and drop or upload you file
          </p>
          <p class="text-xs text-[#8B9AB6]">
            The largest file size that can be uploaded is 50mb
          </p>
        </div>
      </AddFile>
      <div class="mt-6 flex flex-col gap-3">
        <div v-for="(document, index) in list" :key="index"
        class="flex items-center gap-4 justify-between px-4 py-[22px] rounded-md bg-[#F1FAFF]">
          <div class="flex items-center gap-3">
            <svg width="20" height="20" fill="none" stroke="#677593">
              <use xlink:href="#document"/>
            </svg>
            <p class="text-sm font-medium text-[#677593]">
              <!-- {{document.name}} -->
              <!-- {{document?.file.substring(document.file.lastIndexOf("/") + 1)}} -->
              {{document.name ? document.name : document.file.substring(document.file.lastIndexOf("/") + 1)}}
            </p>
          </div>
          <svg class="cursor-pointer" width="20" height="20" fill="#677593"
          @click="deleteFile(document.id, index)">
            <use xlink:href="#close"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Date from './date.vue'
import AddFile from '.././addFile.vue'
export default {
  name: 'DocumentInputComponent',
  props: {
    documentId: {},
    start: {},
    expiry: {},
    list: {
      type: Array,
    },
    isShowDate: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Date,
    AddFile
  },
  data() {
    return {
      isShowForm: false
    }
  },
  methods: {
    uploadFile(file) {
      this.$emit('uploadFile', file)
    },
    deleteFile(fileId, index) {
      // this.list.splice(index, 1)
      this.$emit('deleteFile', fileId)
    }
  },
  mounted() {
    if(this.list.length > 0) {
      this.isShowForm = true
    }
  }
}
</script>
