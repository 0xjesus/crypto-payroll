<template>
  <v-snackbar v-model="show" :color="color" style="{text-overflow: ellipsis!important;}">
    {{ message }}
    <v-btn text @click="show = false">
      Close
    </v-btn>
    <v-btn text @click="dialog = true">
      See more
    </v-btn>
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      show: false,
      message: '',
      color: '',
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      toast: 'utilities/toast'
    })
  },
  created () {
    this.$store.subscribe((mutations) => {
      if (mutations.type === 'utilities/SET_TOAST_PROPTERTIES') {
        this.message = this.toast.toastContent
        this.color = this.toast.toastColor
        this.show = true
      }
    })
  }
}
</script>
<style>
     .v-snack__content{
      overflow: hidden;
      text-overflow: ellipsis;
     }

</style>
