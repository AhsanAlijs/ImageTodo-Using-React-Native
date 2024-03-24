import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Cameras() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [todo, setTodo] = useState([])
    const cameraRef = useRef()

    const snapPicture = async () => {
        try {
            const data = await cameraRef.current.takePictureAsync();
            setTodo([...todo, { id: todo.length + 1, uri: data.uri }]);
        } catch (error) {
            <View>Uri not Found</View>
        }
    };

    function deleteByID(id) {
        const index = todo.findIndex((item) => item.id === id);
        if (index !== -1) {
            todo.splice(index, 1);
            setTodo([...todo]);
        }
    }


    if (!permission) {
        return (
            <View />
        )
    }

    if (!permission.granted) {
        return (
            <View>
                <Text> Need Camera Permission </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        )
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Camera Todo</Text>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={snapPicture}>
                        <Text style={styles.text}>Snap</Text>
                    </TouchableOpacity>
                </View>
            </Camera>

            {/* Render Image On screen */}

            <Text style={styles.images}>Todo Images</Text>

            <ScrollView  >
                <View>
                    {todo.map((item) => {
                        return (
                            <View style={styles.imgtodo} key={item.id}>
                                <Image
                                    source={{
                                        uri: item?.uri,
                                    }}
                                    style={styles.top}
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        deleteByID(item?.id);
                                    }}
                                >
                                    <Text style={styles.color}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>




        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        width: 250,
        height: 250,
        borderRadius: 10,

    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
    },
    head: {
        fontSize: 25,
        padding: 10,
        backgroundColor: 'gray',
        width: 350,
        marginTop: 10,
        textAlign: 'center',
        color: 'white'

    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        color: 'white',
        backgroundColor: 'red',
        width: 70,
        borderRadius: 10,
        padding: 10
    }, buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 7,
        marginBottom: 10
    },
    images: {
        backgroundColor: '#556B2F',
        width: 350,
        padding: 3,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        borderRadius: 20
    }, top: {
        height: 100,
        width: 100,
        borderRadius: 10,
        paddingBottom: 100

    },
    imgtodo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10
    },
    color: {
        color: 'white',
        fontWeight:'bold'
    }
}); 