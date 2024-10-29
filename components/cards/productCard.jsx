import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './productCards.style';

const ProductCard = ({ product, handleNavigate, stockStatus }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigate}>
      <Image
        source={require('../../assets/box.png')} // Used box.png from assets
        resizeMode='cover'
        style={styles.logoImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{product.ProductName}</Text>
        <Text style={styles.cardPrice}>${product.Price}</Text>
        <Text style={{ color: stockStatus ? 'green' : 'red' }}>
          {stockStatus ? 'In Stock' : 'Out of Stock'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;