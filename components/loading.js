import React from 'react';
import _ from 'lodash';
import {
    Modal,
    Image,
    StyleSheet,
    View,
} from 'react-native';

const AppLoader = ({isVisible, close}) => (
  <Modal
    transparent={true}
    style={styles.modalContainer}
    animationType="fade"
    visible={isVisible}
    onRequestClose={close}
  >
    <View style={styles.container}>
      <Image source={require('assets/images/loading/loader.gif')} style={{width: 200, height: 200}} />
    </View>
  </Modal>
);

export default AppLoader;

const styles = StyleSheet.create({
  modalContainer: {
    position: 'relative',
    flex:1,
    alignItems: 'center',
    justifyContent:'center',    
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',  
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
});
