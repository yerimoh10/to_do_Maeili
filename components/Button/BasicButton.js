import { View, Pressable, Text, StyleSheet } from "react-native";

function BasicButton({
  onPress,
  title = "Button",
  backgroudColor = "#a36ff7",
  fontSize = 20,
  width = '40%',
  height,
  color = 'white',
  marginTop='20%',
  
}) {
  return (
    <Pressable
      style={[
        S.button,
        { backgroundColor: backgroudColor, width: width, height: height, marginTop: marginTop },
      ]}
      onPress={onPress}
    >
      <Text style={[S.text, { fontSize: fontSize, color: color }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const S = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    //fontStyle: "italic",
    fontSize: 16,
    //lineHeight: 21,
    fontWeight: "600",
    textAlign: 'center',
    letterSpacing: 0.25,
    //color: "mauve",
    fontFamily: 'WomanFlowerB',
  },
});
export default BasicButton;
