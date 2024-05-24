import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Define the Message type
type Message = {
  message: string;
};

const test = () => {
  // State for current message and list of messages
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Function to add a message to the list
  const addMessage = () => {
    if (currentMessage.trim().length > 0) {
      setMessages([...messages, { message: currentMessage }]);
      setCurrentMessage(""); // Clear the input after adding the message
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={currentMessage}
        placeholder="Type something"
        onChangeText={(text) => setCurrentMessage(text)}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={addMessage} style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <View>
        {messages.map((msg, index) => (
          <Text key={index}>{msg.message}</Text>
        ))}
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default test;
