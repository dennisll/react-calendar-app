

import {configureStore} from '@reduxjs/toolkit';
//import { uiSlice } from './ui/uiSlice';
//import { calendarSlice } from './calendar/calendarSlice';
import { uiSlice, calendarSlice, authSlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
       serializableCheck: false // para que no revise si puede serializar las fechas
    })
})