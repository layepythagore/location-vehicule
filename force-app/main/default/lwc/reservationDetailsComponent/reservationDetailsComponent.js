import { LightningElement, api, track } from 'lwc';

export default class ReservationDetailsComponent extends LightningElement {
    @track reservation;
    @track client;
    @track vehicule;

    @api
    get reservation(){
        return this.reservation;
    }

    @api
    get client(){
        return this.client;
    }

    @api
    get vehicule(){
        return this.vehicule;
    }
}