import React from 'react';
import { View, StyleSheet, Pressable, Text, Platform, KeyboardAvoidingView, } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

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
          text: 'Hello ' + this.props.route.params.name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
       {
          _id: 2,
          text: 'Hello ' + this.props.route.params.name + ' and welcome to the chat!',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  
  } 

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'orange'
          }
        }}
      />
    );
  }

render() {

  let bgColor = this.props.route.params.bgColor;

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: bgColor, width: '100%', height: '100%' }} >        
      <GiftedChat
        style={styles.giftedChat}
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{_id: 1, }}/>
     { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
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
    fontSize: 16,
    minHeight: 50,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 20,
    textAlignVertical: 'center',
  },
  giftedChat: {
    color: '#000',
  },
});
