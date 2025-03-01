import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

export default function FriendSuggestionItem() {
  return (
    <View style={styles.card}>
      {/* image Section */}
      <Image
        source={{
          uri: 'https://imageio.forbes.com/blogs-images/alfredkonuwa/files/2018/01/ROME2-1200x800.jpg?height=474&width=711&fit=bounds',
        }}
        style={styles.profilePic}
      />
      {/*  */}
      <View>
        <Text style={styles.userName}>Turjo joadder</Text>
        <Text style={styles.userIdentifire}>@turjo123hi10</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 10,
  },
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  userName: {
    fontSize:18,
    fontWeight:'600'
  },
  userIdentifire: {
    color: '#888',
  },
});
