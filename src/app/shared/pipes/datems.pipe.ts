import { Pipe, PipeTransform } from "@angular/core";
import {isNullOrUndefined} from 'util';

@Pipe({ name: 'dateMs' })
export class DatemsPipe implements PipeTransform {
    transform(value: any) {
        if(!isNullOrUndefined(value) && value !== ''){
            console.log(value);
            let date = new Date(value);
            return date;
        }
        return "";

    }
}