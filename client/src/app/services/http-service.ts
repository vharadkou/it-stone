import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
  })
export class HttpService {
  public constructor() {}



  public sendDragAndDropEvent(event): void {
      console.log('post request with'+ event)
  }

  public sendMyCardAttackEvent(event): void {
    console.log('post request with'+ event)
  }
}