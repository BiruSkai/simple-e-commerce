import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const Datepickers = () => {
        return ( 
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Birthdate" name="birthdate"/>
                 </LocalizationProvider>
         );
}
 
export default Datepickers;