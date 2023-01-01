<template>
  <div>
    <v-container>
      <template>
        <main-table :header="headers"
        :payrolls="initialPayrolls"
        :title="'Splitter Payments'"
        >
        <template v-slot:toolbar-functionality>
          <splitter-form :formTitle="'New payment'" />
        </template>
      </main-table>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Date',
        align: 'start',
        sortable: true,
        value: 'date'
      },
      { text: 'Number of payees', value: 'payees' },
      { text: 'Amount', value: 'amount' },
      { text: 'Status', value: 'status' },
      { text: 'Transaction', value: 'transaction_hash' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    payrolls: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    ...mapGetters({
      initialPayrolls: 'userSplitters/initialPayrolls'
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.payrolls.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.payrolls.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.payrolls.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedwItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.payrolls[this.editedIndex], this.editedItem)
      } else {
        this.payrolls.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
