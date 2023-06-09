import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Building} from "../model/building";


@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private readonly hostname: string = window.location.hostname;
    private readonly port: string = window.location.port;
    private readonly protocol: string = window.location.protocol;
    private url: string = '';

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
     * @returns Observable<any[]>
     * Author: Kaddour Alnaasan
     */
    public getAll(entity: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/api/v1/web/${entity}/s`);
    }

    /**
     *
     * @param entity
     * @param id
     * @returns Observable<any>
     * @Author: Kaddour Alnaasan
     */
    public getById(entity: string, id: number): Observable<any> {
        return this.http.get<any>(`${this.url}/api/v1/web/${entity}/s/${id}`);
    }

    /**
     *
     * @param entity
     * @param obj
     * @returns Observable<any>
     * @author: Kaddour Alnaasan
     */
    public create(entity: string, obj: any): Observable<any> {
        return this.http.post<any>(`${this.url}/api/v1/web/${entity}/s`, obj);
    }

    /**
     *
     * @param entity
     * @param id
     * @param obj
     * @returns Observable<any>
     * @author: Kaddour Alnaasan
     */
    public update(entity: string, id: number, obj: any): Observable<any> {
        return this.http.put<any>(`${this.url}/api/v1/web/${entity}/s/${id}`, obj);
    }

    /**
     *
     * @param entity
     * @param id
     * @returns Observable<any>
     * @author: Kaddour Alnaasan
     */
    public delete(entity: string, id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/api/v1/web/${entity}/s/${id}`);
    }

}
