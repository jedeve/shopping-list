<template>
  <button class="category-button">
      <slot>
      </slot>
  </button>
</template>

<script>
export default {
  props: []
}
</script>

<style>
.category-button {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.3rem;
  margin-right: 0.2rem;
  max-width: fit-content;
  position: relative;
    right:    0px;
    bottom:   -15px;

}

</style>
