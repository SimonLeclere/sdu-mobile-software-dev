import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, FlatList } from 'react-native';
import { useTheme } from '../../../contexts/themeContext';

export default function SelectorWithModal({ label, selectedSortOption, sortOptions, setSortOption }) {
    const [modalVisible, setModalVisible] = useState(false);

    const { colors } = useTheme();
    const styles = getStyles(colors);

    const handleSortOptionSelect = (option) => {
        setSortOption(option.value);
        setModalVisible(false);
    };
    

    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)} style={styles.sortSelector}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.selectedLabel}>
                    {sortOptions.find(o => o.value === selectedSortOption)?.label || 'Select'}
                </Text>
            </Pressable>

            {/* Sort Options Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={sortOptions}
                            keyExtractor={item => item.label}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalOption}
                                    onPress={() => handleSortOptionSelect(item)}
                                >
                                    <Text style={styles.modalOptionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}

                        />
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const getStyles = (colors) => {
    return StyleSheet.create({
      sortSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
      },
      label: {
        color: colors.text,
        fontSize: 16,
      },
      selectedLabel: {
        color: colors.primary,
        fontSize: 16,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: colors.background,
        borderRadius: 10,
        paddingHorizontal: 20,
        width: '80%',
        maxHeight: '80%',
      },
      modalOption: {
        paddingVertical: 15,
      },
      modalOptionText: {
        fontSize: 16,
        color: colors.secondaryText,
      },
      modalCloseButton: {
        paddingVertical: 10,
        alignItems: 'center',
      },
      modalCloseButtonText: {
        fontSize: 16,
        color: colors.primary,
      },
    });
  };
  