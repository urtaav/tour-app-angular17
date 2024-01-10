import { Injectable } from '@angular/core';

@Injectable()
export class TourService {

    static init = () =>{
            console.log("init tour")
    }

    static destroy = () => {
        console.log("destroy tour")
    }
}   