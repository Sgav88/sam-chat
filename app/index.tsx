//type Message = {
// message: string;
// }
// const [currentMessage, setCurrentMessage] = useState<Message>('')
// const [messages, setMessages] = useState<Message>([])

// const addMessage = async (message : Message)
//  => {
// setMessages([ ...messages, message]);
// }

// in return !!! nu uita sa importi Text input din react-native

// <TextInput value={currentMessage} placeholder={'type something'} />
// <TouchableOpacity onPress(addMessage)>
// <Text>Send</Text>
// </TouchableOpacity>

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";

const Page = () => {
  const groups = useQuery(api.groups.get) || [];
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const loadUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (!user) {
      setTimeout(() => {
        setVisible(true);
      }, 100);
    } else {
      setName(user);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    console.log("userL");

    loadUser();
  }, [AsyncStorage.getItem("user")]);

  const setUser = async () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    const userName = `${name}#${r}`;
    await AsyncStorage.setItem("user", userName);
    setName(userName);
    setVisible(false);
  };
  const handleEmptyUser = async () => {
    await AsyncStorage.removeItem("user");
    setVisible(!visible);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {groups.map((group) => (
          <Link
            href={{ pathname: "[chatid]", params: { chatid: group._id } }}
            key={group._id.toString()}
            asChild
            style={{ padding: 10 }}
          >
            <TouchableOpacity style={styles.group}>
              <Image
                source={{ uri: group.icon_url }}
                style={{ width: 50, height: 50 }}
              />
              <View style={{ flex: 1 }}>
                <Text>{group.name}</Text>
                <Text style={{ color: "#888" }}>{group.description}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>

      <Dialog.Container visible={visible}>
        <Dialog.Title>Username required</Dialog.Title>
        <Dialog.Description>
          Please insert a name to start chatting.
        </Dialog.Description>
        <Dialog.Input onChangeText={setName} />
        <Dialog.Button label="Set name" onPress={setUser} />
      </Dialog.Container>
      <View>
        {!visible && (
          <TouchableOpacity onPress={handleEmptyUser}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f5ea",
  },
  group: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.33,
    shadowRadius: 2.35,
  },
});

export default Page;
