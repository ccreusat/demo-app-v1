/* eslint-disable global-require */

const images = {
  R1: require('../assets/images/quiz/r1.png'),
  R2: require('../assets/images/quiz/r2.png'),
  R3: require('../assets/images/quiz/r3.png'),
  R4: require('../assets/images/quiz/r4.png'),
  R5: require('../assets/images/quiz/r5.png'),
  B1: require('../assets/images/quiz/b1.png'),
  B2: require('../assets/images/quiz/b2.png'),
  B3: require('../assets/images/quiz/b3.png'),
  B4: require('../assets/images/quiz/b4.png'),
}

export default label => images[label];