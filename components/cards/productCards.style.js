import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedJob === item.job_id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.small,
  },
  
  logoImage: {
    width: "70%",
    height: "70%",
    alignSelf: "center",
  },

});

export default styles;
