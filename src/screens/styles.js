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
    pT8: {
        paddingTop: 30
    },
    pY8: {
        paddingVertical: 30
    },
    mX4: {
        margin: 15
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
    btnYellow: {
        backgroundColor: '#f2b716',
        borderRadius: 22,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 10,
        textAlign: 'center',
        height: 45,
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
        backgroundColor: '#fff',
        color: '#000',
        paddingHorizontal: 10,
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 5,
    },
    textarea: {
        height: 100,
        borderRadius: 4,
        borderColor: '#ccc',
        backgroundColor: '#fff',
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
    transparentBg: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    cover: {
        resizeMode: 'cover'
    },
    wFull: {
        width: '100%'
    },
    hFull: {
        height: '100%'
    },
    bgMint: {
        backgroundColor: '#009999',
    },
    textWhite: {
        color: '#fff',
    },
    textBlack: {
        color: '#000',
    },
    pX8: {
        paddingHorizontal: 50
    },
    rounded: {
        borderRadius: 6,
    }
});

export default styles;