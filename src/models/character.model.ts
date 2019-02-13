import { Gear } from './gear.model';

export class Character {
    constructor(
        public id: number,
        public name: string,
        public server: string,
        public gears: Gear[]
    ) { }
}