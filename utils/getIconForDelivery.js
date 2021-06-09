/* eslint-disable global-require */

const images = {
  sent: require('../assets/icons/sent.png'),
  relay: require('../assets/icons/relay.png'),
  shipping: require('../assets/icons/shipping.png'),
  error: require('../assets/icons/error.png')
}

export default delivery => images[delivery];
