<script setup lang="ts">
import {ref} from "vue";
import VueInput from "@/components/VueInput.vue";
import VueButton from "@/components/VueButton.vue";

const query = ref<string>('');
const emit = defineEmits(['search']);
const handleSearch = (query: string) => {
  emit('search', query);
};
</script>

<template>
  <div class="d-flex gap-1">
    <VueInput @update:modelValue="handleSearch" v-model="query" id="search-query" class="" placeholder="Search by name..." type="text"></VueInput>
    <VueButton @onClick="() => handleSearch('')" button-type="button" button-style="secondary">Reset</VueButton>
  </div>
</template>

<style scoped>

</style>