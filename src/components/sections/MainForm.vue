<script setup>
import BaseInput from '@/components/common/BaseInput.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const formData = reactive({
  name: '',
  age: '',
  children: []
})

let childId = 0;

const STORAGE_DATA = 'profile_data'
const ERROR_MESSAGES = {
  REQUIRED_NAME: 'Имя обязательно для заполнения',
  REQUIRED_AGE: 'Возраст обязателен для заполнения',
  INVALID_AGE: 'Возраст должен быть числом',
}

const errors = reactive({
  name: '',
  age: '',
  children: []
})

onMounted(() => {
  const profile = JSON.parse(localStorage.getItem(STORAGE_DATA)) || {};

  formData.name = profile.name || '';
  formData.age = profile.age || '';
  formData.children = profile.children || [];

  errors.children = formData.children.map(child => ({
    id: child.id,
    name: '',
    age: ''
  }));

})

function addChild() {
  formData.children.push({
    id: childId,
    name: '',
    age: ''
  });

  errors.children.push({
    id: childId,
    name: '',
    age: ''
  });
  childId++
}

function removeChild(id) {
  const index = formData.children.findIndex(item => item.id === id)
  if (index !== -1) {
    formData.children.splice(index, 1);
    errors.children.splice(index, 1);
  }
}

function submitForm() {
  errors.name = '';
  errors.age = '';
  errors.children = [];

  let hasError = false;

  if (!formData.name.trim()) {
    errors.name = ERROR_MESSAGES.REQUIRED_NAME;
    hasError = true;
  }

  if (!formData.age) {
    errors.age = ERROR_MESSAGES.REQUIRED_AGE;
    hasError = true;
  } else if (isNaN(formData.age)) {
    errors.age = ERROR_MESSAGES.INVALID_AGE;
    hasError = true;
  }

  formData.children.forEach((child, index) => {

    errors.children[index] = { id: child.id, name: '', age: '' }

    if (!child.name.trim()) {
      errors.children[index].name = ERROR_MESSAGES.REQUIRED_NAME;
      hasError = true;
    }

    if (!child.age) {
      errors.children[index].age = ERROR_MESSAGES.REQUIRED_AGE;
      hasError = true;
    } else if (isNaN(child.age)) {
      errors.children[index].age = ERROR_MESSAGES.INVALID_AGE;
      hasError = true;
    }
  });

  if (hasError) {
    return;
  }

  const jsonData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_DATA, jsonData)
  router.push('/preview')
}
</script>

<template>
  <section>
    <form action="" class="p-6">
      <div>
        <SectionTitle>
          Персональные данные
        </SectionTitle>
        <div class="space-y-2 mt-5">
          <div>
            <BaseInput label="Имя" placeholder="Петр" v-model="formData.name" />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>
          <div>
            <BaseInput label="Возраст" placeholder="25" typeInput="number" v-model="formData.age" />
            <p v-if="errors.age" class="text-red-500 text-sm">{{ errors.age }}</p>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <div class="flex items-center justify-between">
          <SectionTitle>
            Дети (макс. 5)
          </SectionTitle>
          <button
            v-if="formData.children.length < 5"
            @click.prevent="addChild"
            class="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-[100px] hover:bg-blue-50"
          >
            <span class="text-[40px] leading-none">+</span>
            <span>Добавить ребенка</span>
          </button>
        </div>

        <div v-for="(child, index) in formData.children" :key="child.id" class="mt-5">
          <div class="flex items-center gap-4">
            <div>
              <BaseInput label="Имя" placeholder="Имя" v-model="child.name" />
              <p v-if="errors.children[index] && errors.children[index].name" class="text-red-500 text-sm">
                {{ errors.children[index].name }}
              </p>
            </div>
            <div>
              <BaseInput label="Возраст" placeholder="Возраст" typeInput="number" v-model="child.age" />
              <p v-if="errors.children[index] && errors.children[index].age" class="text-red-500 text-sm">
                {{ errors.children[index].age }}
              </p>
            </div>
            <button @click.prevent="removeChild(child.id)" class="text-primary">Удалить</button>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <button @click.prevent="submitForm" class="block mt-6 px-6 py-2 bg-primary text-white rounded-[100px] hover:opacity-80">
          Сохранить
        </button>
      </div>
    </form>
  </section>
</template>

