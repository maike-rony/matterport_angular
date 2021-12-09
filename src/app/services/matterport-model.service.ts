import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MatterportModelService {
    constructor() {}

    getViewUrl(): Observable<string> {
        const modelSid = 'JGPnGQ6hosj';
        const url = `https://my.matterport.com/show?m=iqGN3BwcFPc&play=1&brand=0&ts=-1&dh=1&lang=pt&ss=138&nt=0&qs=1&cloudEdit=1&sr=-.74,1.31&ss=938`;
        return of(url);
    }
}
