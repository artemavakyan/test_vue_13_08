<script setup lang="ts">
import SectionTitle from '@/components/common/SectionTitle.vue'
import { onMounted, ref } from 'vue'

const STORAGE_DATA = 'profile_data';

const previewData = ref(null)
onMounted(() => {
  const data = localStorage.getItem(STORAGE_DATA);
  if(data) {
    previewData.value = JSON.parse(data)
  }
})
</script>

<template>
  <div class="py-6 mx-auto max-w-[620px]">
    <div v-if="previewData">
      <div>
        <SectionTitle>
          Персональные данные
        </SectionTitle>
        <p class="mt-4 font-bold text-base">
          {{ previewData.name + ', ' + previewData.age }} лет
        </p>
      </div>

      <div class="mt-10" v-if="previewData.children.length">
        <SectionTitle>
          Дети:
        </SectionTitle>
        <ul class="mt-3 flex flex-col gap-2 items-start">
          <li v-for="child in previewData.children"
              :key="child.id"
              class="inline-block rounded-md bg-[#F1F1F1] px-5 py-3 font-bold text-base text-center">
            {{ child.name + ', ' + child.age }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      Пожалуйста, заполните персональные данные...
      <router-link to="/" class="block underline">Заполнить</router-link>
    </div>
  </div>
</template>
