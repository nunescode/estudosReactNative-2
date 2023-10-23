import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";

//atividade lista de tarefas


export default function Lista_Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editando, setEditando] = useState(false);
  const [tarefaSendoEditada, setTarefaSendoEditada] = useState(null);

  function adicionarTarefa() {
    if (inputValue != "") {
      setTarefas([...tarefas, inputValue]);
      setTarefaSendoEditada(null);
      setInputValue("");
    } else {
      console.warn("INSIRA ALGUM VALOR!");
    }
  }

  function editarTarefa() {
    let index = tarefas.indexOf(tarefaSendoEditada);
    let novaLista = tarefas;

    novaLista.splice(index, 1, inputValue);

    setTarefas(novaLista);
    setEditando(false);
    setInputValue("");
  }

  function excluirTarefa(tarefa) {
    let novaListaTarefas = tarefas.filter((item) => item !== tarefa);
    setTarefas(novaListaTarefas);
  }

  function handleEditarTarefa(tarefa) {
    setTarefaSendoEditada(tarefa);
    setInputValue(tarefa);
    setEditando(true);
  }

  function handleButton() {
    if (editando) {
      editarTarefa();
    } else {
      adicionarTarefa();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Insira alguma tarefa..."
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />

        <Button
          style={[
            styles.button,
            { backgroundColor: editando ? "blue" : "green" },
          ]}
          mode="contained"
          onPress={handleButton}
        >
          <Text style={styles.buttonText}>
            {editando ? "Editar" : "Adicionar"}
          </Text>
        </Button>
      </View>

      <FlatList
        style={styles.list}
        data={tarefas}
        renderItem={({ item }) => (
          <Card style={styles.card} mode="outlined">
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={{ flex: 1 }}>
                {item}
              </Text>

              <IconButton
                icon="lead-pencil"
                size={30}
                onPress={() => {
                  handleEditarTarefa(item);
                }}
              />

              <IconButton
                icon="delete-forever"
                size={30}
                onPress={() => {
                  excluirTarefa(item);
                }}
              />
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    paddingTop: 20,
    gap: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  list: {
    width: "95%",
    marginTop: 10,
  },
  card: {
    margin: 5,
  },
  card_concluido: {
    margin: 5,
    backgroundColor: "#baffc9",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
