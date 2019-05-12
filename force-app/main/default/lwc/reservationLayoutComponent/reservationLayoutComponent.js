/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';	
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ReservationLayoutComponent extends LightningElement {
    @track clients;
    @track IdSelectedClient;
    @track vehicules;
    @track IdSelectedVehicules;

    handleListClient(event){
        this.clients = event.detail;
    }
    handleSelectClient(event){
        this.IdSelectedClient = event.detail;
        console.log('IdSelectedClient', this.IdSelectedClient);
    }
    handleSelectVehicule(event){
        let vehicules = event.detail;
        console.log('vehicules ', JSON.parse(vehicules));
        if(vehicules.length === 1){
            this.IdSelectedVehicules = vehicules[0].Id;
            const evt = new ShowToastEvent({
                title: 'Info',
                message: 'Une voiture trouvée et associée à la réservation',
                variant: 'info',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
        this.vehicules =vehicules;
    }
}