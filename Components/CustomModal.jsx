import { View, Text, Modal, StyleSheet, Button } from "react-native"

const CustomModal = (
    {
       animationTypeProp,
       isVisibleProp,
       itemSelectedProp,
       onDeleteItemHandlerEvent,
       setModalVisibleEvent,

    }
) => {
    return (
     <Modal animationType={animationTypeProp} visible={isVisibleProp}>
        <View style={styles.modalContainer}>
          <Text style={styles.textoModal}>¿Seguro que deseas eliminar?</Text>
          <Text style={styles.itemValue}>{itemSelectedProp.value}</Text>
        </View>
        <View style={styles.modalButtonContainer}>
          <Button title="Cancelar" color="#3CCF4E" onPress={()=>setModalVisibleEvent(!isVisibleProp)} />
          <Button title="Eliminar" color='#ef233c'onPress={onDeleteItemHandlerEvent}/>
        </View>
     </Modal>
    )
}

export default CustomModal

const styles = StyleSheet.create ({
     modalContainer: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        margin: 20,
        borderRadius: 10,
      },
      modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 20,
      },
      textoModal: {
        fontSize: 25,
      },
      itemValue: {
        fontSize: 20,
        marginTop: 10
      }
});