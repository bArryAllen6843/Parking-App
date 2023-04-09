import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios'

export default function ParkingDetailsPage({ visible, onCancel, id, setBookedSlots, bookedSlots}) {
  const [user, setUser] = useState({
    id: null,
    vehicleType: '',
    parkingTime: '',
    parkingDate: '',
    vehicleNumber: '',
  });

  const handleFormChange = (fieldName, e) =>{
    setUser({...user, [fieldName]: e.nativeEvent.text})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parking = {
      id: id,
      vehicleType: user.vehicleType,
      parkingTime: user.parkingTime,
      parkingDate: user.parkingDate,
      vehicleNumber: user.vehicleNumber
    }
    try {
      const response = await axios.post('http://localhost:5000/parkings', parking);
      console.log("Parking data saved successfully: ", response.data);
      setBookedSlots([...bookedSlots, response.data.id])
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Modal animationType="slide" visible={visible}>
  <View style={styles.container}>
    <Text style={styles.header}>Book Parking Space</Text>
    <View style={styles.form}>
        <Text>{`Parking Slot number ${id}`}</Text>
        <TextInput
          placeholder="Type of Vehicle"
          style={styles.input}
          value={user.vehicleType}
          onChange={(e) => handleFormChange('vehicleType',e)}
        />
        <TextInput
          placeholder="Time Period of Parking"
          style={styles.input}
          value={user.parkingTime}
          onChange={(e) => handleFormChange('parkingTime',e)}
        />
        <TextInput
          placeholder="Date of Parking"
          style={styles.input}
          value={user.parkingDate}
          onChange={(e) => handleFormChange('parkingDate',e)}
        />
        <TextInput
          placeholder="Vehicle Number"
          style={styles.input}
          value={user.vehicleNumber}
          onChange={(e) => handleFormChange('vehicleNumber',e)}
        />
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Book Parking Space</Text>
        </TouchableOpacity>
    </View>
  </View>
</Modal>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  form: {
    width: '80%',
  },
  input: {
    backgroundColor: '#eee',
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});