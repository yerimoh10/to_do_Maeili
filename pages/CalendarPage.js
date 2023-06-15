import { View, Text, StyleSheet,StatusBar } from "react-native";
import Calendar from "../components/Calendar";
function CalendarPage() {
  return (
    <View style={S.calendarContainer}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <Calendar />
    </View>
  );
}

const S = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
});

export default CalendarPage;
