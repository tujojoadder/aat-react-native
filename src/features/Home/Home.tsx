import React, { useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Appbar } from 'react-native-paper';

const { height } = Dimensions.get('window');

export default function Home() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // AppBar animations
  const appBarTranslateY = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [0, -120],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const appBarOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0], // Adjusted range for more noticeable fade-out
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" translucent />

      {/* Animated AppBar */}
      <Animated.View
        style={[
          styles.appBar,
          {
            transform: [{ translateY: appBarTranslateY }],
            opacity: appBarOpacity,
          },
        ]}
      >
        <Appbar.Header style={styles.appBarHeader}>
          <Animated.Text
            style={[
              styles.title,
              {
                transform: [
                  { scale: titleScale },
                  { translateY: titleTranslateY },
                ],
              },
            ]}
          >
            aat
          </Animated.Text>
          <Appbar.Action icon="magnify" color="black" onPress={() => {}} />
          <Appbar.Action icon="bell-outline" color="black" onPress={() => {}} />
        </Appbar.Header>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 100 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ height: height * 1.5 }}>
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam tenetur maiores nemo odit, officia dicta consequatur. Eveniet eaque esse ad obcaecati exercitationem nesciunt eius, quidem ipsum voluptate excepturi architecto! Harum?
            Welcome to your home page! Scroll down to explore more features.
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, nemo. Consectetur dignissimos eveniet ipsum voluptatem, cumque quos fugit et, soluta, laborum at quaerat praesentium temporibus incidunt debitis hic. Corrupti officiis expedita suscipit similique reprehenderit ea optio iste vel ad harum eum esse fugiat, perferendis incidunt maxime possimus voluptatem quibusdam alias ullam error? Velit in explicabo veniam sapiente blanditiis. Porro dolorum amet iure officiis, dignissimos voluptate atque sapiente incidunt, temporibus ad tempora consequuntur illo doloribus? Ullam corporis, enim doloremque omnis exercitationem magnam similique nihil repellat nisi libero. Porro culpa quidem eligendi asperiores error odio accusantium debitis similique vitae officiis, repellat itaque delectus est voluptatem fuga facere assumenda? Accusamus repellat veniam ex in, omnis facilis assumenda quidem earum labore quae architecto voluptatem nisi cumque quod obcaecati, esse, provident suscipit neque. Nihil quasi perferendis laboriosam consequatur deserunt cum porro magni in sed. Ab, numquam nostrum alias commodi optio dolorem cupiditate quia corporis excepturi magni quasi repudiandae dolores exercitationem molestiae aut eius similique quidem labore. Sed itaque beatae ut, explicabo officia deserunt quod voluptatum vel blanditiis fugiat cupiditate magni pariatur modi? Facere placeat inventore repellendus magni aliquam voluptate doloremque praesentium cupiditate? Beatae maxime dolorem sit ad recusandae suscipit aliquid ipsam exercitationem temporibus facere culpa dolores ratione consequuntur repudiandae, dolor sunt quod? Esse ex at voluptatibus. Alias praesentium quod repellendus assumenda maiores voluptatum perferendis! Iure necessitatibus maxime consectetur quisquam, nulla tenetur cupiditate distinctio? Sed, eius veritatis! Doloremque, ut amet animi asperiores quam maiores, sapiente sunt deleniti deserunt fuga placeat totam soluta error quisquam cumque accusantium dolor, voluptate id. Maxime aut atque repellat sed ad voluptas ipsa accusamus magnam quas numquam eum, autem omnis labore dolor! Tenetur iure, distinctio reprehenderit illo recusandae dolorem ducimus cupiditate doloribus aut eos tempore? Expedita reprehenderit illum ea est eligendi? Quis similique eum deleniti. Ut, praesentium doloremque voluptates soluta culpa, error corporis aperiam a voluptate quis iusto est nihil maxime sunt quisquam obcaecati numquam reiciendis optio officia! Nostrum quia placeat deleniti sed aspernatur at, excepturi impedit veritatis laudantium iusto itaque explicabo vitae eum atque est. Inventore at et nulla porro nemo unde sequi sed quod perspiciatis ipsum blanditiis iure quo, sint dolores sit a expedita eum voluptas saepe consequatur autem. Harum unde necessitatibus possimus error beatae amet doloribus architecto quae adipisci veniam velit delectus dolor deleniti perspiciatis, vero eos facere dolorem cupiditate aliquid. Qui pariatur esse reprehenderit. Cupiditate, adipisci ullam! Animi ducimus assumenda, voluptatem laudantium recusandae dicta. Debitis, dolore laborum harum dolorem alias voluptatum quo ducimus est temporibus ullam voluptates sit architecto reiciendis repellat sed veritatis saepe nam quis! Dignissimos laboriosam unde nam nihil, minima sunt illo ut dolorum ipsa, rerum recusandae, ratione vitae. Reiciendis saepe molestias ullam tempore! Minus culpa dolorum quaerat doloribus esse praesentium aliquam dolore ad labore, delectus totam fugiat, voluptates exercitationem ipsum tenetur quasi distinctio quibusdam pariatur. Ipsam facere adipisci a, asperiores dolor inventore eveniet, quibusdam ratione iure, corrupti atque repellendus quam quas voluptatum laborum quia necessitatibus numquam reprehenderit! Id, illo blanditiis! Unde eligendi asperiores adipisci voluptatibus magnam totam quidem veniam deleniti esse fuga? Eos quam vel dolor aliquid deserunt rerum nemo mollitia consequatur quibusdam quae labore officiis sequi esse sint totam ipsa, omnis necessitatibus sed incidunt ab alias velit itaque? Facere consequatur eveniet deserunt fuga dignissimos voluptas voluptate ducimus incidunt accusantium aut suscipit ab adipisci vel magnam reiciendis quaerat eos aliquam, sunt optio praesentium magni maiores eaque. Ducimus at ullam consectetur perferendis ut aspernatur quos praesentium voluptate quis eveniet harum dolores a illo, amet, commodi ea. Aspernatur quidem porro cupiditate ipsum ipsam nihil ea quas eligendi id illum provident qui vitae recusandae corrupti, voluptatem fuga veritatis tempora repudiandae odit illo eum cum reiciendis praesentium quo. Molestias est error ipsam, nisi ullam assumenda fuga! Obcaecati autem ab suscipit dolores sequi facilis temporibus architecto a! Sunt blanditiis animi quod ducimus veniam sint minus consequatur voluptatem, officiis impedit eveniet quia ad quo earum nemo neque? Eligendi possimus modi, ex quaerat commodi animi vitae! Rem et quam aliquam? Aliquam praesentium dicta repellendus, veniam quam veritatis reiciendis mollitia laborum illum perferendis? Deserunt accusantium sit perspiciatis nobis molestias reprehenderit ducimus ex cum? Est rerum mollitia maxime hic animi deserunt ad fuga deleniti consectetur asperiores minima quidem aperiam eveniet repellat numquam, quae nisi alias dicta aut ipsa atque dolores. Facilis commodi eaque officia debitis quas consectetur reiciendis! Ipsam, hic? Ab et neque incidunt libero doloremque, eaque error tenetur natus recusandae? Iste reiciendis iure autem quis nihil doloribus, sed, ducimus harum eveniet quibusdam ad accusantium officiis aut porro, facilis obcaecati. Tenetur facilis quaerat quis explicabo eligendi ut quos facere deserunt praesentium dolor laboriosam quibusdam reiciendis rem incidunt molestiae, ullam labore distinctio voluptatem beatae. Quibusdam ut, laboriosam nam est maxime minus delectus enim molestiae, iusto odit in similique asperiores ipsum reprehenderit necessitatibus magni laborum expedita corporis temporibus illo deleniti? Omnis sunt in voluptatem quas, quos modi eius expedita dolore molestias eum cumque doloremque aliquid! Iure excepturi mollitia vero beatae voluptates, quibusdam magnam eaque placeat numquam, architecto et sunt soluta illum maiores ex expedita nesciunt voluptatibus eum itaque voluptate tenetur aspernatur. Maxime cupiditate sunt unde, est laboriosam nam voluptatum ad, distinctio recusandae ipsa expedita eligendi dolorem temporibus consectetur hic corrupti possimus? Mollitia, sequi natus dolorem doloremque iure sit ipsam cum dolor officia eos exercitationem libero pariatur illum necessitatibus est ipsa rem deserunt reiciendis eveniet! Debitis ex doloribus sed repudiandae ipsam dolore vitae, quo incidunt recusandae vel voluptatem vero. Optio adipisci, veniam nulla iste incidunt sint blanditiis quod quos quam nihil, iusto molestiae deleniti voluptatem porro iure, sit necessitatibus. Itaque, natus aliquid. Ipsa in similique doloremque, blanditiis tempore, veritatis officiis eaque magni totam autem itaque natus! Adipisci exercitationem impedit mollitia provident explicabo, nam eaque ipsam, autem corrupti deserunt rerum unde eos omnis velit et! Nisi maxime dolorem sed rem corrupti similique commodi, aperiam voluptatibus numquam exercitationem quis architecto perferendis quo blanditiis at! Modi ex praesentium placeat ipsam mollitia itaque! Cum culpa in nesciunt. Eveniet reiciendis numquam vel adipisci laboriosam corporis, voluptatibus dolores voluptatum nobis dolorem corrupti fugit ipsum possimus excepturi deserunt culpa consectetur omnis voluptatem explicabo nostrum nesciunt! Quisquam, tempore! Assumenda, eum non? Velit sequi ducimus laudantium?   Enjoy modern animations and features like dynamic app bar behavior.
          </Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
    backgroundColor: 'white',
    borderBottomColor: '#444',
    borderBottomWidth: StyleSheet.hairlineWidth,


  },
  appBarHeader: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  title: {
    flex: 1,
    color: 'black',
    fontSize: 28,
    fontWeight: '700',
  },
  content: {
    fontSize: 18,
    padding: 16,
    textAlign: 'left',
    lineHeight: 28,
  },
});
