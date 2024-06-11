import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HandleTimeService {

  constructor() { }



 public getTime(value:string) :string{
    const now = moment();
    const then = moment(value);
    const minutesDifference = now.diff(then, 'minutes');
    
    if (minutesDifference < 60) {
      return `${minutesDifference}m`;
    } else if (minutesDifference < 1440) { // Less than 24 hours
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference}h`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference}d`;
    }
  }
}
