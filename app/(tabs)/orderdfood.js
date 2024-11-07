import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import arrowleft from 'react-native-vector-icons/AntDesign'
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
const OrderedFood = () => {
  const router =useRouter();
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
  }, []); 
// Empty array ensures it runs only once after the first render

  // Local delete function to remove order from the list
  const deleteOrder = (orderId) => {
    // Update the orders state by removing the selected order
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    Alert.alert('Deleted', 'Order has been removed from the list.');
  };

  // Render the orders data
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',flexWrap:'wrap',gap:100}}>
        <View>
        <TouchableOpacity 
      onPress={()=>router.push('/(tabs)/explore')}
      >
         <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

        </View>


       <View>
       <Text style={styles.header}>Ordered Food</Text>
       </View>
   

      </View>
    

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

            {/* Delete button */}
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteOrder(item._id)}
            />
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
    marginTop:20,
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
    alignItems: 'center',
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
    flex: 1,
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
