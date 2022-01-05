<template>
  <div class="hello text-center">
    <h1>{{ msg }}</h1>
    <button class="btn btn-primary">Dashboard</button>
  </div>
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
