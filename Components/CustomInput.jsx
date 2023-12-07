import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

const CustomInput = (
  {
    placeholderProp,
    textItemProp,
    onChangeTextHandlerEvent,
    addItemToListEvent,
    isTextPresent,
  }
) => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput]}
          placeholder={placeholderProp}
          placeholderTextColor="white" 
          onChangeText={onChangeTextHandlerEvent}
          value={textItemProp}
        />
        <TouchableOpacity 
          style={[
            styles.buttonContainer,
            !isTextPresent && styles.disabledButtonContainer,
          ]} 
          onPress={addItemToListEvent}
          disabled={!isTextPresent}
          >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 10,
    marginTop: 25,
  },
  textInput: {
    flex: 1,
    borderBottomColor: "#ccc",
    fontSize: 23,
    padding: 5,
    color: '#fff',
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#16FF00',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#000'
  },
  disabledButtonContainer: {
    opacity: 0.2,
  },
});
