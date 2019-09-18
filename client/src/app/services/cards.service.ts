import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Card } from "models";
import { CardsFacade } from "store";
import {SpellService} from '../services/spell.service'

@Injectable({
  providedIn: "root"
})
export class CardsService {
  constructor(private cardFacade: CardsFacade, private spellService: SpellService) {}
}
