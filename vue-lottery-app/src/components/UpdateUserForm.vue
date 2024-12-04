<script setup lang="ts">
import {computed, ref, watch} from "vue";
import VueButton from "@/components/VueButton.vue";
import VueInput from "@/components/VueInput.vue";
import type {User} from "@/models/user";

const props = defineProps<{
  user: User | null
}>();

const userToUpdate = ref<User>({
  name: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: null
});

watch(
    () => props.user,
    (newUser) => {
      if(newUser){
        userToUpdate.value = newUser;
      }
    },
    {immediate: true}
);

const emit = defineEmits(['update-user']);

const formSubmitted = ref(false);

const emailIsValid = computed(() => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(userToUpdate.value.email || '');
});

const phoneNumberIsValid = computed(() => {
  const regex = /^\+?3?8?(0\d{9})$/;
  return regex.test(userToUpdate.value.phoneNumber || '');
})

const usernameIsValid = computed(() => {
  return userToUpdate.value.name;
});

const dateOfBirthIsValid = computed(() => {
  return userToUpdate.value.dateOfBirth && new Date(userToUpdate.value.dateOfBirth) < new Date();
});
const onSubmit = () => {
  formSubmitted.value = true;
  let isValid = true;

  if (!emailIsValid.value) {
    isValid = false;
  }

  if (!phoneNumberIsValid.value) {
    isValid = false;
  }

  if (!usernameIsValid.value) {
    isValid = false;
  }

  if (!dateOfBirthIsValid.value) {
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  emit('update-user', {...userToUpdate.value});
}
</script>

<template>
  <div class="modal fade" id="updateUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <form @submit.prevent="onSubmit" class="needs-validation" novalidate>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Update User</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <VueInput id="name"
                        :class="{ 'is-invalid': formSubmitted && !usernameIsValid, 'is-valid': usernameIsValid}"
                        placeholder="Enter user name" v-model="userToUpdate.name" type="text"></VueInput>
              <div class="invalid-feedback">
                Username is required.
              </div>
            </div>

            <div class="mb-3">
              <label for="dob" class="form-label">Date of Birth</label>
              <VueInput id="dob"
                        :class="{ 'is-invalid': formSubmitted && !dateOfBirthIsValid, 'is-valid': dateOfBirthIsValid }"
                        v-model="userToUpdate.dateOfBirth" placeholder="Enter date of birth" type="date"></VueInput>
              <div class="invalid-feedback">
                Date of Birth is required and should be less than present.
              </div>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <VueInput :disabled="true" id="email"
                        :class="{ 'is-invalid': formSubmitted && !emailIsValid, 'is-valid': emailIsValid }"
                        placeholder="Enter email" type="text" v-model="userToUpdate.email"></VueInput>
              <div class="invalid-feedback">
                Email is required and should be in valid format.
              </div>
            </div>

            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <VueInput id="phoneNumber" v-model="userToUpdate.phoneNumber" pattern="^\+?3?8?(0\d{9})$"
                        :class="{ 'is-invalid': formSubmitted && !phoneNumberIsValid, 'is-valid': phoneNumberIsValid }"
                        placeholder="Enter phone number" type="text"></VueInput>
              <div class="invalid-feedback">
                Phone Number is required and should be in valid format for Ukraine.
              </div>
            </div>

            <div class="d-flex justify-content-end">

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
            <VueButton button-type="submit" button-style="primary" data-bs-dismiss="modal">Submit</VueButton>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>