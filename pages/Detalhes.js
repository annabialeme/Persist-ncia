import {useState, useEffect} from react;
import { View, Text, StyleSheet} from "react-native";
import * as SecureStore from "expo-secure-store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import TextoExibido from "../components/Text";
import peopleInfo from "..data/people";

export default function DetalhesScreen({route}) {
    const {textoNaoPersistido} = route.params;
    const {textoPersistido, setTextoPersistido} = useState("");

    useEffect(() => {
        SecureStore.getItemAsync("meuTexto").then((textoSalvo) => {
            if (textoSalvo) {
                setTextoPersistido(textoSalvo);
            }
        });
    })
}

return (
    <View>
        <Text>Detalhes</Text>
        <TextoExibido titulo ="Sem persistência" texto={textoNaoPersistido} />
        <TextoExibido titulo = "Persistência" texto ={textoPersistido} />
        <Text>Pessoas:</Text>
        {peopleInfo.map((person, index) => (
            <Text key={index}>
                {person.name} - {person.emoji}
            </Text>
        )
    )}

    <FontAwesome name="home" size={24} color="black" />
    <Entypo name = "add user" size={24} color = "black" />
    <MaterialIcons name = "restaurant menu" size={150} color = "red" />

    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "333",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 10,
    },
    peopleContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    personText: {
        fontSize: 16,
        color: "#444",
        marginVertical: 5,
    },
    iconsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
})