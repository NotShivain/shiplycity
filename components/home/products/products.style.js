import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', 
    marginBottom: SIZES.medium,
    backgroundColor: '#fff',
    borderRadius: SIZES.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 250, 
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: SIZES.small,
    borderTopRightRadius: SIZES.small,
  },
  cardContent: {
    padding: SIZES.small,
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
  },
  cardTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    marginBottom: SIZES.small,
    textAlign: 'center', 
  },
  cardPrice: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.secondary,
    textAlign: 'center', 
  },
});

export default styles;