import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Touchable,
  Button
} from "react-native";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  addDays,
  subDays,
  format,
  parseISO
} from "date-fns";
import PagerView from "react-native-pager-view";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import React, {useState, useEffect, useRef, useMemo, useCallback} from "react";
import {CalendarList, DateData} from 'react-native-calendars';
import BottomSheet from '@gorhom/bottom-sheet';

import TextSmall from "../common/TextSmall";
import TextSmallDark from "../common/TextSmallDark";
import TextThin from "../common/TextThin";
import TextUnderline from "../common/TextUnderline";
import useGlobal from "../core/global";

// const Drawer = createDrawerNavigator();

const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 14),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 1,
  }
).reduce((acc, cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });

  acc.push(allDays);

  return acc;
}, []);

const styles = StyleSheet.create({
  calContainer: {
    flex: 0.16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  calBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#7B7B7B",
    borderStyle: "solid",
    width: 50,
    height: 60,
  },
  calText: {},
});


const Home = ({ navigation }) => {
  const startTimer = useGlobal((state) => state.startTimer);
  const userId = useGlobal((state) => state.userId);
  const storeYogaLogs = useGlobal((state) => state.storeYogaLogs);
  const myYogaLogs = useGlobal((state) => state.myYogaLogs);
  const storeCurrentYogaLogs = useGlobal((state) => state.storeCurrentYogaLogs);
  const currentYogaLogs = useGlobal((state) => state.currentYogaLogs);
  const yogaViewMinutes = useGlobal((state) => state.yogaViewMinutes);
  const yogaViewSeconds = useGlobal((state) => state.yogaViewSeconds);
  const storeYogaView = useGlobal((state) => state.storeYogaView);
  const timerRunning = useGlobal((state) => state.timerRunning);
  const homeCurrentDate = useGlobal((state) => state.homeCurrentDate);
  const storeHomeCurrentDate = useGlobal((state) => state.storeHomeCurrentDate);

  const fullCalendarView = useGlobal((state) => state.fullCalendarView);
  const openFullCalendar = useGlobal((state) => state.openFullCalendar);
  const closeFullCalendar = useGlobal((state) => state.closeFullCalendar);

  const [selected, setSelected] = useState(initialDateReformat);

  
  // ref
  const bottomSheetRef = useRef(null);

  const handleClosePress = () => bottomSheetRef.current.close()
  const handleOpenPress = () => bottomSheetRef.current.snapToIndex(1)


  //variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return {
      mmss: `${formattedMinutes}:${formattedSeconds}`,
      minutes: formattedMinutes,
      seconds: formattedSeconds,
    };
  };

  // useFocusEffect(
  //     React.useCallback(() => {
  //       getYogaLogsByUser();

  //       const currentDate = new Date().toISOString().split('T')[0];

  //       const yogaLogsToday = myYogaLogs.filter((log) => {
  //         const logDate = new Date(log.completedAt);
  //         const logDateFormatted = logDate.toISOString().split('T')[0];

  //         return logDateFormatted === currentDate;
  //       });

  //       console.log('today', yogaLogsToday);

  //       storeCurrentYogaLogs(yogaLogsToday)

  //       // add all the time
  //       const totalSecondsToday = yogaLogsToday.reduce((total, log) => total + log.time, 0);
  //       console.log('totalSecondsToday', totalSecondsToday);

  //       const { mmss, minutes, seconds } = formatTime(totalSecondsToday);
  //       storeYogaView(minutes, seconds)
  //     }, [])
  // );


  useEffect(() => {
    const getYogaLogsByUser = async () => {
      const url = `http://127.0.0.1:8000/api/yogalogs/${userId}/`;

      try {
        const response = await axios.get(url);
        const yogaLogsData = response.data; // Assuming the response contains YogaLogs data

        // Handle and process the yogaLogsData as needed
        console.log("yogaLogsData", yogaLogsData);
        storeYogaLogs(yogaLogsData)

        const currentDate = new Date().toISOString().split("T")[0];
        console.log('currentDate', currentDate)

        const yogaLogsToday = yogaLogsData.filter((log) => {
          const logDate = new Date(log.completedAt);
          const logDateFormatted = logDate.toISOString().split("T")[0];

          return logDateFormatted === currentDate;
        });


        const totalSecondsToday = yogaLogsToday.reduce(
          (total, log) => total + log.time,
          0
        );
        console.log("totalSecondsToday", totalSecondsToday);

        const { mmss, minutes, seconds } = formatTime(totalSecondsToday);
        storeYogaView(minutes, seconds);

      } catch (error) {
        console.error("Axios error:", error);
      }
    };

    getYogaLogsByUser();

    const todayDate = new Date()
    console.log('today date', todayDate)
    const todayDateFormat = format(todayDate, "do MMMM yyyy")
    storeHomeCurrentDate(todayDateFormat)
    
  }, [timerRunning]);


  // useEffect(() => {
  //     getYogaLogsByUser();
  // }, []);

  const startYoga = () => {
    navigation.navigate("YogaQuote");
    startTimer();
    console.log("start");
  };

  const changeOverview = (day) => {
    const dateSelected = day
    console.log('currentDate - change', dateSelected)
    console.log('myYogaLogs', myYogaLogs)

    const yogaLogsByDate = myYogaLogs.filter((log) => {
        
        const date = parseISO(log.completedAt);
        const reformatDate = format(date, "do MMMM yyyy")
        console.log('log',reformatDate)

        return reformatDate === dateSelected
    })

    console.log(yogaLogsByDate, 'ylbd')

    storeHomeCurrentDate(dateSelected)

    const totalSecondsByDate = yogaLogsByDate.reduce(
        (total, log) => total + log.time,
        0
      );
      console.log("totalSecondsToday", totalSecondsByDate);

      const { mmss, minutes, seconds } = formatTime(totalSecondsByDate);
      storeYogaView(minutes, seconds);
  }

  const viewFullCalendar = () => {
    openFullCalendar()
  }

  const closeTheFullCalendar = () => {
    closeFullCalendar()
  }

  const viewShareScreen = () => {
    navigation.navigate('Share')
  }

  

  // CALENDAR STUFF 

  const RANGE = 24;
    const initialDate = new Date()
    const initialDateReformat = format(initialDate, 'yyyy-MM-dd')
    const nextWeekDate = '2022-07-14';
    const nextMonthDate = '2022-08-05';

// interface Props {
//   horizontalView?: boolean;
// }

// const CalendarListScreen = (props: Props) => {
//   const {horizontalView} = props;
//   const [selected, setSelected] = useState(initialDate);
//   const marked = useMemo(() => {
//     return {
//       [nextWeekDate]: {
//         selected: selected === nextWeekDate,
//         selectedTextColor: '#5E60CE',
//         marked: true
//       },
//       [nextMonthDate]: {
//         selected: selected === nextMonthDate,
//         selectedTextColor: '#5E60CE',
//         marked: true
//       },
//       [selected]: {
//         selected: true,
//         disableTouchEvent: true,
//         selectedColor: '#5E60CE',
//         selectedTextColor: 'white'
//       }
//     };
//   }, [selected]);

//   const onDayPress = useCallback((day: DateData) => {
//     setSelected(day.dateString);
//   }, []);

  // CALENDAR STUFF 

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
    handleOpenPress()
    const dateSelected = selected
    console.log('THISTHISTHIS', dateSelected)

    const yogaLogsByDate = myYogaLogs.filter((log) => {
        
        const date = parseISO(log.completedAt);
        const reformatDate = format(date, 'yyyy-MM-dd')
        console.log('log',reformatDate)

        return reformatDate === dateSelected
    })

    console.log(yogaLogsByDate, 'ylbd')

    storeHomeCurrentDate(dateSelected)

    const totalSecondsByDate = yogaLogsByDate.reduce(
        (total, log) => total + log.time,
        0
      );
      console.log("totalSecondsToday", totalSecondsByDate);

      const { mmss, minutes, seconds } = formatTime(totalSecondsByDate);
      storeYogaView(minutes, seconds);
}, []);

console.log('selected', selected)

  return (
    (fullCalendarView === true) ? (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex:0.08 , width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <TextSmall
                            text='Calendar'
                            color="#d0d0d0"
                            size={17}
                        />
            </View>
            <View style={{ flex:0.05 , width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{paddingLeft: 24, paddingRight: 24}}>
                    <TextSmall
                            text='S'
                            color="#d0d0d0"
                            size={14}
                        />
                    </View>
                    <View style={{paddingLeft: 24, paddingRight: 24}}>
                    <TextSmall
                            text='M'
                            color="#d0d0d0"
                            size={14}
                        />
                    </View>
                    <View style={{paddingLeft: 24, paddingRight: 24}}>
                    <TextSmall
                            text='T'
                            color="#d0d0d0"
                            size={14}
                        />
                    </View>
                    <View style={{paddingLeft: 24, paddingRight: 24}}>
                    <TextSmall
                            text='W'
                            color="#d0d0d0"
                            size={14}
                        />
                    </View>
                    <View style={{paddingLeft: 24, paddingRight: 24}}>
                    <TextSmall
                            text='T'
                            color="#d0d0d0"
                            size={14}
                        />
                    </View>
                    <View style={{paddingLeft: 24, paddingRight: 24}}>
                    <TextSmall
                            text='F'
                            color="#d0d0d0"
                            size={14}
                        />
                    </View>
                    <View style={{paddingLeft: 24, paddingRight: 24}}>
                    <TextSmall
                            text='S'
                            color="#d0d0d0"
                            size={14}
                        />
                    </View>
            </View>
            <View style={{ flex:0.87 , width: '100%'}}>
            <CalendarList
                current={initialDateReformat}
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={5}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={5}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                // calendarStyle={{
                //     backgroundColor: '#080808',
                //     color: '#d0d0d0'
                // }}
                theme={{
                    calendarBackground: 'transparent',
                    selectedDayBackgroundColor: 'white',
                    todayTextColor: '#212121',
                    todayBackgroundColor: '#a8a8a8',
                    dayTextColor: '#676767',
                    textDayFontSize: 14,
                    dotColor: 'lightblue',
                    monthTextColor: '#626262',
                    textSectionTitleColor: 'blue',
                    'stylesheet.calendar.main': {
                        dayContainer: {
                          borderColor: '#D1D3D4',
                          backgroundColor: '#3333336c',
                          borderWidth: 0,
                          flex:1,
                          paddingLeft: 16,
                          paddingTop: 18,
                          margin: 2,
                          alignItems: 'flex-end', 
                          justifyContent: 'flex-end',
                        },
                        emptyDayContainer: {
                          borderColor: 'transparent',
                          borderWidth:0,
                          flex:1,
                          padding:10
                        },
                        week: {
                          marginTop: 0,
                          marginBottom: 0,
                          flexDirection: 'row',
                          justifyContent: 'space-around'
                        },
                      },
                    'stylesheet.calendar.header': {
                        // header: {
                        //   height: 0,
                        //   opacity: 0
                        // },
                        week: {
                            height: 0,
                         }
                      }
                
                }}
                calendarHeight={320}
                onDayPress={onDayPress}
                />
            </View>

            <View style={{ paddingTop: 35, paddingBottom: 30 }}>
                <TouchableOpacity
                    onPress={closeTheFullCalendar}>
                <TextSmall
                text="return home"
                color="#d0d0d0"
                size={13}
                />
                </TouchableOpacity>
            </View>

                
            <BottomSheet 
              ref={bottomSheetRef} 
              index={1} 
              snapPoints={snapPoints}
              backgroundStyle={{backgroundColor: '#111111ec'}}
            >
              <View style={{ flex: 0.3, paddingLeft: 30, paddingRight: 30 }}>
                <Text style={{ color: "#676767", marginLeft: 4 }}>
                   {homeCurrentDate}
                 </Text>

                <View
                  style={{
                    height: 68,
                    flexDirection: "row",
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#8546AB",
                    backgroundColor: "#8446ab17",
                    borderStyle: "solid",
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingTop: 16,
                    paddingBottom: 16,
                  }}
                >
                  <Fontisto name="day-sunny" size={30} color="#8546AB" />
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      paddingLeft: 20,
                      marginTop: -2,
                    }}
                  >
                    <TextSmall
                      text={`completed ${yogaViewMinutes} minutes ${yogaViewSeconds} seconds of yoga`}
                      color="#d0d0d0"
                      size={13}
                    />

                    <TextSmallDark text="today’s reminder: strength" color="#5a5a5a" />
                  </View>
                </View>
                
            <Button title="Close Sheet" onPress={handleClosePress} />
            </View>
            </BottomSheet>
            
        </SafeAreaView>
    ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingTop: 35, paddingBottom: 30 }}>
        <TextSmall
          text="you did it, the hardest part is showing up."
          color="#d0d0d0"
          size={13}
        />
      </View>

      <PagerView 
        style={styles.calContainer}
        initialPage={2}>
        {dates.map((week, i) => {
          return (
            <View key={i} style={{ display: "flex", alignItems: "center" }}>
              {/* <TextSmallDark text={month} color="#323232" /> */}
              <View style={styles.row}>
                {week.map((day, j) => {
                  const txt = format(day, "EEE").toUpperCase();
                  const month = format(day, "MMM").toUpperCase();
                  const fullDate = format(day, "do MMMM yyyy");

                  return (
                    <TouchableOpacity 
                        key={j} 
                        onPress={() => changeOverview(fullDate)}
                    >
                        <View key={j}
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 10,
                                marginLeft: 5,
                                marginRight: 5,
                                borderWidth: 0.5,
                                borderRadius: 10,
                                borderColor: "#7B7B7B",
                                borderStyle: "solid",
                                width: 50,
                                height: 60,
                                backgroundColor: fullDate === homeCurrentDate ? '#ffffff14' : 'transparent'
                            }}>
                        <TextSmall
                            text={month}
                            color="#d0d0d0"
                            size={7}
                        />
                        <TextSmall
                            text={day.getDate()}
                            color="#d0d0d0"
                            size={17}
                        />
                        <TextSmall text={txt} color="#d0d0d0" size={10} />
                        </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </PagerView>

      <View style={{ flex: 0.3, paddingLeft: 30, paddingRight: 30 }}>
        <Text style={{ color: "#676767", marginLeft: 4 }}>
          {homeCurrentDate}
        </Text>

        <View
          style={{
            height: 68,
            flexDirection: "row",
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#3d3d3d",
            borderStyle: "solid",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          <Fontisto name="day-sunny" size={30} color="#414141" />
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              paddingLeft: 20,
              marginTop: -2,
            }}
          >
            <TextSmall
              text={`completed ${yogaViewMinutes} minutes ${yogaViewSeconds} seconds of yoga`}
              color="#d0d0d0"
              size={13}
            />

            <TextSmallDark text="today’s reminder: strength" color="#5a5a5a" />
          </View>
        </View>

        <View
          style={{
            height: 68,
            flexDirection: "row",
            marginTop: 10,
            // borderWidth: 1,
            borderRadius: 10,
            borderColor: "#3d3d3d",
            borderStyle: "solid",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          {/* <MaterialCommunityIcons
            name="tree-outline"
            size={30}
            color="#414141"
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              paddingLeft: 20,
              marginTop: -2,
            }}
          >
            <TextSmall text="a journal was logged" color="#d0d0d0" size={13} />

            <TextSmallDark
              text="note to self: create positive vibes"
              color="#5a5a5a"
            />
          </View> */}
        </View>
      </View>

      <View
        style={{
          flex: 0.2,
          paddingLeft: 20,
          paddingRight: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginLeft: 95,
          marginRight: 95,
          marginTop: 5,
        }}
      >
        <TextSmall text="DAY" color="#929292" size={14} />
        <TextThin text="67" color="#aaaaaa" size={100} />
      </View>
        
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          justifyContent: "space-around",
          marginLeft: 150,
          marginRight: 110,
        }}
      > 
      <TouchableOpacity
        onPress={viewFullCalendar}>
        <TextUnderline text="view full calendar" color="#313131" size={14} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={viewShareScreen}>
        <Feather name="share-2" size={18} color="#313131" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.15,
          paddingTop: 20,
          paddingLeft: 60,
          paddingRight: 60,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 25,
            paddingHorizontal: 38,
            borderRadius: 4,
            elevation: 3,
            borderWidth: 1,
            borderRadius: 40,
            borderColor: "#5e5e5e",
            borderStyle: "solid",
          }}
          onPress={startYoga}
        >
          <TextSmall text="start my yoga practice" color="#d0d0d0" size={17} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
  );
};

export default Home;
