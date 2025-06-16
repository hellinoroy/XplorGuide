import { View, Text, Pressable, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useState} from "react";

import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


export default function TaskScreen(){
    const params = useLocalSearchParams()
    const [ clicked , setClicked ] = useState(false)
    const [ taskName, setTaskName ] = useState(params["id"].toString())
    const [ deskripsi, setDeskripsi ] = useState(`Deskripsi ${ params["id"].toString()}`)
    // console.log(params)
    // cuma nerima nama, kalo semuanya berantakan. fetch ke database kalo mau bersih
    return(
        <SafeAreaView className="bg-white flex flex-col h-full">
            <Text className="text-4xl font-bold text-custom-text py-8 self-center">{ params["id"] }</Text>

            <View className="flex flex-row pl-5">
                <Pressable onPress={() => { setClicked(!clicked) }} className="mr-8">
                    <FontAwesomeIcon icon={ clicked ? faStarSolid : faStarRegular } color="#0D99FF" /> 
                </Pressable>

                <FontAwesomeIcon icon={ faCalendar } color="#0D99FF"  />
                <Text className="px-2 text-custom-text">11 Apr 2025</Text>
            </View>            

            <View className="bg-custom-grey mx-5 my-3 py-5 px-3 rounded">
                <TextInput className="px-2 text-custom-text" value={taskName} onChangeText={setTaskName} />
            </View>

            <View className="bg-custom-grey mx-5 my-3 pt-5 pb-52 px-3 rounded">
                <TextInput className="px-2 text-custom-text" value={ deskripsi } onChangeText={setDeskripsi} />
            </View>
            
            <Pressable className="bg-custom-dark mx-5 my-3 py-5 px-3 rounded"><Text className="text-white text-center font-bold text-2xl">Simpan</Text></Pressable>




        </SafeAreaView>
    )






    
}