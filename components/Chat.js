import React from 'react';
import { View, StyleSheet, Pressable, Text, Platform, KeyboardAvoidingView, } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import 'firebase/firestore';


export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      loggedInText: 'Please wait, you are getting logged in',
      user: {
        _id: '',
        name: '',
        avatar: 'https://placeimg.com/140/140/any',
      },
      isConnected: false,
    }

    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDjdBwjHTFP9mTQFTtkwlXS84V0BpoCzbU",
      authDomain: "chat-app-207a0.firebaseapp.com",
      projectId: "chat-app-207a0",
      storageBucket: "chat-app-207a0.appspot.com",
      messagingSenderId: "635436942395",
      appId: "1:635436942395:web:915dbd9a714b9143ab081e",
      measurementId: "G-TFB3BMRBL4"
    };

    //  Initialize database with config-data

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }

    // reference the database
    this.referenceChatMessages = firebase.firestore().collection('messages')
    this.refMsgsUser = null
    }

  // Retrieve messages from async storage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Save messages to async storage

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Delete messages from async storage

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

   componentDidMount() {

    // Get prop username from start screen
    let name = this.props.route.params.name
    // Check if props empty
    if (name === '') name = 'anonymous user'
    // Set title to username
    this.props.navigation.setOptions({ title: name })

    
    // Authentication events
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
     // Update user
      this.setState({
        uid: user.uid,
        user: {
          _id: user.uid,
          name: name,
          avatar: 'https://i.pravatar.cc/150?u=${user.uid}',
        },
      });

      // Referencing messages of current user
      this.refMsgsUser = firebase
      .firestore()
      .collection('messages')
      .where('uid', '==', user.uid)
    })

    // Check if user is online

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        
        this.setState({ isConnected: true })
        console.log('online')

        // Listens for updates in the collection
        this.unsubscribe = this.referenceChatMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate)


        // save messages if user is online
        this.saveMessages()
      } else {
        // if the user is offline
        this.setState({ isConnected: false })
        console.log('offline')
        // retrieve messages from AsyncStorage
        this.getMessages()
      }
    })
   }

      // Adding message to the database
      addMessage() {
        const message = this.state.messages[0]
        // Add a new message to the firebase collection
        this.referenceChatMessages.add({
          uid: this.state.uid,
          _id: message._id,
          text: message.text || '',
          createdAt: message.createdAt,
          user: this.state.user,
          image: message.image || '',
          location: message.location || null,
        })
      }

      componentWillUnmount() {
        if (this.state.isConnected) {
          // stop listening to authentication
          this.authUnsubscribe()
          // stop listening for changes
          this.unsubscribe()
        }
      }

      // Updated message state
   onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
     });
    });
    this.setState({
      messages: messages,
    });
    this.saveMessages()
  };



    // User sends a message

    onSend(messages = []) {
      this.setState(
        (previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }),
        () => {
          this.addMessage()
          this.saveMessages()
        }
      )
    }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'orange'
          },
          left: {
            backgroundColor: 'yellow',
          },
        }}
      />
    );
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  // Chat input field is hidden if the user is not connected

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }

  // CustomActions function 

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

render() {

  let bgColor = this.props.route.params.bgColor;

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: bgColor, width: '100%', height: '100%' }} >        
      <GiftedChat
        style={styles.giftedChat}
        renderBubble={this.renderBubble.bind(this)}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        messages={this.state.messages}
        showUserAvatar= {true}
        renderActions={this.renderCustomActions}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.user._id,
          name: this.state.name,
          avatar: this.state.avatar,  
         }}/>
     { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      <Pressable
      onPress={() => this.props.navigation.navigate('Start')}>
        <Text style={styles.startButton}>Go To Start</Text>
      </Pressable>     
      </View>
    </View>
  );
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
