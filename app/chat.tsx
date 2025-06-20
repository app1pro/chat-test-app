import React, { useState } from 'react';
import { Button, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatScreen() {
const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you today?' },
    { id: '2', text: 'Hi! I have a question about your app.' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: input }]);
      setInput('');
    }
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
        <View style={{ flex: 1, backgroundColor: '#eee' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 90}
            >
                    <FlatList
                        data={messages}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                        <View style={styles.messageBubble}>
                            <Text>{item.text}</Text>
                        </View>
                        )}
                        style={styles.messagesList}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type a message..."
                        />
                        <Button title="Send" onPress={sendMessage} />
                    </View>
            </KeyboardAvoidingView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  messagesList: {
    flex: 1,
    marginBottom: 8,
  },
  messageBubble: {
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    marginHorizontal: 10,
    padding: 10,
    marginVertical: 4,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
});
