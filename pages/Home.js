import {useState, useEffect} from react;
import { View, Text, TextInput} from "react-native";
import * as SecureStore from "expo-secure-store";

import Botao from "../components/Botao";

export default function DetalhesScreen({navigation}) {
    const [texto, setTexto] = useState("");
    const [textoPersistido, setTextoPersistido] = useState("");
    const [textoSalvoSemPersistencia, setTextoSalvoSemPersistencia] = useState("");

    useEffect(() => {
        SecureStore.getItemAsync("meuTexto").then(setTextoPersistido);
    })

    const salvarTexto = async () => {
        if (texto.trim()) {
            await SecureStore.setItemAsync("meuTexto, texto");
            setTextoPersistido(texto);
            setTextoSalvoSemPersistencia(texto);
            setTexto("");
        } else {
            alert("Insira algo")
        }
    };

    const limparTexto = async () => {
        await SecureStore.deleteItemAsync("meuTexto");
        setTextoPersistido("");
        setTextoSalvoSemPersistencia("");
        alert("Texto apagado!")
    }

    return (
        <View>
          <Text>Persistência e Navegação</Text>
          <TextInput
            placeholder="Digite algo"
            value={texto}
            onChangeText={setTexto}
          />
          <Text>Sem persistência: {textoSalvoSemPersistencia}</Text>
          <Text>Texto persistido: {textoPersistido}</Text>
          <Botao titulo="Salvar" onPress={salvarTexto} />
          <Botao titulo="Limpar" onPress={limparTexto} />
          <Botao
            titulo="Detalhes"
            onPress={() =>
              navigation.navigate("Detalhes", {
                textoNaoPersistido: textoSalvoSemPersistencia,
              })
            }
          />
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        padding: 15,
        backgroundColor: "f5f5f5",
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        margimBottom: 20,
      },
      input: {
        width: "100%",
        padding: 20,
        margimBottom: 15,
        fontSize: 15,
        borderColor: "#ccc"
      },
      text: {
        fontSize: 16,
        color: "#ccc",
        margimBottom: 10,
      },
      buttonContainer: {
        marginTop: 15,
        with: "100%"
      }
    })

