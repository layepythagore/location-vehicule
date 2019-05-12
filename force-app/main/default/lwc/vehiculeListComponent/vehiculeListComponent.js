import { LightningElement, track } from 'lwc';

export default class VehiculeListComponent extends LightningElement {
    @track
    vehicules;

    get vehicules(){
        return this.vehicules;
    }
}