<template>
  <div>
    <v-app-bar
      elevate-on-scroll
      light
      app
    >
      <v-btn
        text
        color="transparent"
        to="/"
      />
      <v-spacer />
      <template v-if="!$vuetify.breakpoint.mobile">
        <v-menu v-for="(item, i) in appbaritems" :key="i" offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              active-class="red--text text--ligthen-4"
              exact
              text
              v-bind="attrs"
              :to="item.is_parent ? '' : item.to"
              v-on="on"
            >
              {{ item.name }}
            </v-btn>
          </template>
          <v-list v-if="item.is_parent">
            <v-list-item-group v-model="selectedItem" color="red">
              <v-list-item
                v-for="(it, index) in item.listitems"
                :key="index"
                :to="it.to"
              >
                <v-list-item-title>{{ it.name }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-btn v-if="!$vuetify.breakpoint.mobile && currentAccount == null" @click="connectWallet">
          Connect Wallet
        </v-btn>

        <v-chip
          v-else
          color="indigo"
          text-color="white"
        >
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          {{ currentAccount }}
        </v-chip>
      </template>
      <v-menu v-else transition="scale-transition">
        <template #activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon light>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-card light>
          <v-list color="transparent">
            <v-list-item v-for="(item, i) in appbaritems" :key="i" :to="item.to">
              <v-list-item-title v-text="item.name" />
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item>
              <v-btn v-if="currentAccount == null">
                Connect Wallet
              </v-btn>
              <v-list-item-title v-else>
                {{ currentAccount }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { ethers } from 'ethers'

export default {
  data: () => ({
    currentSigner: null,
    currentAccount: null,
    provider: null,
    selectedItem: null,
    appbaritems: [
      {
        name: 'Dashboard',
        is_parent: false
      },
      {
        name: 'Analytics',
        is_parent: false
      },
      {
        name: 'How to use it',
        is_parent: false
      }
    ]
  }),
  computed: {
    reactiveAccount () {
      return this.currentAccount
    }
  },
  mounted () {
    const here = this
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any'
    )
    here.provider = provider
    provider.on('network', (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload()
      }
    })
    provider.provider.on('accountsChanged', function (accounts) {
      // eslint-disable-next-line no-undef, no-console
      console.log('Account changed!!')
      here.currentAccount = accounts[0]
    })
  },
  methods: {
    async connectWallet () {
      await this.provider.send('eth_requestAccounts', [])
      const signer = await this.provider.getSigner()
      this.currentAccount = await signer.getAddress()
      this.currentSigner = signer
    },
    goto () {
      this.$router.push('/')
    }
  }
}
</script>

  <style lang="scss" scoped>
  .v-btn {
  }
  </style>
