import { Result } from "@/interfaces";

export  class ResultsHelper {

  STORAGE_KEY: string = process.env.VUE_APP_STORAGE_KEY;

  constructor() {}

  public getList(): Result[] {
    const result: Result[] = [];
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

  public addResult(result: Result): void {
    const list = this.getList();
    const now = new Date();
    result.date = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    list.push(result);
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(list));
  }
}