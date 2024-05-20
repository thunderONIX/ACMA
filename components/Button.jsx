import { Pressable, Text } from "react-native";

import { styles } from "../styles/styles";

export default function Button(props) {
    return (
        <Pressable onPress={props.onPress}>
            <Text style={styles.button}>{props.children}</Text>
        </Pressable>
    )
}
