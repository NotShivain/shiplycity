import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    padding: SIZES.medium,
    alignItems: 'center', // Center align the content
  },
  image: {
    width: '50%',
    height: 200,
    marginBottom: SIZES.medium,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SIZES.small,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  price: {
    fontSize: SIZES.large,
    color: COLORS.green,
  },
  availability: {
    fontSize: SIZES.medium,
    marginBottom: SIZES.medium,
  },
  description: {
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: SIZES.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '70%',
    marginRight: SIZES.small,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  deliveryInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  deliveryDate: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.small,
  },
  deliveryPartner: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    marginBottom: SIZES.small,
  },
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  countdownBox: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: SIZES.small,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  countdownDigit: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  countdownLabel: {
    color: COLORS.tertiary,
    fontWeight: 'bold',
    fontSize: SIZES.small,
  },
});

export default styles;