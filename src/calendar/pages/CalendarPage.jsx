import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'
import { useUiStore } from '../../hooks'
import { useCalendarStore } from '../../hooks'


export const CalendarPage = () => {

  const {openDateModal} = useUiStore();

  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ()=>{

    const style = {
      backgroundColor: '#2F2A45',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = () => {
    //console.log({ doubleClick: event});
    openDateModal();
  }

  const onSeleted = (event) => {
    setTimeout(()=>{
      setActiveEvent(event);
    }, 200);
    //setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }


  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick}
        onSelectEvent={onSeleted}
        onView={onViewChanged}
      />

      <CalendarModal/>

      <FabAddNew/>
      <FabDelete/>

    </>
  )
}
