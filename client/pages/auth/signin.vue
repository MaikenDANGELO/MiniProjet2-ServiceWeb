<template>
  <div class="flex flex-rows gap-5 m-5">
    <InputText v-model="email" placeholder="E-Mail" />
    <Password v-model="password" placeholder="Password" />
    <Button label="SignIn" icon="pi pi-sign-in" @click="signin"  />
    {{ res }}
  </div>
</template>

<script lang="ts" setup>
const email = ref("");
const password = ref("");
const res = ref({});
const { SignIn } = useAuth();

async function signin() {
  res.value = await SignIn(email.value, password.value);
}
</script>

<style>

</style>