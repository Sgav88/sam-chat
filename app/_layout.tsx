import { Link, Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v } from "convex/values";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayoutNav() {
  // const [isUser, setIsUser] = useState<boolean>(false);
  // const handleEmptyUser = async () => {
  //   await AsyncStorage.removeItem("user");
  // };
  // useEffect(() => {
  //   console.log("userOut");
  //   const getUser = async () => {
  //     const res = await AsyncStorage.getItem("user");
  //     if (res) {
  //       setIsUser(true);
  //     } else {
  //       setIsUser(false);
  //     }
  //   };
  //   getUser();
  // }, [AsyncStorage.getItem("user")]);
  return (
    <ConvexProvider client={convex}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#EAA350" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "My Chats",
            headerRight: () => (
              <Link href={"create"} asChild>
                <TouchableOpacity>
                  <Ionicons name="add" size={32} color="white" />
                </TouchableOpacity>
              </Link>
            ),
            headerLeft: () => (
              <View>
                {/* {isUser && (
              //     <TouchableOpacity onPress={handleEmptyUser}>
              //       <Text>Log Out</Text>
              //     </TouchableOpacity>
              //   )} */}
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            headerTitle: "Start a Chat",
            presentation: "modal",
            headerLeft: () => (
              <Link href={"/"} asChild>
                <TouchableOpacity>
                  <Ionicons name="close-outline" size={32} color="white" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen name="[chatid]" options={{ headerTitle: "" }} />
      </Stack>
    </ConvexProvider>
  );
}
