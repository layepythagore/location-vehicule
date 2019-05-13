/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';	
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ReservationLayoutComponent extends LightningElement {
    @track clients;
    @track IdSelectedClient = null;
    @track vehicules;
    @track IdSelectedVehicule = null;
    @track IdReservation;

    handleListClient(event){
        this.clients = event.detail;
        console.log('this.clients length', this.clients.length);
        if(this.clients.length === 1){
            this.IdSelectedClient = this.clients[0].Id;
            console.log('IdSelectedClient', this.IdSelectedClient);
            const evt = new ShowToastEvent({
                title: 'Info',
                message: 'client associé à la réservation',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        } else if(this.clients.length === 0){
            const evt = new ShowToastEvent({
                title: 'Pas de clients trouvés',
                message: 'Vous pouvez créé un nouveau client qui sera directement associé à la réservation',
                variant: 'warning',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
    }
    handleSelectClient(event){
        this.IdSelectedClient = event.detail;
        console.log('IdSelectedClient', this.IdSelectedClient);
        const evt = new ShowToastEvent({
            title: 'Info',
            message: 'client associé à la réservation',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    handleSelectVehicule(event){
        let vehicules = event.detail;
        //console.log('vehicules ', JSON.parse(vehicules));
        if(vehicules.length === 1){
            this.IdSelectedVehicule = vehicules[0].Id;
            const evt = new ShowToastEvent({
                title: 'Info',
                message: 'Une voiture trouvée et associée à la réservation',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        } else if(vehicules.length === 0){
            const evt = new ShowToastEvent({
                title: 'Pas de véhicules trouvés',
                message: 'Vous pouvez créé un nouveau véhicule qui sera directement associé à la réservation',
                variant: 'info',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
        this.vehicules = vehicules;
    }
    selectVehicule(event){
        this.IdSelectedVehicule = event.detail;
        const evt = new ShowToastEvent({
            title: 'Info',
            message: 'Véhicule associé à la réservation',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    isSubmittable(){
        if(this.IdSelectedClient != null && this.IdSelectedVehicule != null){
            return true;
        }
        return false;
    }
    handleShowResevation(event){
        this.IdReservation = event.detail;
        console.log('#### IdReservation', this.IdReservation);
    }
}