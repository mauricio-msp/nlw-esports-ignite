import React from 'react'
import { Image, View, FlatList } from 'react-native'

import { GameCard } from '../../components/GameCard'
import { Heading } from '../../components/Heading'

import logoImage from '../../assets/logo-nlw-esports.png'
import { GAMES } from '../../utils/games'
import { styles } from './styles'

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        horizontal
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        contentContainerStyle={styles.contentList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
