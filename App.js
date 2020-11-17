import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import { StyleSheet, Animated, PanResponder , View} from 'react-native';

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  calDistance = (point1, point2) => {
    dx = (point1.locationX - point2.locationX)
    dy = (point1.locationY - point2.locationY)
    distance = Math.sqrt(Math.pow(dx, 2)+Math.pow(dy, 2))
    return distance;
  }
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({x:pan.x._value, y:pan.y._value});
      pan.setValue({x:0, y:0});
    },
    onPanResponderMove: (e, gestureState) => {
      const touches = e.nativeEvent.touches
      if(touches.length === 1){
        pan.setValue({x:gestureState.dx, y:gestureState.dy})
      } else if (touches.length >= 2){
        let distance = calDistance(touches[0], touches[1]);
        Animated.spring(scale, {toValue:1+distance/400, friction:5, useNativeDriver: false}).start();
      }
    },
    onPanResponderRelease:() => {
      pan.flattenOffset();
      Animated.spring(scale, {toValue:1, friction:5, useNativeDriver: false,}).start();
    }
  })

  return (
    <View style={styles.container}>
      <Animated.Image {...panResponder.panHandlers}  
      style={[
        pan.getLayout(),
        styles.logo,
        {transform: [{scale: scale}]}
      ]}
      source={require('./assets/it.png')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 180,
    height: 150
  }
});
