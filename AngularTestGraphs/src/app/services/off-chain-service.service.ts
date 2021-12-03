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

  /**
   * 
   * @param country {"US", "India", "Mexico"}
   * @param from_date "YYYY-MM-DD"
   * @param till_date "YYYY-MM-DD" OR DEFAULT {from_date + 14 days}
   * @returns response
   */
  public getCountryCasesAll(country:String, from_date:String, till_date:String){
    // console.debug("Country Selected : "+country);
    return this.httpClient.get(`${BASE_URL_BACKEND}/country?country=${country}&from_date=${from_date}&till_date=${till_date}`);
  }

}




