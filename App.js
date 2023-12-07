// import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import CustomModal from './Components/CustomModal';
import CustomInput from './Components/CustomInput';

export default function App() {
  const [textItem, setTextItem] = useState('') 
  const [itemLitst, setItemList] = useState([])
  const [itemSelectedToDelete, setItemselectedToDelete] = useState({})
  const [modalVisible, setModlVisible] = useState(false)
  const [isTextPresent, setIsTextPresent] = useState(false)

  const onChangeTextHanlder = (text) => {
    setTextItem(text)
    setIsTextPresent(text.trim() !== '')
  }

  const addItemToList = () => {
    // Verifica si el texto no esta vacio antes de agergarlo a la lista
    if (textItem.trim() !== '') {
      setItemList(prevItemList => [...prevItemList, {id: Math.random().toString(), value:textItem}])
      setIsTextPresent(true);
    }
    setTextItem('')
  }

  const onSelectItemHandler = (id) => {
    setModlVisible(!modalVisible)
    setItemselectedToDelete(itemLitst.find(item=>item.id===id))
  }

  const onDeleteItemHandler = () => {
    setItemList((prevItemList) => prevItemList.filter((item) => item.id !== itemSelectedToDelete.id));
    setModlVisible(!modalVisible);

    // Verifica si hay al menos una tarea con texto presente
    setIsTextPresent(
      itemLitst.length > 1 ? true : textItem.trim() !== '');
  }

  const handleCheckPress = (id) => {
    setItemList((prevItemList) =>
     prevItemList.map((item) =>
       item.id === id ? {...item, completed: !item.completed } : item
      )
    );
    setIsTextPresent(itemLitst.some((item) =>item.value.trim() !== '' ))
  };

  const renderListItem = ({item}) => {
    return (
      <View style={styles.itemLitst}>
        <TouchableOpacity
        style={[
          styles.checkButton,
          item.completed && styles.completedCheckButton,
        ]}
        onPress={() => handleCheckPress(item.id)}
        >
          {item.completed ? <Text>✓</Text> : null}
        </TouchableOpacity>
        <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
          {item.value}
        </Text>
        <TouchableOpacity style={{...styles.deleteButton,  opacity: item.completed ? 0.5  : 1 }} 
          onPress={() => !item.completed && onSelectItemHandler(item.id)}
        >
          <Text style={styles.deletebuttonText}>🗑</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <>
      <View style={styles.container}>
          <CustomInput 
            placeholderProp="Ingresa Tarea a Realizar"
            textItemProp={textItem}
            onChangeTextHandlerEvent={onChangeTextHanlder}
            addItemToListEvent={addItemToList}
            isTextPresent={isTextPresent}
          />
        <FlatList
          data={itemLitst}
          renderItem={renderListItem}
          keyExtractor={item=>item.id}
        />
      </View>
      <CustomModal 
          animationTypeProp="fade"
          isVisibleProp={modalVisible}
          itemSelectedProp={itemSelectedToDelete}
          onDeleteItemHandlerEvent={onDeleteItemHandler}
          setModalVisibleEvent={setModlVisible}
      />
    </>
  );
}

// SECCION PRINCIPAL - LISTA DE TAREAS
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column-reverse',
    backgroundColor: '#2B2A4C',
    padding: 30,
    width: '100%',
    marginTop: 30
  },
 
  itemLitst: {  
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#F8FFD2',
    borderRadius: 10,
  },
  checkButton: {
    backgroundColor: '#16FF00',
    padding: 10,
    borderRadius: 5,
  },
  completedCheckButton: {
    backgroundColor: '#16FF00'
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  deleteButton: {
    // backgroundColor: '#ED2B2A',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  deletebuttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalMessageContainer: {
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#e425'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#000'
  }

});

