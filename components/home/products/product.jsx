import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './products.style';
import { COLORS } from '../../../constants';
import ProductCard from '../../cards/productCard';

const Product = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const googleDriveFileIds = {
          products: '1WzAzjiKh6n2zedHP66cm-DeAh2Fun6_G',
          stock: '1VOLpZPyirGBNjEj21uFsCCEcIV5S0lhr',
        };

        const fetchCSV = async (fileId) => {
          const response = await fetch(`https://drive.google.com/uc?export=download&id=${fileId}`);
          console.log(`Fetching file with ID: ${fileId}`);
          if (!response.ok) {
            console.error(`Failed to fetch file with ID: ${fileId}, Status: ${response.status}`);
            throw new Error('Network response was not ok');
          }
          return response.text();
        };

        const [productsData, stockData] = await Promise.all([
          fetchCSV(googleDriveFileIds.products),
          fetchCSV(googleDriveFileIds.stock),
        ]);

        const parseCSV = (data) => {
          return data.split('\n').slice(1).map(row => row.split(','));
        };

        const parsedProducts = parseCSV(productsData).map(([ProductID, ProductName, Price]) => ({
          ProductID, ProductName, Price
        }));

        const parsedStock = parseCSV(stockData).map(([ProductID, StockAvailability]) => ({
          ProductID, StockAvailability
        }));

        console.log('Parsed Products:', parsedProducts.slice(0, 10)); // Log first 10 parsed products
        console.log('Parsed Stock:', parsedStock.slice(0, 10)); // Log first 10 parsed stock items

        setProducts(parsedProducts);
        setStock(parsedStock);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchCSVData();
  }, []);

  const getStockStatus = (productID) => {
    const stockItem = stock.find(item => item.ProductID === productID);
    console.log(`ProductID: ${productID}, StockItem: ${stockItem}`); // Log ProductID and StockItem
    return stockItem ? stockItem.StockAvailability.trim() === 'TRUE' : false;
  };
  const handleNavigate = (product) => {
    router.push({
      pathname: `/prod_details/${product.ProductID}`,
      params: {
        productName: product.ProductName,
        price: product.Price,
        stockStatus: getStockStatus(product.ProductID),
      },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products (50)</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          products.slice(0, 50).map(product => (
            <View key={`product-${product.ProductID}`} style={styles.card}>
              <ProductCard 
                product={product} 
                handleNavigate={() => handleNavigate(product)}
                stockStatus={getStockStatus(product.ProductID)}
              />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default Product;