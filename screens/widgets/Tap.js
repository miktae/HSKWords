import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const Tap = (props) => {
    const [sound, setSound] = React.useState();

    function setSoundUrl(url) {
        const soundUrlArr = [];
        const match = url.match(/^([a-zA-Z]+)(\d.*)/);

        if (match) {
            const firstPart = match[1] + match[2].match(/^\d+/)[0];
            const secondPart = match[2].replace(/^\d+/, '');
            soundUrlArr.push(firstPart);
            soundUrlArr.push(secondPart);

            //   console.log(firstPart, secondPart);
        } else {
            console.log('Invalid string');
        }
        return soundUrlArr;
    }

    async function playSound() {

        console.log(setSoundUrl(props.soundUrl)[0]);
        // console.log('Loading Sound');

        if (setSoundUrl(props.soundUrl)[1] == '') {
            const { sound } = await Audio.Sound.createAsync({
                uri: "https://cdn.yoyochinese.com/audio/pychart/"
                    + props.soundUrl + ".mp3"
            });
            // console.log("https://cdn.yoyochinese.com/audio/pychart/"
            // + props.soundUrl + ".mp3");
            setSound(sound);
            //   console.log('Playing Sound');
            await sound.playAsync();
        }
        else {
            const { sound } = await Audio.Sound.createAsync({
                uri: "https://cdn.yoyochinese.com/audio/pychart/"
                    + setSoundUrl(props.soundUrl)[0] + ".mp3"
            });

            setSound(sound);

            await sound.playAsync().then(
                setTimeout(async function () {
                    const { sound } = await Audio.Sound.createAsync({
                        uri: "https://cdn.yoyochinese.com/audio/pychart/"
                            + setSoundUrl(props.soundUrl)[1] + ".mp3"
                    });

                    setSound(sound);
                    await sound.playAsync()

                }, 600)
            )
    }
}

React.useEffect(() => {
    // console.log(setSoundUrl(props.soundUrl));

    return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
        }
        : undefined;
}, [sound]);

return (
    <View style={styles.tap}>
        <View style={styles.tapSimlified}>
            {
                props.tradional != props.simplified ?
                <Text style={styles.tapSimlifiedText}>simplified: &nbsp; </Text>
                : null
            }
            <Text style={styles.tapHanyu}>
                {props.simplified}
            </Text>
        </View>
        <View>
        {
            props.tradional != props.simplified ?
            <View style={styles.tapSimlified}>
                <Text style={styles.tapSimlifiedText}>
                    traditional:&nbsp;  
                </Text>
                <Text style={styles.tapHanyu}>
                    {props.tradional} 
                 </Text>
            </View>
            : null
        }
        </View>
        <TouchableOpacity style={styles.tapPinyin} onPress={() =>
            playSound()}>
            <Text style={styles.tapPinyinText} >
                {props.pinyin} &nbsp; 
            </Text>
            <Ionicons name="volume-high" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.tapMeaning}>{props.meaning}</Text>
    </View>
)
}

const styles = StyleSheet.create({
    tap: {
        backgroundColor: '#fafafa',
        margin: 9,
        paddingHorizontal: 50,
        paddingVertical: 30,
        textAlign: 'center',
        borderRadius: 6,
    },
    tapHanyu: {
        fontSize: 26,
    },
    tapSimlified: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tapSimlifiedText: {
        fontSize: 12,
    },
    tapPinyin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tapPinyinText: {
        textAlign: 'center',
    }
});

export default Tap