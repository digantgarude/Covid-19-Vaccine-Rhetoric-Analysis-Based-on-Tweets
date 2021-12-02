import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const BASE_URL_BACKEND = `http://localhost:8080/`

// var options = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
//   }),
//   observe: 'response'
// };

@Injectable({
  providedIn: 'root'
})
export class OffChainServiceService {


  constructor(private httpClient: HttpClient) { }

  public getCountryCasesAll(country:String){
    // console.debug("Country Selected : "+country);
    return this.httpClient.get(`${BASE_URL_BACKEND}/country?country=${country}`);
  }

}




