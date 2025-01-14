import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Appbar, Button, Dialog, Paragraph, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import {useLogOutUserMutation} from '../../services/userAuthApi';
import {setAuthenticated} from './HomeSlice';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../RootNavigator';
import HadithStatus from '../../HadithStatus/HadithStatusBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState} from '../../app/store';

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'main'
>;

const {height} = Dimensions.get('window');

export default function Home() {
  const dispatch = useDispatch();
  const allDayHadith = useSelector(
    (state: RootState) => state.home.allDayHadith,
  );

  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const appBarOffset = useSharedValue(0); // For AppBar movement
  const appBarOpacity = useSharedValue(1); // For AppBar fade effect
  const prevScrollY = useRef(0); // Previous scroll position tracker
  const isAppBarHidden = useRef(false); // AppBar visibility tracker
  const scrollThreshold = 10; // Smooth behavior threshold

  const appBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: appBarOffset.value}],
      opacity: appBarOpacity.value,
    };
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    /*  console.log('currentScrollY' + currentScrollY);
    console.log('prevScrollY.current' + prevScrollY.current); */
    if (currentScrollY <= 100) {
      appBarOffset.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });

      appBarOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      isAppBarHidden.current = false;

      /*  hide */
    } else if (prevScrollY.current - currentScrollY > scrollThreshold) {
      if (isAppBarHidden.current) {
        appBarOffset.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        appBarOpacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        isAppBarHidden.current = false;
      }
    } else if (currentScrollY - prevScrollY.current > scrollThreshold) {
      if (!isAppBarHidden.current) {
        appBarOffset.value = withTiming(-100, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        appBarOpacity.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        isAppBarHidden.current = true;
      }
    }

    prevScrollY.current = currentScrollY;
  };

  /*   Logout */

  const [logOutUser, {isLoading, isSuccess, isError, error}] =
    useLogOutUserMutation();

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogout = async () => {
    try {
      const data = await logOutUser().unwrap();
      await handlePostLogoutActions();
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const handlePostLogoutActions = async () => {
    try {
      await GoogleSignin.signOut();
      const success = await Keychain.resetGenericPassword();
      if (success) {
        dispatch(setAuthenticated(false));
      } else {
        console.log('Failed to delete the token');
      }
    } catch (error) {
      console.error('Error deleting the token:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      handlePostLogoutActions();
    }
  }, [isSuccess]);

  /* make status bar right */
  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('white');
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Animated.View
        sharedTransitionTag="posted"
        style={[styles.appBar, appBarAnimatedStyle]}>
        <Appbar.Header style={styles.appBarHeader}>
          <Text style={styles.title}>aat</Text>
          <Appbar.Action
            icon={() => (
              <MaterialCommunityIcons
                name="plus-circle"
                size={24}
                color="black"
              />
            )}
            onPress={() => {}}
          />

          <Appbar.Action icon="magnify" color="black" onPress={() => {}} />
          <Appbar.Action
            icon="menu"
            color="black"
            onPress={() => navigation.navigate('menu')}
          />
        </Appbar.Header>
      </Animated.View>

      <Animated.ScrollView
        overScrollMode="never" // Disable overscroll effect on Android
        bounces={false} // Disable bounce effect on iOS
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
        scrollEventThrottle={16}>
        <View>
          <View style={{height: 70, backgroundColor: '#f9f9f9'}}></View>

          <HadithStatus />
         
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et maiores
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi
            saepe libero optio laboriosam unde eaque fugit corrupti placeat.
            Nihil iste, unde totam nostrum repellendus blanditiis maxime ducimus
            vero quis minus praesentium laborum laboriosam quas pariatur soluta
            dolorum libero possimus quasi debitis incidunt nemo eum! Modi illo
            nemo iusto dignissimos nostrum eveniet inventore nobis tempora
            libero ducimus amet perspiciatis harum hic ipsa facere earum odio
            neque magni quis atque ea nisi aspernatur, ad corrupti! Qui debitis
            hic ipsum quis dolor non minima temporibus, eaque fuga dolores odio
            reiciendis deserunt repellat, quasi libero fugiat, magnam illum
            magni necessitatibus sed nostrum architecto porro accusantium
            blanditiis. Ipsa facere eum quia, aut odit reiciendis facilis quod
            illum sunt commodi, quas, porro similique officiis iste. Dignissimos
            alias dicta sequi reprehenderit, vitae quas optio eligendi placeat,
            nihil nulla exercitationem aliquam similique assumenda cum
            perspiciatis numquam magnam atque recusandae nam sapiente, veniam
            consequatur! Aut voluptatibus dignissimos mollitia dolorem a,
            impedit magnam. Eos quo alias nobis officiis quasi fugiat iusto
            temporibus veniam nulla quidem odio, sunt porro reprehenderit
            quisquam recusandae harum blanditiis aliquid? Quia debitis cum eaque
            voluptates enim. Debitis rem suscipit tenetur sit, dicta, itaque
            praesentium beatae natus voluptatem commodi neque odit. Placeat
            repudiandae consectetur repellendus quam, sint saepe fugiat tenetur
            fuga esse veritatis modi nostrum pariatur quo! Sunt blanditiis
            officiis dolorum quod enim, repellat, explicabo, voluptatibus sit
            soluta sapiente voluptates quidem. Aliquid vitae natus laboriosam,
            debitis autem labore eos quam a doloribus temporibus sed ullam
            consectetur maiores aliquam praesentium necessitatibus at quae
            eligendi quo perspiciatis delectus. Necessitatibus corporis minus
            illo facere vel culpa facilis aut, aliquam perferendis pariatur eum,
            sunt eos. Saepe, dicta modi alias nulla magni ducimus, debitis nihil
            eveniet maxime nemo est sint temporibus accusamus. Fugit similique
            voluptatibus quis dicta architecto aut necessitatibus animi.
            Voluptas, architecto unde adipisci nisi molestiae ea incidunt
            excepturi quo veritatis totam sint. Ab tempora neque minus quod,
            repellendus amet, explicabo nam ad placeat, facere non cupiditate
            modi voluptas sint cum laboriosam. Explicabo quos dignissimos atque
            hic aspernatur ipsa officia perspiciatis nulla quas? Repellendus
            modi dignissimos provident natus officia possimus a similique, neque
            commodi voluptates fuga at voluptas dolore velit molestias nemo
            expedita hic, aspernatur veniam omnis dolor reprehenderit. Magnam
            earum quasi ex ipsam id! Distinctio animi nobis non vero quam
            placeat deserunt nam temporibus, quibusdam suscipit excepturi quo
            ipsa! Cum quam iste aperiam consequuntur libero voluptatem
            voluptates cumque sapiente quae magnam commodi maiores excepturi,
            reiciendis dignissimos ullam, quos vel, molestiae non quibusdam
            adipisci provident distinctio? Tempore quos consequuntur ex natus
            quia facilis nisi officia impedit omnis sit dignissimos eveniet
            cumque rerum repellendus, aspernatur provident, corrupti reiciendis,
            error blanditiis voluptates! Modi corrupti in corporis ratione
            itaque quo dolore consectetur eligendi impedit voluptates odio autem
            ullam nulla earum, omnis, animi est voluptas aperiam et nam, maxime
            dolores beatae ea! Fugiat iusto minus consequuntur odit explicabo
            itaque architecto, aperiam deleniti repellat temporibus. Magni, ex
            fugiat dolorum consequuntur cupiditate quod commodi qui accusamus
            obcaecati voluptas totam delectus modi illum dolor tenetur? Beatae
            error dicta ipsam voluptatem vero rerum distinctio doloribus
            asperiores qui excepturi dolorem rem animi doloremque hic delectus
            labore, perspiciatis aspernatur nesciunt officia corrupti ad.
            Eveniet ipsa deleniti voluptatum quo recusandae cupiditate maiores
            labore aliquid iure praesentium aperiam, voluptates temporibus
            reprehenderit magni libero? Illum, molestiae tenetur sint
            voluptatibus asperiores ea enim omnis praesentium aspernatur in
            provident! Tempore blanditiis deleniti, cupiditate culpa obcaecati
            doloremque explicabo non odio error voluptatum numquam, similique
            exercitationem optio. Eum voluptatum dicta minima inventore error
            porro aperiam, quod illo alias dolorum at voluptate ratione debitis
            illum fuga laboriosam architecto ab aliquam modi repellat. Maxime
            quibusdam debitis error soluta eligendi. Nisi esse nobis voluptates
            illo earum, saepe mollitia porro natus ut? At omnis sapiente aliquid
            voluptates blanditiis. Eligendi harum maxime accusantium maiores
            sapiente ipsum, quaerat ipsam iusto exercitationem pariatur quo! Ut
            culpa quia, ullam enim ipsa sequi ex saepe quisquam tempore quaerat
            minima. Qui voluptate perferendis adipisci, voluptatem distinctio at
            tempora aliquam ut nostrum, doloribus doloremque quis quasi magnam
            iusto cumque, architecto similique debitis a fuga vero hic non in
            ipsum exercitationem. Animi maxime ratione hic mollitia vitae
            ducimus esse, magnam provident nesciunt sit incidunt qui,
            consectetur, asperiores quia corporis laudantium exercitationem iste
            ex dolorem quis quibusdam blanditiis! Odio quae perspiciatis cumque
            officiis fugit ullam repellendus consequuntur at ducimus quas?
            Repellendus, placeat ducimus sunt laudantium blanditiis cum
            provident maxime, optio itaque est quo cupiditate quos odio
            doloribus porro eum commodi consequatur fuga reprehenderit sit
            officia mollitia. Veniam mollitia cumque quod reprehenderit soluta
            labore error laudantium dolorum iure magni accusamus eaque,
            dignissimos earum nihil quam ipsam quaerat ipsum quibusdam delectus
            inventore aliquam omnis! Ipsum aperiam corporis similique voluptate
            ea, nam dignissimos commodi accusantium quidem vel, praesentium
            eveniet, cum quasi perspiciatis! Placeat dolore eligendi
            necessitatibus tenetur eum. Accusamus sapiente vero aliquam vitae
            doloremque mollitia, voluptatibus quasi, facere iusto quas adipisci
            possimus. Illo ratione laudantium natus iusto suscipit ex distinctio
            pariatur possimus mollitia saepe doloribus similique optio ducimus
            aliquam quod commodi provident, velit ipsum exercitationem cum esse?
            Ipsum fugiat consectetur ipsam eligendi quae repellendus,
            consequatur, voluptas commodi natus inventore cumque nulla animi
            ducimus iure, facere quasi non nobis doloribus repellat excepturi
            quis autem voluptatibus magni? Inventore totam facilis ab? Incidunt
            aliquid, consectetur assumenda porro eos quisquam nulla. Animi
            eligendi quae consequuntur fugit reprehenderit nam dolorem
            consectetur rem aut quibusdam, doloribus ratione voluptatem ab qui
            eos et magnam iure perspiciatis maiores repellendus nemo atque. Sit
            porro sunt quas, labore deleniti quia minus expedita in ducimus
            cumque odit praesentium amet, alias ipsum. Perferendis natus nam
            blanditiis id a ullam quos quia nulla voluptatibus non
            reprehenderit, deleniti commodi iure nemo architecto qui nostrum
            iusto officiis cumque, dicta laudantium? Rerum amet, magni accusamus
            nemo quas ullam cupiditate, sunt doloremque in nesciunt vitae.
            Expedita harum architecto eaque magnam, praesentium libero doloribus
            repudiandae error. Laboriosam quae molestiae inventore dolore cum
            suscipit rerum animi porro ex soluta! Assumenda velit, voluptas
            explicabo rem facere, molestias alias atque dolor recusandae
            inventore, labore facilis laudantium ab reiciendis vel adipisci
            obcaecati quas fugit doloribus deleniti sapiente consequuntur
            repellendus praesentium. Voluptatum, natus repudiandae. Ab,
            assumenda, quisquam impedit quos dolores laborum autem, laudantium
            fuga eligendi ea neque! facere reprehenderit debitis
          </Text>
          <Button mode="outlined" onPress={showDialog}>
            Delete
          </Button>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Confirm Logout</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Are you sure you want to logout?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button
                  onPress={() => {
                    handleLogout();
                    hideDialog();
                  }}>
                  Logout
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
    height: 70,
    zIndex: 1,
    backgroundColor: 'white',
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,

    shadowOffset: {width: 0, height: 2},
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
    color: '#007BFF',
    fontSize: 28,
    fontWeight: '700',
  },
  content: {
    fontSize: 28,
    padding: 16,
    textAlign: 'left',
    lineHeight: 28,
  },
});
