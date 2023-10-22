import React, { useEffect, useState } from "react";
import { Avatar, Card, Text } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import Api from "../../services/Api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Api.get("users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <ScrollView>
        {users.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title
              title={item.username}
              subtitle={item.email}
              left={() => (
                <Avatar.Image size={48} source={{ uri: item.image }} />
              )}
            />
            <Card.Content style={styles.container}>
              <Text style={styles.info}>{item.age}</Text>
              <Text style={styles.info}>{item.gender}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

export default Users;

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    backgroundColor: "gray",
    padding: 5,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: 14,
    fontWeight: "bold"
  }
});
