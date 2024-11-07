import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon library

const burgerImage = require('../../assets/images/dd.png');
const pastaImage = require('../../assets/images/dd.png');
const pizzaImage = require('../../assets/images/dd.png');

// Component Definition
export default function FoodList() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderDetails, setOrderDetails] = useState(null); // State to store order details
    const router = useRouter();

    // Function to fetch food items by name
    const fetchFoodByName = async (foodName) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://10.141.221.60:5000/api/foods/name/${foodName}`);
            setFoods(response.data);
        } catch (error) {
            setError('Error fetching food items');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle the "Order" button click to send order to the backend
    const handleOrder = async (food) => {
        console.log('Order clicked:', food);

        const orderData = {
            foodItemId: food._id,
        };

        try {
            const response = await axios.post('http://10.141.221.60:5000/api/orders', orderData);
            console.log('Order placed successfully:', response.data);

            router.push({
                pathname: '/explore',
                query: { ...response.data },
            });

        } catch (error) {
            console.error('Error placing order:', error);
            setError('Failed to place order');
        }
    };

    const foodItems = [
        { name: 'jjj', imageUrl: burgerImage },
        { name: 'Pasta', imageUrl: pastaImage },
        { name: 'Pizza', imageUrl: pizzaImage },
    ];

    return (
        <View style={styles.container}>

            {/* Header with Profile Image and Back Button */}
            <View style={styles.header}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: 'https://i.pinimg.com/736x/ca/60/3a/ca603a4e3c6d703be9f80135de170a4c.jpg' }}
                />
                <TouchableOpacity 
                    onPress={() => router.push('/(tabs)/orderdfood')}
                    style={styles.backButton} // Added styling for better touch area
                >
                   
                    <Text>your order</Text>
                    
                </TouchableOpacity>
                <Text style={{

                }}>your order</Text>
            </View>
            
            {/* Loading and Error Messages */}
            {loading && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}

            {/* Horizontal ScrollView with Food Options */}
            <ScrollView horizontal>
                <View style={styles.imageContainer}>
                    {foodItems.map((food) => (
                        <TouchableOpacity
                            key={food.name}
                            onPress={() => fetchFoodByName(food.name)}
                            style={styles.imageWrapper}
                        >
                            <Image source={food.imageUrl} style={styles.image} />
                            <Text style={styles.imageText}>{food.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* List of Food Items */}
            <FlatList
                data={foods}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                        <Text style={styles.stock}>{item.inStock ? 'In Stock' : 'Out of Stock'}</Text>
                        <Button
                            title="Order"
                            onPress={() => handleOrder(item)}
                        />
                    </View>
                )}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContainer}
            />

            {/* Display Order Details if an order has been placed */}
            {orderDetails && (
                <View style={styles.orderDetails}>
                    <Text style={styles.orderTitle}>Your Order:</Text>
                    <Text style={styles.foodName}>{orderDetails.foodName}</Text>
                    <Text style={styles.foodPrice}>Price: ${orderDetails.foodPrice}</Text>
                    <Image source={orderDetails.foodImage} style={styles.foodImage} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        gap:180,
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#BA8E23',
        borderRadius: 8,

    },
    backButton: {
       
        padding: 10,
        border:2,
        borderWidth:2,
        borderRadius:50,
        width:100,
        marginRight:20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'yellow'


         // Adjust for better touchability
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    imageWrapper: {
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imageText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 2,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    listContainer: {
        paddingBottom: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: 'gray',
    },
    stock: {
        fontSize: 14,
        color: 'green',
    },
    orderDetails: {
        marginTop: 20,
        alignItems: 'center',
    },
    orderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    foodPrice: {
        fontSize: 16,
        color: 'gray',
    },
    foodImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 20,
    },
});
