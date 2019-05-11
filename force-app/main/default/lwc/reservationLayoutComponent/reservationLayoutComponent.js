/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';

export default class ReservationLayoutComponent extends LightningElement {
    @track clients;
    @track IdSelectedClient;

    handleListClient(event){
        this.clients = event.detail;
    }
    handleSelectClient(event){
        this.IdSelectedClient = event.detail;
        console.log('IdSelectedClient', this.IdSelectedClient);
    }
}