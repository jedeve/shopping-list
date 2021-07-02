<template>
  <section>
      <h2 class="total-text">Total €{{ totalPrice }}</h2>
  </section>
</template>

<script>
export default {
    computed: {
        totalPrice() {
            return this.$store.getters.totalPrice
        }
    }
}
</script>

<style scoped>
.total-text{
    display: flex;
    justify-content: flex-end;
}
</style>