import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseMessage} from "../model/response-message";


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly hostname: string = window.location.hostname;
  private readonly port: string = window.location.port;
  private readonly protocol: string = window.location.protocol;
  private readonly url: string = '';

  constructor(private http: HttpClient) {
    if (this.hostname === '127.0.0.1' || this.hostname === 'localhost') {
      this.url = this.protocol + '//' + this.hostname + ':8080';
    } else if (this.port == '80' || this.port == '443') {
      this.url = this.protocol + '//' + this.hostname;
    } else {
      this.url = this.protocol + '//' + this.hostname + ':' + this.port;
    }
  }

  /**
   *
   * @param entity
   * @returns Observable<ResponseMessage>
   * Author: Kaddour Alnaasan
   */
  public getAll(entity: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(
      `https://pms.alnaasan.de/api/v1/web/${entity}`
    );
  }

  /**
   *
   * @param entity
   * @param id
   * @returns Observable<ResponseMessage>
   * @Author: Kaddour Alnaasan
   */
  public getById(entity: string, id: number): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(
      `https://pms.alnaasan.de/api/v1/web/${entity}/${id}`
    );
  }

  /**
   *
   * @param entity
   * @param obj
   * @returns Observable<ResponseMessage>
   * @author: Kaddour Alnaasan
   */
  public create(entity: string, obj: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `https://pms.alnaasan.de/api/v1/web/${entity}`,
      obj
    );
  }

  /**
   *
   * @param entity
   * @param id
   * @param obj
   * @returns Observable<ResponseMessage>
   * @author: Kaddour Alnaasan
   */
  public update(
    entity: string,
    id: number,
    obj: any
  ): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `https://pms.alnaasan.de/api/v1/web/${entity}/${id}`,
      obj
    );
  }

  /**
   *
   * @param entity
   * @param id
   * @returns Observable<ResponseMessage>
   * @author: Kaddour Alnaasan
   */
  public delete(entity: string, id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `https://pms.alnaasan.de/api/v1/web/${entity}/${id}`
    );
  }

  /**
   *
   * @param entity
   * @param id
   * @param subEntity
   * @author kaddour Alnaasan
   */
  public getSubList(
    entity: string,
    id: number,
    subEntity: string
  ): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(
      `https://pms.alnaasan.de/api/v1/web/${entity}/${id}/${subEntity}`
    );
  }

  public customRequest(uri: string, data: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.url}${uri}`, data);
  }
}
