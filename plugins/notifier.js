export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ toastContent = '', toastColor = '' }) {
      store.dispatch('utilities/showMessage', { toastContent, toastColor })
    }
  })
}
