import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, IconButton, useTheme } from "react-native-paper";
import CustomModal from "../../components/modal";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  updateTodoRequest,
} from "../../store/todo/actions";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootState } from "../../store/rootState";
import SafeAreaViewWrapper from "../../components/safeAreaViewWrapper";

type HomeScreenNavigationProp = NativeStackScreenProps<any>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

export function Home({ navigation }: HomeProps) {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const { logout, currentUser } = useAuth();
  const [newNote, setNewNote] = useState("");
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const handleLogout = () => {
    logout();
    setIsLogoutModalVisible(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      dispatch(createTodoRequest(newNote));
      setNewNote("");
    }
  };
  const toggleNoteStatus = (id: string, title: string, completed: boolean) => {
    dispatch(updateTodoRequest(id, title, !completed));
  };

  const handleDeleteNote = (id: string) => {
    dispatch(deleteTodoRequest(id));
  };

  React.useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  return (
    <SafeAreaViewWrapper>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar.Text
              size={56}
              label={currentUser?.displayName?.slice(0, 1)}
              style={[styles.avatar, { backgroundColor: colors.primary }]}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[
            styles.textInput,
            { backgroundColor: colors.surface, color: colors.text },
          ]}
          onChangeText={setNewNote}
          value={newNote}
          placeholder="Digite sua nota aqui..."
          placeholderTextColor={colors.text}
        />
        <IconButton
          icon="plus"
          color={colors.primary}
          size={20}
          onPress={handleAddNote}
          style={styles.addButton}
        />
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <View style={styles.noteContainer}>
              <TouchableOpacity
                onPress={() =>
                  toggleNoteStatus(item.id, item.title, item.completed)
                }
                style={{ flex: 1 }}
              >
                <Text
                  style={[
                    styles.note,
                    {
                      textDecorationLine: item.completed
                        ? "line-through"
                        : "none",
                      color: item.completed ? colors.text + "88" : colors.text,
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
              <IconButton
                icon="pencil"
                color={colors.text}
                size={20}
                onPress={() => {
                  setNewNote(item.title);
                  handleDeleteNote(item.id);
                }}
              />
              <IconButton
                icon="delete"
                color={colors.error}
                size={20}
                onPress={() => handleDeleteNote(item.id)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.noteList}
        />
        <CustomModal
          visible={isLogoutModalVisible}
          onDismiss={() => setIsLogoutModalVisible(false)}
          title="Sair da sua conta?"
          confirmationMessage="Você tem certeza que deseja sair da sua conta?"
          onConfirm={handleLogout}
        />
      </View>
    </SafeAreaViewWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 16,
    marginBottom: 24,
  },
  avatar: {},
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  addButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  noteList: {
    marginTop: 16,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  note: {
    fontSize: 16,
  },
});
