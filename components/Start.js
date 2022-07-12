import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Pressable } from 'react-native'; //all used components must be imported in order for the app to work and be displayed. If one of these is missing, the app won´t display!


const image = require('../assets/Background_Image.png');

export default class Start extends React.Component {  //the "Start" component is being exported. Since it is a part of a React component, we add "extends React.Component"
  constructor(props){ //the constructor always uses props by default
    super(props); //for children "super(props)" needs to be added
    this.state={name: ""}; //the initial state of "name" is an empty string, this is what will be displayed when the user sees this component for the first time. Since it is a state, it can be modified by the user
  }

  // Change of background color from the user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  // Different background colors
  colors = {
    black: '#090C08',
    purple: '#474056',
    blue: '#8A95A5',
    green: '#B9C6AE',
  };

  render() {
    return (
      <View style={styles.container}> 
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>

      <Text style={styles.title}>Welcome to the Chat App</Text>

      <View style={styles.welcomeBox}>

      <View style={styles.userWelcome}>
        
        <TextInput
        style={styles.userNameInput}
        onChangeText={(name) => this.setState({name})} /*this function means that when the state of "name", which is an empty string first, is being changed, it should become the new, updated, state*/
        value={this.state.name} /*since the TextInput field also has a "value", it´s value will become the new name set as a state*/
        placeholder="Type your name here..."/> 
      </View>

      <View style={styles.colorBox}>
            <Text style={styles.colorText}>Choose Your Background Color:</Text>
            </View>

            <View style={styles.colorArray}>
              <TouchableOpacity
                style={styles.color1}
                onPress={() => this.changeBgColor(this.colors.black)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color2}
                onPress={() => this.changeBgColor(this.colors.purple)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color3}
                onPress={() => this.changeBgColor(this.colors.blue)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color4}
                onPress={() => this.changeBgColor(this.colors.green)}
              ></TouchableOpacity>
            </View>

            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
},
  icon: {
    width: 15,
    height: 15,
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 100,
  },
  welcomeBox: {
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '44%',
    width: '88%',
    padding: 20,
  },  
  userWelcome: {
    backgroundColor: 'lightgreen',
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: 'column',
    width: '100%',
  },
  userNameInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    borderWidth: 3,
    borderColor: '#757083',
    textAlign: 'left',
    padding: 20,
    width: '88%',
    alignSelf: 'center',
  },
  colorBox: {
    flexDirection: 'column',
    width: '88%',
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
    paddingBottom: 25,
  },
  colorArray: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '88%',
    paddingBottom: 50,
  },
  color1: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  color2: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  color3: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  color4: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
    button: {
      flexDirection: 'column',
      backgroundColor: '#757083',
      width: '88%',
  },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
      padding: 30,
  },    
 });