import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'dateMs' })
export class DatemsPipe implements PipeTransform {
    transform(value: Date) {
        let date = new Date(value);
        return date;
    }
}