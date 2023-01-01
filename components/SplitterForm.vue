<template>
  <div>
    <v-dialog
      v-model="dialog"
      min-width="900px"
      max-width="auto"
    >
      <template #activator="{ on: dialog }">
        <v-tooltip v-if="!isAuth" bottom>
          <template #activator="{ on }">
            <div v-on="{...on, ...dialog}">
              <v-btn
                disabled
                color="primary"
                light
                class="mb-2 myClass"
              >
                New Payment
              </v-btn>
            </div>
          </template>
          <span>Connect your wallet before submitting transactions</span>
        </v-tooltip>
        <template>
          <v-btn
            v-show="isAuth"
            color="primary"
            light
            class="mb-2 myClass"
            v-on="dialog"
          >
            New Payment
          </v-btn>
        </template>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <table-payments
              :headers="headers"
              :items="items"
              @added="newAddr"
              @bulk="bulkAdd"
              @deleted="deleteAddr"
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
            :disabled="items.length == 0"
            @click="createSplitter()"
          >
            Create
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="test()"
          >
            Test
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
          value: 'address'
        },
        { text: 'Amount', value: 'amount', align: 'start', sortable: 'true' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false }
      ],
      dialog: false,
      items: [
      ]
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'authWallet/isAuth'
    })
  },
  methods: {
    async test () {
      // console.log(this.$etherToWei(80))
      const contractInstance = await this.$PSHandler()
      const res = await contractInstance.connect(await this.$MeSigner())._splitters_counter()
      this.$notifier.showMessage({ toastContent: res, toastColor: 'success' })
    /*       this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 200)
      this.$notifier.showMessage({ toastContent: 'Splitter created successfully', toastColor: 'info' }) */
    },
    async createSplitter () {
      const obj = this
      const payees = this.items.map(function (el) { return el.address })
      const amount = this.items.map(function (el) { return obj.$etherToWei(el.amount) })
      try {
        this.$nuxt.$loading.start()
        const contractInstance = await this.$PSHandler()
        await contractInstance.connect(await this.$MeSigner()).createSplitter(payees, amount)
        this.$nuxt.$loading.finish()
        this.$notifier.showMessage({ toastContent: 'Transactions submitted successfully', toastColor: 'success' })
      } catch (error) {
        this.$nuxt.$loading.finish()
        this.$notifier.showMessage({ toastContent: error, toastColor: 'error' })
      }
    },
    bulkAdd (objects) {
      this.items = this.items.concat(objects)
    },
    newAddr () {
      const newAddr = {
        address: '0x...',
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

<style lang="css" scoped>
.myClass:focus::before {
  opacity: 0 !important;
}
</style>
