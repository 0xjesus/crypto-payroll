<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="payrolls"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title v-if="title != null">
            {{ title }}
          </v-toolbar-title>
          <v-divider
            v-if="title != null"
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <slot name="toolbar-functionality" />
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn icon @click="editItem(item)">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn icon @click="addItem(item)">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-btn icon @click="deleteItem(item)">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <template #no-data>
        Create your first payroll payment!
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array
    },
    payrolls: {
      type: Array
    },
    title: {
      type: String,
      default: null
    }
  },
  methods: {
    editItem (item) {
      this.$emit('edited', item)
    },
    deleteItem (item) {
      this.$emit('deleted', item)
    },
    addItem (item) {
      this.$emit('added', item)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
