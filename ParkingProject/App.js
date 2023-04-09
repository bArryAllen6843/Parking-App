import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

import ParkingDetailsPage from "./components/ParkingDetailsPage";
import BookedParkingDetailsPage from "./components/BookedParkingDetailsPage";

export default function MyButtonComponent() {
  const [parkingDetailsPage, setParkingDetailsPage] = useState(false);
  const [bookedParkingDetailsPage, setBookedParkingDetailsPage] =
    useState(false);
  const [id, setId] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    async function fetchBookedSlots() {
      try {
        const res = await axios.get("http://localhost:5000/parkings");
        setParkingData(res.data);
        const ids = res.data.map((p) => p.id); // maps the ids of all objects
        setBookedSlots(ids);
      } catch (error) {
        console.log("API error:", error);
      }
    }

    fetchBookedSlots();
  }, []);

  const handleGreenDot = (id) => {
    setParkingDetailsPage(true);
    setId(id);
  };
  const handleRedDot = (id) => {
    setBookedParkingDetailsPage(true);
  };
  const handleCancelParkingDetailsPage = () => {
    setParkingDetailsPage(false);
  };
  const handleBookedParkingDetailsPage = () => {
    setBookedParkingDetailsPage(false);
  };

  const isSlotBooked = (id) => {
    return bookedSlots.includes(id);
  };

  return (
    <View>
      <TouchableOpacity
        style={isSlotBooked(1) ? styles.redDot : styles.greenDot}
        title="1"
        onPress={
          isSlotBooked(1) ? () => handleRedDot(1) : () => handleGreenDot(1)
        }
      />
      <TouchableOpacity
        style={isSlotBooked(2) ? styles.redDot : styles.greenDot}
        title="2"
        onPress={
          isSlotBooked(2) ? () => handleRedDot(2) : () => handleGreenDot(2)
        }
      />
      <TouchableOpacity
        style={isSlotBooked(3) ? styles.redDot : styles.greenDot}
        title="3"
        onPress={
          isSlotBooked(3) ? () => handleRedDot(3) : () => handleGreenDot(3)
        }
      />
      <TouchableOpacity
        style={isSlotBooked(4) ? styles.redDot : styles.greenDot}
        title="4"
        onPress={
          isSlotBooked(4) ? () => handleRedDot(4) : () => handleGreenDot(4)
        }
      />
      <ParkingDetailsPage
        visible={parkingDetailsPage}
        onCancel={handleCancelParkingDetailsPage}
        setBookedSlots={setBookedSlots}
        bookedSlots={bookedSlots}
        id={id}
      />
      <BookedParkingDetailsPage
        visible={bookedParkingDetailsPage}
        onCancel={handleBookedParkingDetailsPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  greenDot: {
    position: "relative",
    backgroundColor: "green",
    width: 30,
    height: 30,
    borderRadius: 15,
    left: "35%",
    top: "35%",
  },
  redDot: {
    position: "relative",
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 15,
    left: "35%",
    top: "35%",
  },
});