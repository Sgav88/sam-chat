// App.js
import { useConvex } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

type Message = {
  message: string;
};

const Page = () => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatid } = useLocalSearchParams();
  const [user, setUser] = useState<string | null>(null);
  const convex = useConvex();

  const addMessage = () => {
    if (currentMessage.trim().length > 0) {
      setMessages([...messages, { message: currentMessage }]);
      setCurrentMessage("hello"); // Clear the input after adding the message
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

export default Page;
