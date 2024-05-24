import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
const Page = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const router = useRouter();
  const startGroup = useMutation(api.groups.create);
  const onCreateGroup = async () => {
    await startGroup({
      name,
      description: desc,
      icon_url: icon,
    });
    router.back();
  };
  return (
    <KeyboardAvoidingView style={styles.continer}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.TextInput}
        value={name}
        onChangeText={setName}
      ></TextInput>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.TextInput}
        value={desc}
        onChangeText={setDesc}
      ></TextInput>

      <Text style={styles.label}>icon URL</Text>
      <TextInput
        style={styles.TextInput}
        value={icon}
        onChangeText={setIcon}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={onCreateGroup}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: "#f8f5ea",
    padding: 10,
  },
  label: {},
  TextInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    minHeight: 40,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#EEA217",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Page;
