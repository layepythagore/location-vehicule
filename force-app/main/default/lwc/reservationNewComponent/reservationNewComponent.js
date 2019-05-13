/* eslint-disable @lwc/lwc/valid-api */
/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import RESERVATION_OBJECT from '@salesforce/schema/Lv_Reservation__c';
import DATE_RESERVATION from '@salesforce/schema/Lv_Reservation__c.Date_Reservation__c';
import DATE_EFFECTIVE from '@salesforce/schema/Lv_Reservation__c.Date_Effective__c';
import MISSIONS from '@salesforce/schema/Lv_Reservation__c.Missions__c';
import NOMBRE_JOUR from '@salesforce/schema/Lv_Reservation__c.Nombre_Jour__c';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ReservationNewComponent extends LightningElement {
    
    @track
    client;
    @track
    vehicule;
    reservationObject = RESERVATION_OBJECT;
    myFields = [DATE_EFFECTIVE, DATE_RESERVATION, NOMBRE_JOUR, MISSIONS];

    @api
    get client(){
        return this.client;
    }
    @api
    get vehicule(){
        return this.vehicule;
    }    

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.Client__c = this.client;
        fields.Vehicule__c = this.vehicule;
        this.template.querySelector('lightning-record-form').submit(fields);
    }
    handleReservationCreated(event){
        const evt = new ShowToastEvent({
            title: 'Info',
            message: 'Réservation Créée',
            variant: 'success',
            mode: 'dismissable'
        }); 
        this.dispatchEvent(evt);

        console.log('event: ', JSON.stringify(event));

        const reservationCreated = new CustomEvent('reservationcreated', {
            detail: event.detail.id
        });
        this.dispatchEvent(reservationCreated);        
    }
    handleError(event){
        console.log('error: ', JSON.stringify(event));
    }
}