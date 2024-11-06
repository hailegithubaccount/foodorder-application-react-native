import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const OrderedFood = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://10.141.221.60:5000/api/orders'); // Update with your backend URL
        setOrders(response.data); // Set the orders data
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
      }
    };

    fetchOrders(); // Call the function to fetch orders
  }, []); // Empty array ensures it runs only once after the first render

  // Render the orders data
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ordered Food</Text>

      {/* Display error message if there's an error */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Display the list of orders */}
      <FlatList
        data={orders} // Pass the orders data to FlatList
        keyExtractor={(item) => item._id} // Use the order's _id as the key
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            {/* Display food image */}
            <Image source={{ uri: item.foodItem.food.imageUrl }} style={styles.image} />
            
            {/* Display food details */}
            <View style={styles.details}>
              <Text style={styles.foodName}>{item.foodItem.food.name}</Text>
              <Text style={styles.foodPrice}>${item.foodItem.food.price}</Text>

              {/* Display order status */}
              <Text style={styles.orderStatus}>Status: {item.orderStatus}</Text>

              {/* Display order date */}
              <Text style={styles.orderDate}>Ordered on: {new Date(item.orderDate).toLocaleString()}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    justifyContent: 'center',
  },
  foodName: {
    fontSize: 18,
    fontWeight: '500',
  },
  foodPrice: {
    fontSize: 16,
    color: '#888',
  },
  orderStatus: {
    fontSize: 14,
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#777',
  },
});

export default OrderedFood;
