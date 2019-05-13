/* eslint-disable no-console */
import { LightningElement } from 'lwc';
import VEHICULE_OBJECT from '@salesforce/schema/Lv_Vehicule__c';
import MODELE_FIELD from '@salesforce/schema/Lv_Vehicule__c.Lv_Modele__c';
import COULEUR_FIELD from '@salesforce/schema/Lv_Vehicule__c.Lv_Couleur__c';
import MATRICULE_FIELD from '@salesforce/schema/Lv_Vehicule__c.Lv_Matricule__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class VehiculeNewComponent extends LightningElement {
    
    vehiculeObject = VEHICULE_OBJECT;
    myFields = [MODELE_FIELD, COULEUR_FIELD, MATRICULE_FIELD];

    handleVehiculeCreated(event){
        console.log('event vehicule created ', JSON.stringify(event));
        const evt = new ShowToastEvent({
            title: 'Info',
            message: 'Véhicule créé',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
        const selectVehiculeEvt = new CustomEvent('selectvehiculeevt', {
            detail: event.detail.id
        });
        this.dispatchEvent(selectVehiculeEvt);        
    }
}
