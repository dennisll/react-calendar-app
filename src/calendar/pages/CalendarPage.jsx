import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar, CalendarEvent, CalendarModal } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'



const events = [{
  title: 'aniversario',
  notes: 'comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: '#fafafa',
  user: {
    _id: 'bjgb',
    name: 'fernando'
  }
}];

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected)=>{

    console.log({event, start, end, isSelected});

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

  const onDoubleClick = (event)=>{
    console.log({ doubleClick: event});
  }

  const onSeleted = (event)=>{
    console.log({ click: event});
  }

  const onViewChanged = (event)=>{
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
    </>
  )
}
