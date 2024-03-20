<template>
  <aside class="w-[255px] bg-[#1E40AF] pt-8 pb-4 px-2 flex flex-col justify-between gap-4">
    <div class="flex flex-col gap-1">
      <NuxtLink to="/">
        <svg class="mx-auto mb-8" width="159" height="19">
          <use xlink:href="#logo-white"/>
        </svg>
      </NuxtLink>
      <NuxtLink v-for="page in pages" :key="page.id" :to="page.link"
      class="p-2 rounded-md text-sm font-medium flex gap-3 items-center transition ease-linear fill-none"
      :class="$route.name == page.name
      ? 'bg-[#F1FAFF] text-[#13093A] stroke-[#13093A]'
      : 'text-[#F1FAFF] hover:text-[#13093A] hover:bg-[#F1FAFF] stroke-[#F1FAFF] hover:stroke-[#13093A]'">
      <svg width="24" height="24">
        <use :xlink:href="page.svg"/>
      </svg>
        <p>
          {{page.title}}
        </p>
      </NuxtLink>
    </div>
    <div class="p-2 rounded-md text-sm font-medium flex gap-3 items-center cursor-pointer transition ease-linear fill-none text-[#F1FAFF] hover:text-[#13093A] hover:bg-[#F1FAFF] stroke-[#F1FAFF] hover:stroke-[#13093A]"
    @click="show_logout(true)">
      <svg width="24" height="24">
        <use xlink:href="#logout"/>
      </svg>
      <p>
        Log out
      </p>
    </div>
  </aside>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name: 'AsideComponent',
  data() {
    return {
      pages: [
        {
          id: 1,
          title: 'All units',
          link: '/',
          name: 'index',
          svg: '#document',
        },
        {
          id: 2,
          title: 'Logs',
          link: '/logs',
          name: 'logs',
          svg: '#chart',
        },
        {
          id: 3,
          title: 'Drivers',
          link: '/drivers',
          name: 'drivers',
          svg: '#users',
        },
        {
          id: 4,
          title: 'Vehicles',
          link: '/vehicles',
          name: 'vehicles',
          svg: '#truck',
        },
        {
          id: 5,
          title: 'Reports',
          link: '/reports',
          name: 'reports',
          svg: '#trending',
        },
        {
          id: 6,
          title: 'Maintenance',
          link: '/maintenance',
          name: 'maintenance',
          svg: '#setting',
        },
        {
          id: 7,
          title: 'Companies',
          link: '/companies',
          name: 'companies',
          svg: '#company',
        },
        {
          id: 8,
          title: 'Users',
          link: '/users',
          name: 'users',
          svg: '#user',
        },
      ]
    }
  },
  methods: {
    ...mapMutations({
      show_logout: 'authorization/SHOW_LOGOUT'
    })
  }
}
</script>
