import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QrSearchApiService {
  base_start: string =
    'https://prod-90.eastus.logic.azure.com/workflows/4c6dc9d4ee2c49339bf53d28232f524c/triggers/When_a_HTTP_request_is_received/paths/invoke/qr/';

  base_end: string =
    '?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=PvnfVwpeDA27F7482jtGoLhr6lKs9ENl1R6ZD6w89og';
  constructor(private http: HttpClient) {}

  validQr(qr) {
    const url: string = `${this.base_start}${qr}${this.base_end}`;

    this.http.get(url).subscribe((res) => {
      console.log("RESPUESTA DEL ENDPOINT",res);
    });
  }
}
