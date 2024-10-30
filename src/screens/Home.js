
// import { StyleSheet, View, Text, Image, FlatList, Dimensions, TouchableOpacity, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { Input } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/EvilIcons';
// import Icon2 from 'react-native-vector-icons/Entypo';
// import { moderateScale } from 'react-native-size-matters';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Filters from '../components/Filters'
// import { useToast } from "react-native-toast-notifications";
// import config from '../Providers/axios'
// import { useSelector, useDispatch } from 'react-redux'
// import { useIsFocused } from '@react-navigation/native';

// const Home = ({ navigation }) => {
//   const toast = useToast();
//   const [loader, setloader] = useState(false);
//   const [recentPosts, setRecentPosts] = useState([]);
//   const [newPosts, setNewPosts] = useState([]);

//   const token = useSelector((state) => state.auth.token);
//   const dispatch = useDispatch();
//   const isFocused = useIsFocused();
//   const [sheet, setSheet] = useState(false);

//   const getData = async (data) => {
//     setloader(true);
//     console.log(data)
//     try {
//       const res = await config.post('/get-post', data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(res.data, 'res.data')
//       if (res && res.data) {
//         setRecentPosts(res.data.recent_posts);
//         setNewPosts(res.data.new_posts);
//         setloader(false);
//         setRefreshing(false);
//       }
//     } catch (err) {
//       setloader(false);
//       console.error('API Error:', err.message);
//     }
//   };

//   const filter = (data) => {
//     console.log(data)
//     getData(data);
//   }

//   const FilterReset = () => {
//     console.log('reset')
//     getData();
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   const NewsfeedCard = ({ item }) => {
//     const imageUrl = item?.images?.[0]?.image_url || 'default_image_url'; // Provide a default image URL if none exists

//     return (
//       <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('InnerScreen', { id: item.id })}>
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: imageUrl }} style={styles.image} />
//         </View>
//         <View style={styles.cardContent}>
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             {/* <Text style={styles.cardSubtitle}>Age: 02 Months</Text> */}
//           </View>
//           <Text numberOfLines={1} style={styles.cardDescription}>{item.description}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const [refreshing, setRefreshing] = React.useState(false);

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     // setTimeout(() => {
//     //   setRefreshing(false);
//     // }, 2000);

//     getData();

//   }, []);

//   return (
//     <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>

//       {
//         loader && <>
//           <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1, backgroundColor: '#0000009c', alignItems: 'center', justifyContent: 'center' }}>
//             <ActivityIndicator size="large" color="red" />
//           </View>
//         </>
//       }
//       <KeyboardAwareScrollView
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//       >
//         <View style={styles.container}>

//           <View style={styles.searchContainer}>
//             <View style={styles.searchBarStyle}>
//               <Icon name="search" size={25} color="#888" style={styles.searchIcon} />
//               <Input
//                 placeholder='Search here'
//                 placeholderTextColor='#888'
//                 inputContainerStyle={styles.inputContainer}
//                 inputStyle={styles.inputStyle}
//               />
//             </View>
//             <TouchableOpacity style={styles.FilterIcon} onPress={() => setSheet(true)}>
//               {/* <Filters /> */}
//               <Icon2 name="text" size={25} color={"#000000"} />
//             </TouchableOpacity>
//             <Filters sheet={sheet} setSheet={setSheet} filter={filter} FilterReset={FilterReset} />
//           </View>

//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Recent Posts</Text>
//             {/* <Text style={styles.seeAll}>See All</Text> */}
//           </View>

//           <View style={styles.cardListContainer}>
//             {recentPosts.map((item) => (
//               <NewsfeedCard key={item.id} item={item} />
//             ))}
//           </View>

//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Newsfeed</Text>
//           </View>

//           <View style={styles.cardListContainer}>
//             {newPosts.map((item) => (
//               <NewsfeedCard key={item.id} item={item} />
//             ))}
//           </View>
//         </View>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     paddingBottom: 20,
//     paddingTop: '5%',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   searchBarStyle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F2F2F2',
//     borderRadius: moderateScale(20, 0.1),
//     paddingHorizontal: 10,
//     width: moderateScale(290, 0.1),
//     height: moderateScale(34, 0.1),
//     marginTop: moderateScale(20, 0.1),
//   },
//   searchIcon: {
//     marginRight: 0,
//     marginBottom: moderateScale(5, 0.1),
//   },
//   inputContainer: {
//     borderBottomWidth: 0,
//     paddingHorizontal: 0,
//     marginLeft: 0,
//   },
//   inputStyle: {
//     fontSize: moderateScale(11, 0.1),
//     color: '#949494',
//     fontFamily: 'Poppins-Light',
//     marginTop: moderateScale(25, 0.1),
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 30,
//     alignItems: 'center',
//     width: '100%',
//     paddingHorizontal: moderateScale(30, 0.1),
//     marginBottom: 0,
//   },
//   sectionTitle: {
//     color: '#0082C6',
//     fontFamily: 'Poppins-Bold',
//     fontSize: moderateScale(14, 0.1),
//   },
//   seeAll: {
//     color: '#F15858',
//     fontFamily: 'Poppins-Bold',
//     fontSize: moderateScale(10, 0.1),
//     marginTop: moderateScale(5, 0.1),
//   },
//   cardListContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: moderateScale(30, 0.1),
//     paddingVertical: moderateScale(5, 0.1),
//     flexWrap: 'wrap',
//   },
//   card: {
//     backgroundColor: '#F1F1F1',
//     borderRadius: 8,
//     overflow: 'hidden',
//     width: '31%',
//     marginBottom: 15,
//   },
//   imageContainer: {
//     height: moderateScale(105, 0.1),
//   },
//   image: {
//     height: '100%',
//     width: '100%',
//     resizeMode: 'cover',
//   },
//   cardContent: {
//     padding: 5,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   cardTitle: {
//     color: '#F15858',
//     fontFamily: 'Poppins-Bold',
//     fontSize: moderateScale(10, 0.1),
//   },
//   cardSubtitle: {
//     color: '#F15858',
//     fontFamily: 'Poppins-Regular',
//     fontSize: moderateScale(6, 0.1),
//   },
//   cardDescription: {
//     color: '#969696',
//     fontFamily: 'Poppins-Regular',
//     fontSize: moderateScale(8, 0.1),
//   },
//   FilterIcon: {
//     marginTop: moderateScale(20, 0.1),
//     marginLeft: moderateScale(15, 0.1),
//     backgroundColor: "#F2F2F2",
//     padding: moderateScale(6, 0.1),
//     borderRadius: moderateScale(100, 0.1),
//   },
// });

import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import { moderateScale } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Filters from '../components/Filters'
import { useToast } from "react-native-toast-notifications";
import config from '../Providers/axios'
import { useSelector, useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [sheet, setSheet] = useState(false);

  const getData = async (data) => {
    setLoader(true);
    try {
      const res = await config.post('/get-post', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res && res.data) {
        setRecentPosts(res.data.recent_posts);
        setNewPosts(res.data.new_posts);
        setLoader(false);
        setRefreshing(false);
      }
    } catch (err) {
      setLoader(false);
      console.error('API Error:', err.message);
    }
  };

  const filter = (data) => {
    getData(data);
  }

  const FilterReset = () => {
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  const NewsfeedCard = ({ item }) => {
    const imageUrl = item?.images?.[0]?.image_url || 'default_image_url'; // Provide a default image URL if none exists

    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('InnerScreen', { id: item.id })}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
          <Text numberOfLines={1} style={styles.cardDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      {loader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      <KeyboardAwareScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBarStyle}>
              <Icon name="search" size={25} color="#888" style={styles.searchIcon} />
              <Input
                placeholder='Search here'
                placeholderTextColor='#888'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
              />
            </View>
            <TouchableOpacity style={styles.FilterIcon} onPress={() => setSheet(true)}>
              <Icon2 name="text" size={25} color={"#000000"} />
            </TouchableOpacity>
            <Filters sheet={sheet} setSheet={setSheet} filter={filter} FilterReset={FilterReset} />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Posts</Text>
          </View>

          <FlatList
            data={recentPosts}
            renderItem={({ item }) => <NewsfeedCard item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cardListContainer}
            numColumns={3}
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Newsfeed</Text>
          </View>

          <FlatList
            data={newPosts}
            renderItem={({ item }) => <NewsfeedCard item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cardListContainer}
            numColumns={3}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#0000009c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingTop: '5%'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: moderateScale(20, 0.1),
    paddingHorizontal: 10,
    width: moderateScale(290, 0.1),
    height: moderateScale(34, 0.1),
    marginTop: moderateScale(20, 0.1)
  },
  searchIcon: {
    marginRight: 0,
    marginBottom: moderateScale(5, 0.1)
  },
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    marginLeft: 0
  },
  inputStyle: {
    fontSize: moderateScale(11, 0.1),
    color: '#949494',
    fontFamily: 'Poppins-Light',
    marginTop: moderateScale(25, 0.1)
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: moderateScale(30, 0.1),
    marginBottom: 0
  },
  sectionTitle: {
    color: '#0082C6',
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(14, 0.1)
  },
  seeAll: {
    color: '#F15858',
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(10, 0.1),
    marginTop: moderateScale(5, 0.1)
  },
  cardListContainer: {
    width: '100%',
    paddingHorizontal: moderateScale(30, 0.1),
    paddingVertical: moderateScale(5, 0.1)
  },
  card: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    overflow: 'hidden',
    width: '31%',
    marginBottom: 15,
    marginHorizontal: '1.5%'
  },
  imageContainer: {
    height: moderateScale(105, 0.1)
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  cardContent: {
    padding: 5
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardTitle: {
    color: '#F15858',
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(10, 0.1)
  },
  cardSubtitle: {
    color: '#F15858',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(6, 0.1)
  },
  cardDescription: {
    color: '#969696',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(8, 0.1)
  },
  FilterIcon: {
    marginTop: moderateScale(20, 0.1),
    marginLeft: moderateScale(15, 0.1),
    backgroundColor: "#F2F2F2",
    padding: moderateScale(6, 0.1),
    borderRadius: moderateScale(100, 0.1)
  }
});

