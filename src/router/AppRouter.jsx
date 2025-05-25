
import {Route, Routes} from 'react-router-dom';
import { CalendarPage } from '../calendar';
import { LoginPage } from '../auth';

export const AppRouter = () => {

    const authStates = 'authenticated' //'not-authenticated'


  return (

    <Routes>

        {
            authStates === 'not-authenticated' 
            ? (<Route path='/auth/*' element= {<LoginPage/>} />)
            : (<Route path='/*' element= {<CalendarPage/>} />)

        }
      
     {/*  <Route path='/*' element= {<LoginPage/>} /> */}

    </Routes>
  )
}
