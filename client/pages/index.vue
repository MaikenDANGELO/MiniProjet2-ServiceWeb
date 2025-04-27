<template>
  <div>
    <h1>Bienvenue</h1>
    <div>
      <h2>Public</h2>
      <p>{{ publicRes }}</p>
    </div>
    <div>
      <h2>Private</h2>
      <p>{{ privateRes }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTest } from '~/composables/test';


const publicRes = ref({});
const privateRes = ref({});
const tests = useTest();

onMounted(async () => {
  publicRes.value = await tests.getPublic();
  privateRes.value = await tests.getPrivate();
})
</script>

<style>

</style>