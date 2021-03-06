/* eslint-disable no-console */
import { LightningElement } from 'lwc';
import VEHICULE_OBJECT from '@salesforce/schema/Lv_Vehicule__c';
import MODELE_FIELD from '@salesforce/schema/Lv_Vehicule__c.Lv_Modele__c';
import COULEUR_FIELD from '@salesforce/schema/Lv_Vehicule__c.Lv_Couleur__c';
import MATRICULE_FIELD from '@salesforce/schema/Lv_Vehicule__c.Lv_Matricule__c';

export default class VehiculeNewComponent extends LightningElement {
    
    vehiculeObject = VEHICULE_OBJECT;
    myFields = [MODELE_FIELD, COULEUR_FIELD, MATRICULE_FIELD];

    handleVehiculeCreated(event){
        console.log('event vehicule created ', JSON.stringify(event));
        /*let vehicule ={
            'Lv_Modele__c': 
        };

        event.detail.fields;
        event.detail.id;*/
    }
}