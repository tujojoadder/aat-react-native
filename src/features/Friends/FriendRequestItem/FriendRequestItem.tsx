import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface FriendRequest {
  friend_request_id: string;
  identifier: string;
  profile_picture: string;
  user_fname: string;
  user_id: string;
  user_lname: string;
}
export default function FriendRequestItem({item}:{item:FriendRequest}) {
  const profilePic = `${process.env.REACT_APP_LARAVEL_URL}/${item.profile_picture}`;

  return (
    <View style={styles.card}>
      {/* Profile Picture and Names */}
      <View style={styles.topSection}>
        <Image
          source={{
            uri: profilePic,
          }}
          style={styles.profilePic}
        />
        <View style={styles.userNames}>
          <Text style={styles.userNameText} numberOfLines={1}>{item.user_fname} {item.user_lname}</Text>
          <Text style={styles.userIdentifireText} numberOfLines={1}>@{item.identifier}</Text>
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
   
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom:10,
    paddingHorizontal:10
  
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

  gap:25,
  paddingTop:5
  },
  
});