import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    p4: {
        padding: 15
    },
    btn: {
        backgroundColor: '#009999',
        borderRadius: 6,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 8,
        textAlign: 'center',
        height: 32,
        marginRight: 8
    },
    btnSecondary: {
        backgroundColor: '#aeb3bf',
        borderRadius: 6,
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 8,
        textAlign: 'center',
        height: 32,
        marginRight: 8
    },
});

export default styles;