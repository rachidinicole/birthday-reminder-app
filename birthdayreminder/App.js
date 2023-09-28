import React, { useState } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const backgroundImg = require('./assets/background.jpg'); // Path to your background image

export default function App() {
  const [showReminder, setShowReminder] = useState(false);
  const [currentBirthday, setCurrentBirthday] = useState(null);

  const birthdays = [
    { name: 'John Doe', date: '2023-10-01' },
    { name: 'Jane Smith', date: '2023-09-30' },
    // Add more birthdays here
  ];

  const today = new Date().toISOString().split('T')[0];

  const upcomingBirthdays = birthdays.filter((birthday) => {
    return birthday.date >= today;
  });

  const handleReminder = (birthday) => {
    setCurrentBirthday(birthday);
    setShowReminder(true);
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.background}>
      <View style={styles.container}>
        {upcomingBirthdays.map((birthday, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>{birthday.name}</Text>
            <Text style={styles.cardText}>{birthday.date}</Text>
            <Button
              title="Remind Me"
              onPress={() => handleReminder(birthday)}
            />
          </View>
        ))}

        <Modal isVisible={showReminder}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              It's {currentBirthday?.name}'s birthday today!
            </Text>
            <Button
              title="Close"
              onPress={() => setShowReminder(false)}
            />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' for different behavior
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add an overlay to make text more readable
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for cards
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    width: '80%',
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Text color for the modal
  },
});



