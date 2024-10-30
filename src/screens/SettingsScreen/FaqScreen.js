
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../components/MainHeader';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../Providers/axios';

const FaqScreen = ({ navigation }) => {
  const [faqItems, setFaqItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleExpand = (index) => {
    setFaqItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].expanded = !newItems[index].expanded;
      return newItems;
    });
  };

  const duplicateFaqItems = (items, times) => {
    let duplicatedItems = [];
    for (let i = 0; i < times; i++) {
      duplicatedItems = [...duplicatedItems, ...items];
    }
    return duplicatedItems;
  };

  const getData = async () => {
    setLoader(true);

    try {
      const res = await config.get('/get-faq');
      console.log('API Response:', res.data);

      if (res && res.data && res.data.faqs) {
        const duplicatedFaqs = duplicateFaqItems(res.data.faqs, 3);
        const faqData = duplicatedFaqs.map(faq => ({ ...faq, expanded: false }));
        setFaqItems(faqData);
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      if (err.response) {
        console.error('API Response Error:', err.response.data);
        console.error('Status:', err.response.status);
        console.error('Headers:', err.response.headers);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error:', err.message);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {loader && (
        <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1, backgroundColor: '#0000009c', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      <View style={styles.container}>
        <MainHeader navigation={navigation} backButton={true} logo={false} heading={'FAQs'} />
        <View style={{ paddingHorizontal: moderateScale(30, 0.1), justifyContent: 'space-between', flex: 1 }}>
          <View style={{ marginTop: moderateScale(50, 0.1) }}>
            {faqItems.map((item, index) => (
              <View key={`${item.id}-${index}`}>
                <TouchableOpacity
                  style={[styles.searchBarStyle, { backgroundColor: item.expanded ? '#C11E1E' : '#F8F8F8' }]}
                  onPress={() => handleExpand(index)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                    <Text style={[styles.termsText, { color: item.expanded ? 'white' : '#000000' }]}>{item.title}</Text>
                    <Icon2 name={item.expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={25} color={item.expanded ? 'white' : 'black'} />
                  </View>
                </TouchableOpacity>
                {item.expanded && (
                  <View style={styles.expandedContent}>
                    <Text style={styles.expandedText}>{item.description}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(10, 0.1),
    paddingVertical: moderateScale(6, 0.1),
    paddingHorizontal: moderateScale(15, 0.1),
    marginBottom: moderateScale(10, 0.1),
  },
  termsText: {
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12, 0.1),
    padding: moderateScale(10, 0.1),
    flex: 1,
  },
  expandedContent: {
    backgroundColor: '#F8F8F8',
    padding: moderateScale(10, 0.1),
    borderRadius: moderateScale(10, 0.1),
    marginTop: moderateScale(0, 0.1),
    marginBottom: moderateScale(10, 0.1)
  },
  expandedText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(10, 0.1),
    color: '#000000'
  },
});

