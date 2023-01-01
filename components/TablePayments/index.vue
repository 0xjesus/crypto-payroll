<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="computedContents"
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
          <v-file-input
            accept=".csv"
            label="Upload CSV file"
            placeholder="Select your CSV file"
            clearable
            @change="handleFile"
            @click:clear="clearState"
          />
          <v-btn v-if="mode == 'edit'" icon @click="mode = 'read'">
            <v-btn icon>
              <v-icon>
                mdi-content-save
              </v-icon>
            </v-btn>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-if="mode == 'edit'" #body="{ items, headers }">
        <tbody>
          <tr v-for="(item,idx) in items" :key="idx">
            <td v-for="(header,key) in headers" :key="key">
              <v-edit-dialog
                v-if="header.value != 'actions'"
                :return-value.sync="item[header.value]"
                large
              >
                <v-text-field
                  v-model="item[header.value]"
                  clearable
                />
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
                <v-btn icon :disabled="items.length == 1" @click="deleteItem(item)">
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
        <v-btn icon :disabled="items.length == 1" @click="deleteItem(item)">
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
    title: {
      type: String,
      default: null
    },
    items: {
      type: Array
    }
  },
  data () {
    return {
      contentsTable: [],
      mode: 'read',
      cleared: false
    }
  },
  computed: {
    computedContents () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.contentsTable = [...this.items]
      return this.contentsTable
    }
  },
  methods: {
    clearState () {
      this.cleared = true
      const clearContents = []
      this.$emit('bulk', clearContents)
    },
    handleFile (value) {
      if (this.cleared === true) {
        this.cleared = false
        return
      }
      const reader = new FileReader()
      const obj = this
      reader.readAsText(value)
      reader.onload = () => {
        const textFile = reader.result
        const lines = textFile.split('\n')
        const header = lines[0].split(',')
        const output = lines.slice(1).map((line) => {
          const fields = line.split(',')
          return Object.fromEntries(header.map((h, i) => [h, fields[i]]))
        })
        output.pop()
        obj.emitBulk(output)
      }
    },
    emitBulk (objs) {
      this.$emit('bulk', objs)
    },
    editItem (item) {
      this.mode = 'edit'
    },
    deleteItem (item) {
      this.$emit('deleted', item)
    },
    addItem () {
      this.$emit('added')
    }
  },
  destroy () {
    this.mode = 'read'
    this.cleared = true
  }
}
</script>

<style lang="scss" scoped>

</style>
