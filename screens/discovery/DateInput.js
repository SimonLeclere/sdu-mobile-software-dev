import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { CalendarIcon } from 'react-native-heroicons/outline';
import DateTimePicker from 'react-native-ui-datepicker';

const DateInput = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.dateInputContainer}>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.touchableContainer}>
                <CalendarIcon size={25} color="#fe218b" style={styles.inputIcon} />
                <Text style={styles.dateText}>
                    {value ? value.format('DD/MM/YYYY') : label}
                </Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={open}
                animationType="fade"
                onRequestClose={() => setOpen(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
                    <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                        <DateTimePicker
                            mode="single"
                            date={value.toDate()}
                            onChange={(params) => onChange(params.date)}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    touchableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    inputIcon: {
        marginRight: 10,
    },
    dateText: {
        flex: 1,
        height: 40,
        lineHeight: 40, // Aligner le texte verticalement
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay semi-transparent
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
});

export default DateInput;
