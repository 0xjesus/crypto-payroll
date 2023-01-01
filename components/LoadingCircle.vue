<template>
    <v-overlay :value="loading" z-index="999">
      <v-progress-circular
        indeterminate
      />
    </v-overlay>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
  @import '~vuetify/src/components/VStepper/_variables.scss';
.v-progress-circular--indeterminate .v-progress-circular__overlay {
  color: var(--v-primary-base);
}
</style>
