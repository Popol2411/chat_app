import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {

    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  
  } 

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

render() {

  let bgColor = this.props.route.params.bgColor;

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: bgColor, width: '100%', height: '100%' }} >        
      <GiftedChat
        style={styles.giftedChat}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{_id: 1, }}/>
      <Pressable
      onPress={() => this.props.navigation.navigate('Start')}>
        <Text style={styles.startButton}>Go To Start</Text>
      </Pressable>
      </View>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    paddingTop: 35,
    fontSize: 16,
    minHeight: 100,
    alignSelf: 'center',
  },
  giftedChat: {
    color: '#000',
  },
});
