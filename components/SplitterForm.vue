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
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                Addresses
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                Amount in ETH
              </v-col>
            </v-row>

            <v-row v-for="(item,i) in items" :key="i">
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="item.addr"
                  single-line
                  filled
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="item.amount"
                  single-line
                  filled
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-col class="text-right">
          <v-btn @click="addNewAddr">
            Add address
          </v-btn>
        </v-col>
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
      dialog: false,
      items: [
        {
          addr: '',
          amount: 0.0
        }
      ]
    }
  },
  methods: {
    addNewAddr () {
      const newAddr = {
        addr: '',
        amount: 0.0
      }

      this.items.push(newAddr)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
