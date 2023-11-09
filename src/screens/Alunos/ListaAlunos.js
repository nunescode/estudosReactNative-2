import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Card, FAB, MD3Colors, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListaAlunos({ navigation }) {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    loadAlunos();
  }, []);

  async function loadAlunos() {
    const response = await AsyncStorage.getItem("alunos");
    const alunosStorage = response ? JSON.parse(response) : [];
    setAlunos(alunosStorage);
  }

  async function adicionarAluno(aluno) {
    let novaListaAlunos = alunos;
    novaListaAlunos.push(aluno);
    await AsyncStorage.setItem("alunos", JSON.stringify(novaListaAlunos));
    setAlunos(novaListaAlunos);
  }

  async function editarAluno(alunoAntigo, novosDados) {
    const novaListaAlunos = alunos.map((aluno) => {
      if (aluno === alunoAntigo) {
        return novosDados;
      } else {
        return aluno;
      }
    });

    await AsyncStorage.setItem("alunos", JSON.stringify(novaListaAlunos));
    setAlunos(novaListaAlunos);
  }

  async function excluirAluno(aluno) {
    const novaListaAlunos = alunos.filter((a) => a !== aluno);
    await AsyncStorage.setItem("alunos", JSON.stringify(novaListaAlunos));
    setAlunos(novaListaAlunos);
    Toast.show({
      type: "success",
      text1: "Aluno excluído com sucesso!",
    });
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Alunos
      </Text>
      <FlatList
        style={styles.list}
        data={alunos}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">{item?.nome}</Text>
                <Text variant="bodyLarge">Matrícula: {item?.matricula}</Text>
                <Text variant="bodyLarge">Turno: {item?.turno}</Text>
                <Text variant="bodyLarge">Curso: {item.curso}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push("FormAluno", {
                    acao: editarAluno,
                    aluno: item,
                  })
                }
              >
                Editar
              </Button>
              <Button onPress={() => excluirAluno(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push("FormAluno", { acao: adicionarAluno })}
      />
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
    backgroundColor: "#DCDCDC",
    margin: 10,
  },
  fab: {
    position: "absolute",
    margin: 25,
    right: 0,
    bottom: 0,
  },
  list: {
    width: "95%",
  },
  card: {
    marginTop: 10,
  },
  cardContent: {
    flexDirection: "row",
    backgroundColor: "#9370DB",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingBottom: 10,
    borderWidth: 1,
  },
});
