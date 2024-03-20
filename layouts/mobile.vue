<template>
  <section>
    <Icons/>
    <Nuxt class="h-screen"/>
    <transition-group name="fade">
      <Alert key="alert" v-if="Alert.isActive"/>/>
    </transition-group>
  </section>
</template>
<script>
import {mapState} from 'vuex'
import Alert from '@/components/ui/modals/alert.vue'
import Icons from '@/components/ui/icons.vue'
export default {
  name: 'MobileLayout',
  components: {
    Alert,
    Icons
  },
  computed :{
    ...mapState({
      Alert: state => state.alert.alert,
    })
  }
}
</script>
