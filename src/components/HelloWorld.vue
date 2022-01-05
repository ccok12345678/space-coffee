<template lang="pug">
.hello.text-center
  h1.hover-bg-gray {{ msg }}
  router-link.btn.btn-primary(to="/dashboard") Dashboard
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
