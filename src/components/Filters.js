import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/Fontisto'
import Icon5 from 'react-native-vector-icons/MaterialIcons'
import { Input } from 'react-native-elements';
import RoundButton from './RoundButton';
import config from '../Providers/axios'
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import GooglePlaces from '../components/GooglePlaces';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native';
import moment from 'moment';



const Filters = ({sheet, setSheet, filter, FilterReset}) => {
  const [loader, setloader] = useState(false)
  const [type, setType] = useState([])
  const [colors, setColors] = useState([])
  const [breeds, setBreeds] = useState([])
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [location, setLocation] = useState(null)


  const [colorGet, setColorGet] = useState(null)
  const [typeGet, setTypeGet] = useState(null)
  const [breedGet, setBreedGet] = useState(null)
  const [colarNo, setcolarNo] = useState(null)
  const [date, setdate] = useState()
  const [opendate, setopendate] = useState(false)

  const RBSheetRef = useRef();

  const placeholderStyle = {
    color: '#888',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  };

  const showDatePicker = () => {
    setopendate(true);
  };

  const hideDatePicker = () => {
    setopendate(false);
  };

  const handleConfirm = (date) => {
    setdate(date)
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const getData = async () => {
    setloader(true);
    try {
      const res = await config.get('/get-pet-details', {
      });
      if (res && res.data) {
        console.log('Response Data', res.data)
        setBreeds(res.data?.breeds)
        setColors(res.data?.colors)
        setType(res.data?.types)
        setloader(false);
      }
    } catch (err) {
      setloader(false);
      console.error('API Error:', err.message);
    }
  };

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(sheet){
      RBSheetRef.current.open()
    }
  }, [sheet])
  

  const Filter = async () => {
    let data = {
      collar_no: colarNo,
      date: moment(date).format('DD-MM-YYYY'),
      type: typeGet,
      color: colorGet,
      breed: breedGet
    }
    filter({filter:data})
    RBSheetRef.current.close()
    console.log(data)
  };

  const Reset = () => {
    FilterReset()
    RBSheetRef.current.close()
  }

  

  return (
    <SafeAreaView>
      <RBSheet
        ref={RBSheetRef}
        height={530}
        openDuration={200}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderRadius: moderateScale(10, 0.1)
          }
        }}
        onClose={() => setSheet(false)}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.DropDownHeading}>Collar No./Pet Name</Text>
          <View style={styles.InnerInputs}>
            <Icon name="search" size={20} color="#888" style={styles.InputIcons} />
            <Input
              placeholder='Collar No/Pet Name'
              style={styles.InputStyle}
              inputContainerStyle={styles.inputContainer}
              onChangeText={(v) => setcolarNo(v)}
            />
          </View>

          <Text style={styles.DropDownHeading}>Date and Time</Text>
          <TouchableOpacity style={styles.InnerInputs} onPress={showDatePicker} >
            <Icon4 name="date" size={18} color="#888" style={styles.InputIcons} />
            <View onPress={showDatePicker} >
              <Text style={styles.DateTimetext}>Selected Date: {moment(date).format('MMMM Do YYYY')}</Text>
              <DateTimePickerModal
                isVisible={opendate}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
              />
              
            </View>

          </TouchableOpacity>

          
          <Text style={styles.DropDownHeading}>Pet Type</Text>
          <View style={[styles.rncspicker, Platform.OS == 'ios' ? styles.pico : null]}>
            <Icon5 name="pets" size={20} color="#888" style={{ position: 'absolute', top: 15, left: 15 }} />
            <RNPickerSelect
            style={{ inputAndroid: { color: 'black' } }}
              onValueChange={(val) => setTypeGet(val)}
              items={type}
              placeholder={{
                label: "select the type",
                value: null,
                color: "#888",
                fontFamily: 'Poppins-Medium'
              }}

            />
          </View>
          {/* </View> */}
          {/* </View>   */}


          <Text style={styles.DropDownHeading}>Pet Color</Text>
          <View style={[styles.rncspicker, Platform.OS == 'ios' ? styles.pico : null]}>
            <Icon5 name="pets" size={20} color="#888" style={{ position: 'absolute', top: 15, left: 15 }} />
            <RNPickerSelect
              style={{ inputAndroid: { color: 'black' } }}
              onValueChange={(val) => setColorGet(val)}
              items={colors}
              placeholder={{
                label: "select the color",
                value: null,
                color: "#888",
                fontFamily: 'Poppins-Medium'
              }}

            />
          </View>

          <Text style={styles.DropDownHeading}>Pet Breed</Text>
          <View style={[styles.rncspicker, Platform.OS == 'ios' ? styles.pico : null]}>
            <Icon5 name="pets" size={20} color="#888" style={{ position: 'absolute', top: 15, left: 15 }} />
            <RNPickerSelect
            style={{ inputAndroid: { color: 'black' } }}
              onValueChange={(val) => setBreedGet(val)}
              items={breeds}
              placeholder={{
                label: "select the breed",
                value: null,
                color: "#888",
                fontFamily: 'Poppins-Medium'
              }}
              placeholderStyle={placeholderStyle}

            />
          </View>
          <View style={{ alignContent: 'center', alignItems: 'center', marginTop: moderateScale(10, 0.1) }}>
            <RoundButton label={"search"} onPress={Filter} />

            
          </View>

          <View style={{ alignContent: 'center', alignItems: 'center', marginTop: moderateScale(10, 0.1) }}>
            <RoundButton label={"reset"} onPress={Reset} />

            
          </View>


        </View>
      </RBSheet>
    </SafeAreaView>
  )
}

export default Filters



const styles = StyleSheet.create({
  pico:{
    height:50,
    paddingHorizontal:moderateScale(15, 0.1),
    paddingTop:moderateScale(15, 0.1),
    paddingLeft:moderateScale(48, 0.1),
},
  rncspicker:{
    position: 'relative', 
    backgroundColor: '#f1f1f1', 
    borderRadius: 20, 
    paddingRight: moderateScale(10, 0.1), 
    width: '100%', 
    marginLeft: moderateScale(0, 0.1),
    paddingLeft: moderateScale(30, 0.1), 
    marginBottom: 5, 
    height:moderateScale(52, 0.1),
    alignItems:'center'
  },
  sheetContent: {
    backgroundColor: 'white',
    paddingHorizontal: 15
  },
  DropDownHeading: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    paddingLeft: moderateScale(15, 0.1),

  },
  InputStyle: {
    fontSize: moderateScale(12, 0.1),
    fontFamily: 'Poppins-Light',
    paddingTop: 15
  },
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    marginLeft: 0,
  },
  searchBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: moderateScale(10, 0.1),
    marginLeft: moderateScale(40, 0.1),
    marginRight: moderateScale(40, 0.1),
    height: moderateScale(34, 0.1),
    marginTop: moderateScale(10, 0.1)
  },
  searchIcon: {
    marginRight: 0,
    marginBottom: moderateScale(10, 0.1)
  },
  InnerInputs: {
    flexDirection: 'row',
    backgroundColor: "#F2F2F2",
    height: moderateScale(55, 0.1),
    marginRight: moderateScale(0, 0.1),
    borderRadius: 20,
    paddingLeft: moderateScale(15, 0.1),
    marginBottom: moderateScale(5, 0.1),
  },
  InputIcons: {
    marginTop: moderateScale(17, 0.1)
  },
  PetTypeStyle: {
    flexDirection: 'row',
  },
  DateTimetext:{
    fontFamily:'Poppins-Light',
    fontSize:13,
    top:moderateScale(20,0.1),
    color:'#888',
    paddingLeft:moderateScale(15,0.1) 
  },
  

})
