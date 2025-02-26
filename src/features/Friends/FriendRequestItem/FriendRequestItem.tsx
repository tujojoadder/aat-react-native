import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function FriendRequestItem() {
  return (
    <View style={styles.card}>
      {/* Profile Picture and Names */}
      <View style={styles.topSection}>
        <Image
          source={{
            uri: 'https://imageio.forbes.com/blogs-images/alfredkonuwa/files/2018/01/ROME2-1200x800.jpg?height=474&width=711&fit=bounds',
          }}
          style={styles.profilePic}
        />
        <View style={styles.userNames}>
          <Text style={styles.userNameText} numberOfLines={1}>FriendRequestItem</Text>
          <Text style={styles.userIdentifireText} numberOfLines={1}>@demo132</Text>
        </View>
      </View>

      {/* Buttons with Icons */}
      <View style={styles.buttonCollection}>
        {/* Delete Button */}
        <Button
          mode="outlined"
          style={{}}
          labelStyle={{color: 'black', fontWeight: '600'}}
          icon={() => <MaterialIcons name="cancel" size={20} color="black" />}
          
          >
          Delete
        </Button>

        {/* Confirm Button */}
        <Button
          mode="outlined"
          style={[{backgroundColor: '#1682e8'}]}
          labelStyle={{color: 'white', fontWeight: '600'}}
          icon={() => (
            <MaterialIcons name="check" size={20} color="white" />
          )}>
          Confirm
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  profilePic: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  userNames: {
    flex: 1,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userIdentifireText: {
    fontSize: 14,
    color: '#666',
  },
  buttonCollection: {
    flexDirection: 'row',
   justifyContent:'flex-end',
  gap:15
  },
  
});