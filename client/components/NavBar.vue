<template>
  <div>
    <Menubar>
      <template #start>
        <NuxtLink to="/">
          <Button icon="pi pi-home" label="Home" text plain />
        </NuxtLink>
        <NuxtLink to="/auth/signin">
          <Button icon="pi pi-user" label="Sign in" text plain />
        </NuxtLink>
        <NuxtLink to="/auth/signup">
          <Button icon="pi pi-sign-in" label="Sign up" text plain />
        </NuxtLink>
      </template>
    </Menubar>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>