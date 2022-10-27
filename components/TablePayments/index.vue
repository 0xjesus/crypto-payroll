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
          <v-btn v-if="mode == 'edit'" icon @click="mode = 'read'">
          <v-icon>
            mdi-content-save
          </v-icon>
        </v-btn>
        </v-toolbar>
      </template>
      <template #body="{ items, headers }" v-if="mode == 'edit'">
        <tbody>
          <tr v-for="(item,idx) in items" :key="idx">
            <td v-for="(header,key) in headers" :key="key">
              <v-edit-dialog
              v-if="header.value != 'actions'"
                :return-value.sync="item[header.value]"
                large
                @save="save"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
              <v-text-field
              clearable
              v-model="item[header.value]"
              >
              </v-text-field>
                <template #input>
                  <v-text-field
                    v-model="item[header.value]"
                    label="Edit"
                    single-line
                  />
                </template>
              </v-edit-dialog>
              <v-row v-else>
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
              </v-row>
            </td>
          </tr>
        </tbody>
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
  data () {
    return {
      mode: 'read'
    }
  },
  methods: {
    editItem (item) {
      this.mode = 'edit'
    },
    deleteItem (item) {
      this.$emit('deleted', item)
    },
    addItem () {
      this.$emit('added')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
