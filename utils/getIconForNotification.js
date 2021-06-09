/* eslint-disable global-require */

const images = {
  action: require('../assets/images/notification/notification-icon-action-correct.png'),
  alert: require('../assets/images/notification/notification-icon-alert.png'),
  eshop: require('../assets/images/notification/notification-icon-eshop.png'),
  favorite: require('../assets/images/notification/notification-icon-favorite.png'),
  flash: require('../assets/images/notification/notification-icon-flash.png'),
  shipping: require('../assets/images/notification/notification-icon-shipping.png'),
  shop: require('../assets/images/notification/notification-icon-shop.png'),
  timer: require('../assets/images/notification/notification-icon-timer.png')
}

export default notification => images[notification];
