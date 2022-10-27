<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="900px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          light
          class="mb-2"
          v-bind="attrs"
          v-on="on"
        >
          New Payment
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <table-payments
              :headers="headers"
              :payrolls="items"
              @added="newAddr()"
              @deleted="deleteAddr(item)"
              @edited="editAddr(item)"
            />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = !dialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    formTitle: {
      type: String
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Addresses',
          align: 'start',
          sortable: true,
          value: 'addr'
        },
        { text: 'Amount', value: 'amount', align: 'start', sortable: 'true' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false }
      ],
      dialog: false,
      items: [
        {
          addr: '0x...',
          amount: 0.0
        }
      ]
    }
  },
  methods: {
    newAddr () {
      const newAddr = {
        addr: '',
        amount: 0.0
      }

      this.items.push(newAddr)
    },
    deleteAddr (item) {
      const index = this.items.indexOf(item)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
