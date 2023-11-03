import { create } from 'zustand'
import { generate } from "random-words";
import {
    format,
} from "date-fns";

const useGlobal = create((set) => ({

    //---------------------
	//   Initialization
	//---------------------

	initialized: false,

	init: () => {
        set((state) => ({
            initialized: true,
        }))
    },
  
    //-----------------------
    // Authentication 
    //-----------------------

    authenticated: false, 
    userId: {},

    login: (userId) => {
        set((state) => ({
            authenticated: true,
            userId: userId
        }))
    },

    logout: () => {
        set((state) => ({
            authenticated: false,
            userId: {}
        }))
    },



    //-----------------------
    // Home View
    //-----------------------

    homeCurrentDate: '',
    fullCalendarView: false,

    storeHomeCurrentDate: (date) => {
        set((state) => ({
            homeCurrentDate: date,
        }))
    },

    openFullCalendar:() => {
        set((state) => ({
            fullCalendarView: true,
        }))
    },

    closeFullCalendar:() => {
        set((state) => ({
            fullCalendarView: false,
        }))
    },




    //-----------------------
    // My Yoga Logs
    //-----------------------

    myYogaLogs: [],
    currentYogaLogs: [],
    yogaViewMinutes: null,
    yogaViewSeconds: null,

    storeYogaLogs: (data) => {
        set((state) => ({
            myYogaLogs: data,
        }))
    },

    storeCurrentYogaLogs: (data) => {
        set((state) => ({
            currentYogaLogs: data,
        }))
    },

    storeYogaView: (min, sec) => {
        set((state) => ({
            yogaViewMinutes: min,
            yogaViewSeconds: sec,
        }))
    },

    //-----------------------
    // Yoga Reminder
    //-----------------------

    word1: 'strength',
    word2: 'love', 
    word3: 'positivity',

    reminder: '',
    

    generateRandom: () => {
        set((state) => ({
            word1: generate(),
            word2: generate(), 
            word3: generate(),
        }))
    },

    setReminder: (reminder) => {
        set((state) => ({
            reminder: reminder
        }))
    },

    editReminder: (reminder) => {
        set((state) => ({
            reminder: reminder
        }))
    },

    resetReminder: () => {
        set((state) => ({
            word1: 'strength',
            word2: 'love', 
            word3: 'positivity',
        }))
    },


    //-----------------------
    // Yoga Timer
    //-----------------------

    time: 0, 
    interval: null,
    timerRunning: false,
    

    startTimer: () => {
        const intervalId = setInterval(() => {
          set((state) => ({
            time: state.time + 1,
            interval: intervalId,
            timerRunning: true
          }));
        }, 1000);
      },
      
    stopTimer: () => {
    set((state) => {
        if (state.interval) {
        clearInterval(state.interval);
        }
        return { interval: null };
    });
    },


    clearTimer: () => {
        set((state) => ({
            time: 0,
            timerRunning: false
        }))
    },


}))

export default useGlobal