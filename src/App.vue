<template>
  <div class="flex flex-col h-screen">
  <HeaderComponent />

  <router-view />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
export default {
  components: {
    HeaderComponent
  }
};
</script>