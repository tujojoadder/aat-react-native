import { StyleSheet } from "react-native";

export const AppbarStyleSheet = StyleSheet.create({
    animatedAppBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff', // Ensure background color for shadow effect
        zIndex: 1,
      },
      appBar: {
        
        elevation: 3,
        height: 55,
      },
    
      title: {
        fontSize: 20,
        color: '#333',
      
        fontWeight: 'bold',
      },
      body:{
        paddingTop:60
      }

})