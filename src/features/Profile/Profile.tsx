import React from 'react'
import { View, StyleSheet, Text, FlatList, ListRenderItem } from 'react-native'
import { Segmented } from 'react-native-collapsible-segmented-view'

const Header = () => {
  return (
    <View style={styles.box} pointerEvents="box-none">
      <Text style={styles.text}>Collapsible Header</Text>
    </View>
  )
}

const Example =()=> {
  return (
    <Segmented.View header={Header}>
      <Segmented.Segment label="A" component={SegmentA} />
      <Segmented.Segment label="B" component={SegmentB} />
      <Segmented.Segment label="C" component={SegmentC} />
    </Segmented.View>
  )
}

// Common List Render Function
const renderItem = (color0: string, color1: string): ListRenderItem<number> => ({ index }) => {
  const backgroundColor = index % 2 === 0 ? color0 : color1
  const color = index % 2 === 0 ? color1 : color0
  return (
    <View style={[styles.box, { backgroundColor }]}>
      <Text style={[{ color }, styles.text]}>{index}</Text>
    </View>
  )
}

// ✅ Separate Components for Each Segment
const SegmentA = () => (
  <Segmented.FlatList
    data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    renderItem={renderItem('#FBC02D', '#FFF9C4')}
    keyExtractor={(item) => item.toString()}
  />
)

const SegmentB = () => (
  <Segmented.FlatList
    data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    renderItem={renderItem('#0097A7', '#B2EBF2')}
    keyExtractor={(item) => item.toString()}
  />
)

const SegmentC = () => (
  <Segmented.FlatList
    data={[0, 1]}
    renderItem={renderItem('#D32F2F', '#FFCDD2')}
    keyExtractor={(item) => item.toString()}
  />
)

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: '100%',
  },
  text: {
    fontSize: 32,
  },
})

export default Example
