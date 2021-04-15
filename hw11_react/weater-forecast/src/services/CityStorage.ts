import { City } from '../interfaces';

export  class CityStorage {

  STORAGE_KEY: string = process.env.STORAGE_KEY;

  constructor() {}

  public getList(): City[] {
    const result: City[] = [];
    let data = localStorage.getItem(this.STORAGE_KEY);
    let arData = JSON.parse(data);
    if(arData instanceof Array) {
      arData.forEach( item => result.push(item));
    }

    return result;
  }

  public clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public addCity(city: City): void {
    const list = this.getList();
    list.push(city);
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(list));
  }

  public removeCity(city: City): void {
    const list = this.getList();
    const listAfterRemoval = list.filter( item => (item.code !== city.code) || (item.lat !== city.lat) || (item.lon !== city.lon));
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(listAfterRemoval));
  }

  public isCityInStorage(code: string, lat: number, lon: number): boolean {
    const city = this.getList().find( item => (item.code === code) && (item.lat === lat) && (item.lon === lon) );
    return city !== undefined ? true : false;
  }
}