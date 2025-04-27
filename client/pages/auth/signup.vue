<template>
  <div class="flex flex-rows gap-5 m-5">
    <InputText v-model="firstName" placeholder="First Name" />
    <InputText v-model="lastName" placeholder="Last Name" />
    <InputText v-model="email" placeholder="E-Mail" />
    <Password v-model="password" placeholder="Password" />
    <Button label="SignUp" icon="pi pi-sign-in" @click="signup"  />
    {{ res }}
  </div>
</template>

<script lang="ts" setup>
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const res = ref({});
const { SignUp } = useAuth();

async function signup() {
  res.value = await SignUp(firstName.value, lastName.value, email.value, password.value);
}
</script>

<style>

</style>