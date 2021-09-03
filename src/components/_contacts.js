import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  forms: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mt: {
    marginTop: [{ unit: 'rem', value: 1 }],
    top: [{ unit: 'px', value: 0 }],
    left: [{ unit: 'px', value: 0 }],
    width: [],
    'screen&&<w768': {
      position: 'relative'
    }
  },
  myforms: {
  },
  loginModal: {
    width: [{ unit: 'vw', value: 40 }],
    height: [{ unit: 'vh', value: 80 }],
    marginLeft: [{ unit: 'vw', value: 30 }],
    marginTop: [{ unit: 'vw', value: 3 }],
    padding: [{ unit: 'rem', value: 2 }, { unit: 'rem', value: 2 }, { unit: 'rem', value: 2 }, { unit: 'rem', value: 2 }],
    border: [{ unit: 'px', value: 0 }]
  }
});
