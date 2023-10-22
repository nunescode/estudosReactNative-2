import React, { useEffect, useState } from "react";
import { Avatar, Card, IconButton } from "react-native-paper";
import { FlatList, ScrollView, Text, View, StyleSheet } from "react-native";
import Api from "../../services/Api";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Api.get("posts")
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <ScrollView>
        {posts.map((item) => (
          <Card style={styles.card} key={item.id}>
            <Card.Content>
              <Text style={styles.title} variant="titleLarge">
                {item.title}
              </Text>

              <Text variant="bodyMedium">{item.body}</Text>
              <br />
              <Text variant="bodyMedium">
                <strong>Likes:</strong> {item.reactions}
              </Text>

              <View style={styles.tags}>
                {item.tags.map((tag) => (
                  <Text key={tag} style={styles.tagItem}>
                    <i>{tag}</i>
                  </Text>
                ))}
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

export default Posts;

const styles = StyleSheet.create({
  card: {
    marginBottom: 30,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  tagItem: {
    marginRight: 15,
    fontWeight: "bold",
  },
});
