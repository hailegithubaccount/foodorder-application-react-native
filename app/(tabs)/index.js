import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function App() {
    const router=useRouter();
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState(true);
    const [message, setMessage] = useState('');

    const handleAddFood = async () => {
        try {
            const response = await axios.post('http://10.141.221.60:5000/api/foods', {
                name,
                imageUrl,
                price: parseFloat(price),
                inStock
            });
            setMessage('Food item added successfully!');
            setName('');
            setImageUrl('');
            setPrice('');
        } catch (error) {
            setMessage('Error adding food item.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Food Item</Text>
            <TextInput
                style={styles.input}
                placeholder="Food Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={imageUrl}
                onChangeText={setImageUrl}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Button title="Add Food" onPress={handleAddFood} />
            {message ? <Text style={styles.message}>{message}</Text> : null}
            
            
            <View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/cover')}>
                <Text style={{ color: 'blue', marginTop: 20 }}>Go to Explore</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/orderdfood')}>
                <Text style={{ color: 'blue', marginTop: 20 }}>food</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    message: {
        marginTop: 10,
        textAlign: 'center',
    },
});

