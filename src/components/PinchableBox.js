import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

import {
    PanGestureHandler,
    PinchGestureHandler,
    RotationGestureHandler,
    State,
    ScrollView,
} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const USE_NATIVE_DRIVER = true;

export default class PinchableBox extends React.Component {
    panRef = React.createRef();
    rotationRef = React.createRef();
    pinchRef = React.createRef();
    constructor(props) {
        super(props);

        this._translateX = 0;
        /* Pinching */
        this._baseScale = new Animated.Value(1);
        this._pinchScale = new Animated.Value(1);
        this._scale = Animated.multiply(this._baseScale, this._pinchScale);
        this._lastScale = 1;
        this._onPinchGestureEvent = Animated.event(
            [{ nativeEvent: { scale: this._pinchScale } }],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );
        this._onPanGestureEvent = Animated.event(
            [{ nativeEvent: { x: this._translateX } }],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );
    }

    _onPanHandlerStateChange = event => {
        console.log(event.nativeEvent);
        this._translateX = event.nativeEvent.translationX;
    };

    _onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastScale *= event.nativeEvent.scale;
            this._baseScale.setValue(this._lastScale);
            this._pinchScale.setValue(1);
        }
    };

    render() {
        return (
            <PanGestureHandler
                ref={this.panRef}
                onGestureEvent={this._onPanGestureEvent}
                onHandlerStateChange={this._onPanHandlerStateChange}
                shouldCancelWhenOutside>
                <Animated.View style={styles.wrapper}>
                    <PinchGestureHandler
                        ref={this.pinchRef}
                        simultaneousHandlers={this.rotationRef}
                        onGestureEvent={this._onPinchGestureEvent}
                        onHandlerStateChange={this._onPinchHandlerStateChange}>
                        <Animated.View style={styles.container} collapsable={false}>
                            <ScrollView horizontal>
                                <Animated.Image
                                    style={[
                                        styles.pinchableImage,
                                        {
                                            transform: [
                                                { perspective: 200 },
                                                { scale: this._scale },
                                                { translateX: this._translateX }
                                            ],
                                        },
                                    ]}
                                    source={this.props.source}
                                />
                            </ScrollView>
                        </Animated.View>
                    </PinchGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    pinchableImage: {
        width: width,
        height: 400,
        resizeMode: 'contain',
    },
    wrapper: {
        flex: 1,
    },
});