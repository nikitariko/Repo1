<script setup lang="ts">
import type {ButtonStyle} from "@/models/button-style";
import type {ButtonType} from "@/models/button-type";

defineProps<{
  buttonStyle: ButtonStyle,
  buttonType: ButtonType,
  disabled?: boolean
}>();

defineEmits(['onClick']);
</script>

<template>
  <button :disabled="disabled ?? true" :type="buttonType" class="btn" :class="'btn-' + buttonStyle" @click="$emit('onClick')">
    <slot></slot>
  </button>
</template>