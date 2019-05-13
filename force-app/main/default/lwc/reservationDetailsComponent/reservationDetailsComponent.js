import { LightningElement, api, track } from 'lwc';

export default class ReservationDetailsComponent extends LightningElement {
    @track reservation;

    @api
    get reservation(){
        return this.reservation;
    }
}