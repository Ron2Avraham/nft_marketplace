import React from 'react'
import { TextInput } from 'react-native-paper'
import analytics from '@react-native-firebase/analytics';
import styles from './styles';

interface searchInputProps {
    setInput: (value: string) => void; input: string
}
export default function SearchInput({ setInput, input }: searchInputProps) {

    const changeText = async (text: string) => {
        analytics().logEvent('search', { searchText: text })
        setInput(text);
    }
    return (
        <TextInput
            style={styles.TextInputcontainer}
            onChangeText={changeText}
            value={input}
            placeholder="Search..."
            keyboardType="default"
        />
    )
}