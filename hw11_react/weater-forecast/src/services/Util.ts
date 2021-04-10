import moment from 'moment';

export  class Util {

  constructor() {}

  public getTemperatureCFormatted(temp: number): string {
    return `${Math.round(temp) - 273}°C`;
  }

  public getDate(timestamp: number): string {
    return moment(timestamp,'X').format("DD.MM.Y")
  }

  public getTime(timestamp: number): string {
    return moment(timestamp,'X').format("HH:mm");
  }
}