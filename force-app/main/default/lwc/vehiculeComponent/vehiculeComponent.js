import { LightningElement, track } from 'lwc';

export default class VehiculeComponent extends LightningElement {
    @track
    vehicule;

    get vehicule(){
        return this.vehicule;
    }

}