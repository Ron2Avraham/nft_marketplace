import { FlatList, ListRenderItem, ActivityIndicator } from 'react-native'
import React, { useCallback } from 'react'
import { Card, Text } from 'react-native-paper'
import { productItem } from '../../types'
import styles from './styles';

interface productListProps {
    list: productItem[];
    endReachFunc: () => void;
    loadingMore: boolean;
}
export default function ProductsList({ list, endReachFunc, loadingMore }: productListProps) {

    const renderItem: ListRenderItem<productItem> = useCallback(({ item }) => (
        <Card style={styles.CardStyle}>
            <Card.Title title={item.title} />
            <Card.Content>
                <Text variant="bodyMedium">{item.description}</Text>
                <Text variant="bodyLarge" style={styles.PriceStyle}>{item.price} $</Text>
            </Card.Content>
            <Card.Cover source={{ uri: item.thumbnail }} />
        </Card>
    ), [list])

    return (
        <FlatList
            onEndReached={endReachFunc}
            ListFooterComponent={() => loadingMore ? <ActivityIndicator size="large" /> : null}
            onEndReachedThreshold={2.5}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            data={list}
            renderItem={renderItem}
            contentContainerStyle={styles.ListContainerStyle}
        />
    )
}