import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent} from "../store";
import { useUiStore } from "./useUiStore";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const {isDateModalOpen} = useUiStore();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch( onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = (calendarEvent) =>{

    //TODO: llegar al backend

    //todo bien 
    if(calendarEvent._id){
        dispatch(onUpdateEvent({...calendarEvent}))
    }else{
        dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
    }

  }

  const startDeletingEvent = async () => {

    //llegar al backend

    dispatch(onDeleteEvent());
  }

  return {
    //* propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent && !isDateModalOpen,
    //*metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  };
};
