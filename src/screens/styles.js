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
    attributeContainer: {
        marginVertical: 8,
    },
    textInputContainer: {
        borderColor: '#D6D7DA',
        borderRadius: 2,
        borderWidth: 1,
        marginBottom: 5,
    },
    textInput: {
        height: 30,
        padding: 5,
        fontSize: 12,
    },
    textInputTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputGroup: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    label: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
    input: {
        height: 34,
        borderRadius: 4,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 5,
    },
    textarea: {
        height: 100,
        borderRadius: 4,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 5,
        textAlignVertical: "top"
    },
    helpText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'gray',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default styles;