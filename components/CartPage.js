// components/CartPage.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function CartPage({ route }) {
    const { cart } = route.params;  // Extract cart data from route params

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>

            {cart.length === 0 ? (
                <Text>Your cart is empty!</Text>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text>{item.name}</Text>
                            <Text>{item.quantity} x ${item.price}</Text>
                            <Text>Total: ${item.quantity * item.price}</Text>
                        </View>
                    )}
                />
            )}

            <Text style={styles.total}>Total: ${calculateTotal()}</Text>

            <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        marginBottom: 15,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    checkoutButton: {
        backgroundColor: '#BA8E23',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
