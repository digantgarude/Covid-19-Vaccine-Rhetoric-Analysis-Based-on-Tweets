import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { SpinnerService } from './../../services/spinner.service';
@Component({
  selector: 'app-corpus-analytics',
  templateUrl: './corpus-analytics.component.html',
  styleUrls: ['./corpus-analytics.component.scss']
})
export class CorpusAnalyticsComponent implements OnInit {
  public selected_poi:string = "ArvindKejriwal";
  poi_names = ['ArvindKejriwal','BernieSanders','CDCgov','Claudiashein','EnriqueAlfaroR','GovRonDeSantis','GregAbbott_TX','HHS_ASH','HLGatell','JoeBiden','KamalaHarris','LindseyGrahamSC','MamataOfficial','MoHFW_INDIA','POTUS','PeteButtigieg','RahulGandhi','RandPaul','RicardoMonrealA','SSalud_mx','SecBecerra','SenSanders','VP','VicenteFoxQue','alfredodelmazo','alitomorenoc','amyklobuchar','fernandeznorona','lopezobrador_','m_ebrard','mansukhmandviya','marcorubio','mattgaetz','mtgreenee','narendramodi','sambitswaraj','tatclouthier','tedcruz']
  len_poi:any  = this.poi_names.length;

  public selected_country:string = "USA";
  countries = ["USA", "India", "Mexico"]
  public len_countries:any  = this.countries.length;


  constructor() { }

  selectedValue(event: MatSelectChange) {
    this.selected_poi = event.value;
    console.log(this.selected_poi);
  }

  selectedCountryValue(event: MatSelectChange) {
    this.selected_country = event.value;
    console.log(this.selected_country);
  }

  ngOnInit(): void {

  }

}
