<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="payrolls"
      sort-by="calories"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <splitter-form :formTitle="'New payment'" />
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
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
      type: String
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
