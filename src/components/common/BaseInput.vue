<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  typeInput: {
    type: String,
    default: 'text'
  },

})
</script>

<template>
  <div class="relative">
    <label
      v-if="label"
      class="absolute top-2 left-4 text-[13px] text-gray-400" >
      {{ label }}
    </label>
    <input
      :type="typeInput"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full h-full border border-[#F1F1F1] rounded-md px-4 pt-8 pb-3 focus:outline-none focus:border-blue-500"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped lang="postcss">

</style>

