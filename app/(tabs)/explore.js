import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';


const burgerImage = require('../../assets/images/dd.png');
const pastaImage = require('../../assets/images/dd.png');
const pizzaImage = require('../../assets/images/dd.png');

// Import your local images
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
            setFoods(response.data); // Assuming the API returns an array of food objects
        } catch (error) {
            setError('Error fetching food items');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle the "Order" button click to send order to the backend
   // Handle the "Order" button click to send order to the backend
   const handleOrder = async (food) => {
    console.log('Order clicked:', food);
    
    // Prepare the order data with only the foodItemId
    const orderData = {
        foodItemId: food._id, // Send the food item ID to reference the correct food
    };

    try {
        // Send the order data to the backend
        const response = await axios.post('http://10.141.221.60:5000/api/orders', orderData);
        console.log('Order placed successfully:', response.data);
        
        // Redirect to OrderFood page with order details (optional)
        router.push({
            pathname: '/orderfood',
            query: { ...response.data }, // Redirecting with the response data, which contains the order details
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
            <View style={styles.header}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: 'https://i.pinimg.com/736x/ca/60/3a/ca603a4e3c6d703be9f80135de170a4c.jpg' }}
                />
            </View>

            {loading && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}

            <ScrollView horizontal>
                <View style={styles.imageContainer}>
                    {foodItems.map((food) => (
                        <TouchableOpacity
                            key={food.name}
                            onPress={() => fetchFoodByName(food.name)} // Fetch food by name when clicked
                            style={styles.imageWrapper}
                        >
                            <Image source={food.imageUrl} style={styles.image} />
                            <Text style={styles.imageText}>{food.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <FlatList
                data={foods}
                keyExtractor={(item) => item._id} // Assuming your Food model has an _id field
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                        <Text style={styles.stock}>{item.inStock ? 'In Stock' : 'Out of Stock'}</Text>

                        {/* Order Button */}
                        <Button
                            title="Order"
                            onPress={() => handleOrder(item)} // Pass the entire item to handleOrder
                        />
                    </View>
                )}
                numColumns={2} // Display items in 2 columns
                columnWrapperStyle={styles.columnWrapper} // Style for the columns
                contentContainerStyle={styles.listContainer} // Style for the FlatList
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
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'yellow',
        width: 'auto',
        height: 100,
        backgroundColor: '#BA8E23',
    },
    profileImage: {
        marginLeft: 20,
        marginTop: 20,
        borderWidth: 2,
        width: 70,
        height: 70,
        position: 'absolute',
        borderRadius: 50,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        marginBottom: 5,
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
        borderWidth: 2,
        width: 300,
        height: 200,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    listContainer: {
        paddingBottom: 20,
    },
    name: {
        marginTop: 10,
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
        marginTop: 10,
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
