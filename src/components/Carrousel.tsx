import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Dimensions, View } from "react-native";
import { HStack, Image } from "@gluestack-ui/themed";

const { width } = Dimensions.get("window");

interface CarrouselProps {
  images: any[];
}

export function Carrousel({ images }: CarrouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <FlatList
      ref={flatListRef}
      data={images}
      keyExtractor={(item, index) => `carousel-${index}`}
      renderItem={({ item }) => (
        <View style={styles.carouselItem}>
          <Image
            source={item}
            alt="Carousel Image"
            style={styles.carouselImage}
          />
          <HStack style={styles.dotsContainer}>
            {images.map((_, index) => (
              <View
                key={`dot-${index}`}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </HStack>
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      style={styles.carouselContainer}
      onScroll={(event) => {
        const slideIndex = Math.round(
          event.nativeEvent.contentOffset.x / width
        );
        setCurrentIndex(slideIndex);
      }}
    />
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    maxHeight: 200,
  },
  carouselItem: {
    width,
    height: 200,
    justifyContent: "flex-end",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#666",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFF",
  },
});
