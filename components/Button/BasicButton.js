import { View, Pressable, Text, StyleSheet } from "react-native";

function BasicButton({
  onPress,
  title = "Button",
  backgroudColor = "#a36ff7",
  fontSize = 20,
  width,
  height,
  color,
  marginTop = '50%',
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
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    letterSpacing: 0.25,
    color: "mauve",
  },
});
export default BasicButton;
