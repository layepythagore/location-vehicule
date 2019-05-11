/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';

export default class ClientListComponent extends LightningElement {
    @track clients = [];
    
    @api
    get clients(){
        return this.clients;
    }

    handleSelectClient(event){
        const selectClientToReservationEvent = new CustomEvent('selectclienttoreservationevent',{
            detail: event.detail
        });
        this.dispatchEvent(selectClientToReservationEvent);
    }
}