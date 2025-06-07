import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import { useUiStore } from "./useUiStore";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from 'sweetalert2';

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { isDateModalOpen } = useUiStore();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {

    try {
      const event = {
        start: new Date(calendarEvent.start).getTime(),
        end: new Date(calendarEvent.end).getTime(),
        title: calendarEvent.title,
        notes: calendarEvent.notes,
      };

      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, event);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      } 

      const { data } = await calendarApi.post("/events", event);

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    } 
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  const startDeletingEvent = async() => {
    // Todo: Llegar al backend
    try {

        await calendarApi.delete(`/events/${ activeEvent.id }` );
        dispatch( onDeleteEvent() );
    } catch (error) {
        console.log(error);
        Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }

}

  return {
    //* propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent && !isDateModalOpen,
    //*metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
