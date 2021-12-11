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
  public selected_poi:string = "MoHFW_INDIA";
  public selected_sentiment:string = "POSITIVE";
  sentiments = ["POSITIVE", "NEGATIVE", "NEUTRAL", "MIXED"]
  public len_sentiments:any  = this.sentiments.length;
  poi_names = ['ArvindKejriwal','BernieSanders','CDCgov','Claudiashein','EnriqueAlfaroR','GovRonDeSantis','GregAbbott_TX','HHS_ASH','HLGatell','JoeBiden','KamalaHarris','LindseyGrahamSC','MamataOfficial','MoHFW_INDIA','POTUS','PeteButtigieg','RahulGandhi','RandPaul','RicardoMonrealA','SSalud_mx','SecBecerra','SenSanders','VP','VicenteFoxQue','alfredodelmazo','alitomorenoc','amyklobuchar','fernandeznorona','lopezobrador_','m_ebrard','mansukhmandviya','marcorubio','mattgaetz','mtgreenee','narendramodi','sambitswaraj','tatclouthier','tedcruz']
  public countryWisePOI:any = {"USA": ["CDCgov", "JoeBiden", "KamalaHarris", "LindseyGrahamSC", "BernieSanders", "tedcruz", "GovRonDeSantis", "GregAbbott_TX", "HHS_ASH", "marcorubio", "mattgaetz", "mtgreenee", "RandPaul", "SecBecerra", "SenSanders", "VP", "amyklobuchar"], "INDIA": ["ArvindKejriwal", "MamataOfficial", "MoHFW_INDIA", "RahulGandhi", "mansukhmandviya", "narendramodi", "sambitswaraj"], "MEXICO": ["RicardoMonrealA", "SSalud_mx", "VicenteFoxQue", "alfredodelmazo", "alitomorenoc", "fernandeznorona", "lopezobrador_", "m_ebrard", "tatclouthier", "Claudiashein", "EnriqueAlfaroR", "HLGatell"]};

  public UsaPOI:any = this.countryWisePOI['USA'];
  public IndiaPOI:any = this.countryWisePOI['INDIA'];
  public MexicoPOI:any = this.countryWisePOI['MEXICO'];

  public poi_country:any = {
    'CDCgov': 'USA',
    'ArvindKejriwal': 'INDIA',
    'BernieSanders': 'USA',
    'Claudiashein': 'MEXICO',
    'EnriqueAlfaroR': 'MEXICO',
    'GovRonDeSantis': 'USA',
    'GregAbbott_TX': 'USA',
    'HHS_ASH': 'USA',
    'HLGatell': 'MEXICO',
    'JoeBiden': 'USA',
    'KamalaHarris': 'USA',
    'LindseyGrahamSC': 'USA',
    'MamataOfficial': 'INDIA',
    'MoHFW_INDIA': 'INDIA',
    'POTUS': 'USA',
    'PeteButtigieg': 'USA',
    'RahulGandhi': 'INDIA',
    'RandPaul': 'USA',
    'RicardoMonrealA': 'MEXICO',
    'SSalud_mx': 'MEXICO',
    'SecBecerra': 'USA',
    'SenSanders': 'USA',
    'VP': 'USA',
    'VicenteFoxQue': 'MEXICO',
    'alfredodelmazo': 'MEXICO',
    'alitomorenoc': 'MEXICO',
    'amyklobuchar': 'USA',
    'fernandeznorona': 'MEXICO',
    'lopezobrador_': 'MEXICO',
    'm_ebrard': 'MEXICO',
    'mansukhmandviya': 'INDIA',
    'marcorubio': 'USA',
    'mattgaetz': 'USA',
    'mtgreenee': 'USA',
    'narendramodi': 'INDIA',
    'sambitswaraj': 'INDIA',
    'tatclouthier': 'MEXICO',
    'tedcruz': 'USA'
  }

  public selected_poi_country = this.poi_country[this.selected_poi];

  len_poi:any  = this.poi_names.length;

  public selected_country:string = "USA";
  public selected_country_misinfo:string = "USA";
  countries = ["USA", "India", "Mexico"]
  public len_countries:any  = this.countries.length;


  constructor() { }

  selectedValue(event: MatSelectChange) {
    this.selected_poi = event.value;
    this.selected_poi_country = this.poi_country[this.selected_poi];
    console.log(this.selected_poi);
  }

  selectedCountryValue(event: MatSelectChange) {
    this.selected_country = event.value;
    console.log(this.selected_country);
  }

  selectedSentimentValue(event: MatSelectChange) {
    this.selected_sentiment = event.value;
    console.log(this.selected_sentiment);
  }

  selectedCountryMisinfoValue(event: MatSelectChange) {
    this.selected_country_misinfo = event.value;
    console.log(this.selected_country_misinfo);
  }

  ngOnInit(): void {

  }

}
