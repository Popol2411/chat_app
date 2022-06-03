import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';

export default class Chat extends React.Component {
  render() {

    let bgColor = this.props.route.params.bgColor;

    return (
      <View style={styles.container}>
        <View
          style={{ backgroundColor: bgColor, width: '100%', height: '100%' }}
        ></View>
        <Pressable
        onPress={() => this.props.navigation.navigate('Start')}>
          <Text style={styles.startButton}>Go To Start</Text>
        </Pressable>
      </View>
    );
  }

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    paddingTop: 10,
    fontSize: 16,
    minHeight: 100,
  },
});
