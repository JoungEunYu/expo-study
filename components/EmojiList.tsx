import { Image, type ImageSource } from "expo-image";
import { useState } from "react";
import { FlatList, Platform, Pressable, StyleSheet } from "react-native"

type Props = {
  onSelect: (image: ImageSource) => void;
  onCloseModal: () => void;
}

const EmojiList = ({onSelect, onCloseModal}: Props) => {

  const [emoji] = useState<ImageSource[]>([
    require("../src/assets/images/emoji(1).png"),
    require("../src/assets/images/emoji(2).png"),
    require("../src/assets/images/emoji(3).png"),
    require("../src/assets/images/emoji(4).png"),
    require("../src/assets/images/emoji(5).png"),
    require("../src/assets/images/emoji(6).png"),
  ]);

  return(
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({item, index}) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
      
    />
  )
}

export default EmojiList;

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
})