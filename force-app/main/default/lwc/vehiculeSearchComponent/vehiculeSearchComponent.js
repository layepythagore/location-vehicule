/* eslint-disable @lwc/lwc/no-document-query */
/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';
import getPickListValues from '@salesforce/apex/VehiculeCnt.getPickListValues';
import searchVehicule from '@salesforce/apex/VehiculeCnt.searchVehicule';

export default class VehiculeSearchComponent extends LightningElement {
    
    @track
    allModeles;
    @track
    modeles;
    @api
    couleur;
    @api
    modele;
    @api
    errorMessage;

    connectedCallback(){
        getPickListValues({'nameField': 'Lv_Modele__c'}).then(result => {
            this.allModeles = result;
            console.log('this.allModeles', this.allModeles);
        }).catch(error => {
            console.log('error', error);
        })
    }
    search(){
        this.modele = this.template.querySelector('select').value;
        this.couleur = this.template.querySelector('.couleur').value;
        console.log('this.couleur', this.couleur);
        console.log('this.modele', this.modele);
        searchVehicule({'modele': this.modele, 'couleur': this.couleur}).then(result => {
            if(result.error === false){
                console.log('vehicules', JSON.parse(result.vehicules));
                const vehiculeListEvent = new CustomEvent('vehiculelistevt', {
                    detail: JSON.parse(result.vehicules)
                });
                this.dispatchEvent(vehiculeListEvent);
            } else {
                this.errorMessage = result.trace;
                console.log('this.errorMessage', this.errorMessage);
            }                
        }).catch(error => {
            console.log('error', error);
        })
    }    
}