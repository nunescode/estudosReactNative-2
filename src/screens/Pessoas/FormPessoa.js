import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function FormPessoa({ navigation, route }) {

  const { acao, pessoa: pessoaAntiga } = route.params;

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [turno, setTurno] = useState("");
  const [curso, setCurso] = useState("");

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    console.log("pessoa -> ", pessoaAntiga);

    if (pessoaAntiga) {
      setNome(pessoaAntiga.nome);
      setMatricula(pessoaAntiga.matricula);
      setTurno(pessoaAntiga.turno);
      setCurso(pessoaAntiga.curso);
    }
  }, []);

  function salvar() {
    if (nome === "" || matricula === "" || turno === "" || curso === "") {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const novaPessoa = {
        nome: nome,
        matricula: matricula,
        turno: turno,
        curso: curso,
      };

      const objetoEmString = JSON.stringify(novaPessoa);
      console.log(
        "🚀 ~ file: FormPessoa.js:47 ~ salvar ~ objetoEmString:",
        objetoEmString
      );

      console.log(typeof objetoEmString);

      const objeto = JSON.parse(objetoEmString);
      console.log("🚀 ~ file: FormPessoa.js:52 ~ salvar ~ objeto:", objeto);

      console.log(typeof objeto);

      if (pessoaAntiga) {
        acao(pessoaAntiga, novaPessoa);
      } else {
        acao(novaPessoa);
      }

      Toast.show({
        type: "success",
        text1: "Pessoa cadastrada!",
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {pessoaAntiga ? "Editar Pessoa" : "Adicionar Pessoa"}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label={"Nome"}
          mode="outlined"
          value={nome}
          onChangeText={(text) => setNome(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Matricula"}
          mode="outlined"s
          value={matricula}
          onChangeText={(text) => setMatricula(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Turno"}
          mode="outlined"
          value={turno}
          onChangeText={(text) => setTurno(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Curso"}
          mode="outlined"
          value={curso}
          onChangeText={(text) => setCurso(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        {showMensagemErro && (
          <Text style={{ color: "red", textAlign: "center" }}>
            Preencha todos os campos!
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="contained-tonal"
          onPress={() => navigation.goBack()}
        >
          Voltar
        </Button>

        <Button style={styles.button} mode="contained" onPress={salvar}>
          Salvar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    margin: 10,
  },
  inputContainer: {
    width: "90%",
    flex: 1,
  },
  input: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "90%",
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
  },
});
