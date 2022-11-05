<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import FacebookView from '@/views/FacebookView.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
  <suspense>
    <FacebookView />
  </suspense>
</template>
