import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS, icons, SIZES } from '../../constants';
import Countdown from 'react-native-countdown-component';
import {
    ScreenHeaderBtn,
    Specifics,
    Footerr
  } from "../../components";
import styles from './productDetails.style';
import { getCurrentTime, getDeliveryEstimate } from '../../utils/deliveryUtils';

const ProductDetails = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { productName, price, imageURL, description, stockStatus } = params;
  
    const [pincode, setPincode] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [countdown, setCountdown] = useState('');
    const [provider, setProvider] = useState('');
    const [pincodes, setPincodes] = useState([]);
  
    useEffect(() => {
      const fetchPincodeData = async () => {
        try {
          const googleDriveFileId = '1_1MfbLSSoepAstvM1F5X6NO2q81-v_Hq';
          const response = await fetch(`https://drive.google.com/uc?export=download&id=${googleDriveFileId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.text();
          const parsedPincodes = data.split('\n').slice(1).map(row => {
            const [Pincode, LogisticsProvider, TAT] = row.split(',');
            return { Pincode, LogisticsProvider, TAT };
          });
          setPincodes(parsedPincodes);
        } catch (err) {
          console.error('Error fetching pincode data:', err);
        }
      };
  
      fetchPincodeData();
    }, []);
  
    const handlePincodeChange = (text) => {
      setPincode(text);
    };
  
    const handleCheckDelivery = () => {
      const estimate = getDeliveryEstimate(pincode, stockStatus, pincodes);
      if (estimate.error) {
        Alert.alert('Error', estimate.error);
      } else {
        setDeliveryDate(estimate.date);
        setCountdown(estimate.countdown);
        setProvider(estimate.provider);
      }
    };
  
    useEffect(() => {
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [countdown]);
  
    const formatCountdown = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs}h ${mins}m ${secs}s`;
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension='60%'
                handlePress={() => router.back()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
            ),
            headerTitle: 'Product Details',
          }}
        />
        <ScrollView>
          <View style={styles.container}>
            <Image source={require('../../assets/box.png')} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{productName}</Text>
              <Text style={styles.price}>${price}</Text>
            </View>
            <Text style={styles.availability} color={stockStatus === 'true' ? 'green' : 'red'}>
              {stockStatus === 'true' ? 'In Stock' : 'Out of Stock'}
            </Text>
  
            <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Pincode"
              value={pincode}
              onChangeText={handlePincodeChange}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleCheckDelivery}>
              <Text style={styles.buttonText}>Check Delivery</Text>
            </TouchableOpacity>
          </View>
          {deliveryDate ? (
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryDate}>Get it by: {deliveryDate}</Text>
              <Text style={styles.deliveryPartner}>Delivery Partner: {provider}</Text>
              <Text>For one day delivery, order in:</Text>
              {countdown > 0 && (
                <View style={styles.countdownContainer}>
                  <View style={styles.countdownBox}>
                    <Text style={styles.countdownDigit}>{Math.floor(countdown / 3600)}</Text>
                    <Text style={styles.countdownLabel}>Hours</Text>
                  </View>
                  <View style={styles.countdownBox}>
                    <Text style={styles.countdownDigit}>{Math.floor((countdown % 3600) / 60)}</Text>
                    <Text style={styles.countdownLabel}>Minutes</Text>
                  </View>
                  <View style={styles.countdownBox}>
                    <Text style={styles.countdownDigit}>{countdown % 60}</Text>
                    <Text style={styles.countdownLabel}>Seconds</Text>
                  </View>
                </View>
              )}
            </View>
            ) : null}
          </View>
        </ScrollView>
        <Footerr />
      </SafeAreaView>
    );
  };
  
  export default ProductDetails;