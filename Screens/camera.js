import React from 'react';
import { StyleSheet, Text, View,Button,Image,Platform } from 'react-native';
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
export default class Camera extends React.Component {
    state = {
        image : null
    }

    render(){
      
        let {image} = this.state
  return (
    
<View>
    <Button title = "Pick Image" onPress = {this.PickImage}>

    </Button>
    </View>
  )
    }

componentDidMount(){
    this.getPermissionAsync();

}  

getPermissionAsync = async()=>{
    if(Platform.OS!== "web"){
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(status !== 'granted'){
            alert("Please grant permission")
        }
    }
}
uploadImage=async(uri)=>{
    const data = new FormData()
    let file_name = uri.split("/")[uri.split("/").length - 1]
    let type = 'image/${uri.split(".")[uri.split(".").length - 1]}'
    const file_to_upload = {
        uri: uri,
        name : file_name,
        type : type

    }
    data.append("digit",file_to_upload)
    fetch("http://4ccf-2405-201-e018-d097-2dc2-4cc4-6646-adf4.ngrok.io",{
        method:"POST",
        body : data,
        headers : {
            "content-type" : "multipart/form-data"
        }
    })
    .then(
        (response) =>response.json()
    )
    
    .then(
        (result)=> {console.log("SUCCESS!!!!!",result)}
    )
    .catch((error)=>{console.error("error mesg : ",error)})

    
    
}

PickImage = async()=>{
try{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[4,3],
        quality:1
    })

if(!result.cancelled){
    this.setState({
        image:result.data
    })
    console.log(result.uri)
    this.uploadImage(result.uri)
}
}
catch(E){
    console.log(E)
}
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
