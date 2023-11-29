import { Text, SafeAreaView, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import DiseaseResultCard from "../../components/Cards/DiseaseResultCard";
import grapeDiseasesData from "./grapeDiseases.json";

export default function DiseaseResultScreen({ route }) {

  const DiseaseInfo = ({ diseaseName }) => {
    const diseaseInfo = grapeDiseasesData[diseaseName];

    if (!diseaseInfo) {
      return { error: `No information available for ${diseaseName}` };
    }

    return {
      name: diseaseInfo.name,
      causalAgent: diseaseInfo.causalAgent,
      symptoms: diseaseInfo.symptoms,
      impact: diseaseInfo.impact,
      management: diseaseInfo.management,
    };
  };

  const { result } = route.params;
  const diseaseObject = DiseaseInfo({ diseaseName: result });

  const styles = StyleSheet.create({
    cover: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      gap: 24
    },
    outcome: {
      fontSize: 24,
      color: COLORS.primary,
    },
    title : {
      fontSize: 36,
      fontWeight: "800"
    }
  });

  return (
    <SafeAreaView style={styles.cover}>
      <Text style = {styles.title}>Predicted Outcome</Text>
      <Text style={styles.outcome}>{diseaseObject.name}</Text>
      {/* You can access other properties of diseaseObject here */}
      <DiseaseResultCard information={diseaseObject}/>
    </SafeAreaView>
  );
}
