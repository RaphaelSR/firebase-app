import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { createStyles } from "./styles";
import { Avatar, IconButton, useTheme } from "react-native-paper";
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
import { AvatarWithGradient } from "../../components/avatarWithGradient.tsx";
import NoteItem from "../../components/noteItem";

type HomeScreenNavigationProp = NativeStackScreenProps<any>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

export function Home({ navigation }: HomeProps) {
  const { currentUser } = useAuth();
  const [newNote, setNewNote] = useState("");
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const styles = createStyles();

  const [isTextInputFocused, setIsTextInputFocused] = useState(false);

  const handleEditNote = (id: string, title: string) => {
    setNewNote(title);
    handleDeleteNote(id);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      dispatch(createTodoRequest(newNote));
      setNewNote("");
      setIsTextInputFocused(false);
    }
  };

  const toggleNoteStatus = (id: string, title: string, completed: boolean) => {
    dispatch(updateTodoRequest(id, title, !completed));
  };

  const handleDeleteNote = (id: string) => {
    dispatch(deleteTodoRequest(id));
  };

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  return (
    <SafeAreaViewWrapper>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>
              Bem-vindo, {currentUser?.displayName}!
            </Text>
            <AvatarWithGradient
              imageUrl={currentUser?.photoURL}
              displayName={currentUser?.displayName}
              gradientColors={[colors.primary, colors.primaryVariant]}
              size={70}
              onPress={() => navigation.navigate("Profile")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: isTextInputFocused
                    ? colors.primary
                    : colors.placeholder,
                },
              ]}
              onChangeText={setNewNote}
              value={newNote}
              placeholder="Digite sua nota aqui..."
              placeholderTextColor={colors.text}
              onFocus={() => setIsTextInputFocused(true)}
              onBlur={() => setIsTextInputFocused(false)}
            />
            <TouchableOpacity
              onPress={handleAddNote}
              style={[styles.addButton, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.addButtonText, { color: colors.surface }]}>
                Add Note
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <NoteItem
                id={item.id}
                title={item.title}
                completed={item.completed}
                onToggleStatus={toggleNoteStatus}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            )}
            keyExtractor={(item) => item.id}
            style={styles.noteList}
            contentContainerStyle={styles.noteListContent}
          />
        </View>
      </View>
    </SafeAreaViewWrapper>
  );
}
