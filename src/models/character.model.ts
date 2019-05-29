import { Gear } from './gear.model';
import { OnInit } from '@angular/core';

export class Character implements OnInit {
    ilvl: number;

    constructor(
        public id: number,
        public name: string,
        public server: string,
        public portraitLink: string,
        public gears: Gear[]
    ) { }

    ngOnInit() {
        // sort the gears

    }

    setIlvl(ilvl: number) {
        this.ilvl = ilvl;
    }

    getIlvl(): number {
        if (this.gears && this.gears.length > 0) {
            let sum = 0;
            for (const gear of this.gears) {
                sum += gear.ilvl;
            }
            this.setIlvl(Math.floor(sum / this.gears.length));
        } else {
            this.setIlvl(0);
        }
        return this.ilvl;
    }
}
