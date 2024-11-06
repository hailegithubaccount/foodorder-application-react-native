import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-web'

import { useRouter } from 'expo-router';

export default function cover() {
    const router = useRouter()
  return (
    <View>
          
     <Image   style={ {width:300,height:300, alignItems:'center',justifyContent:'center',marginTop:200,marginLeft:50,borderRadius:500}}
             source={{ uri: 'https://i.pinimg.com/736x/ca/60/3a/ca603a4e3c6d703be9f80135de170a4c.jpg' }}

             />

     <TouchableOpacity 
        style={{border:2,borderWidth:2,width:200,height:50,borderColor:'black',margin:'auto',backgroundColor:'yellow'}}
     onPress={() => router.push('/(tabs)/explore')}>
                <Text style={{ color: 'blue', marginTop:10,alignItems:'center',justifyContent:'center',paddingLeft:60,fontSize:20 }}>welcome</Text>
            </TouchableOpacity>
                   
 
    </View>
  )
}
