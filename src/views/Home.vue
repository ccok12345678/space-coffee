<template lang="pug">
.home.text-center
  img.my-3(alt='Vue logo'
    src='https://i.etsystatic.com/6190990/r/il/d6d312/1421734737/il_1588xN.1421734737_dwln.jpg'
    width="200")
  HelloWorld(msg='Welcome to Space Coffee ☕')
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
