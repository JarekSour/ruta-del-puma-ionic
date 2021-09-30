import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(public http: HttpClient) { }

    post(uri, json) {
        return new Promise((resolve, reject) => {
            this.http.post(environment.url_base + uri, json)
                .pipe(
                    timeout(10000)
                )
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

}
