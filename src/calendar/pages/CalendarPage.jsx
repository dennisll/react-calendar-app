import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useEffect, useState } from 'react'
import { useAuthStore, useUiStore } from '../../hooks'
import { useCalendarStore } from '../../hooks'
import Swal from 'sweetalert2'


export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { openDateModal } = useUiStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event) => { //, start, end, isSelected

    const isMyEvent = (user._id === event.user._id);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {

    if (event.user._id !== user._id ) {
      Swal.fire("Error al editar el evento", "No tiene los permisos para la edicion de este evento", "error");
      return;
    }
    openDateModal();
  }

  const onSeleted = (event) => {

    setTimeout(() => {
      setActiveEvent(event);
    }, 200);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const myEvents = events.filter( event => event.user._id === user._id);


  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={myEvents} //events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSeleted}
        onView={onViewChanged}
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />

    </>
  )
}
