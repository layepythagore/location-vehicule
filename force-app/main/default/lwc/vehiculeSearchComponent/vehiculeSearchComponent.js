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
    handleModele(){
        var select = document.getElementById('modele');
        this.modele = select.options[select.selectedIndex].value;
        console.log('this.modele', this.modele);
    }
    handleCouleur(event){
        this.couleur = event.target.value;
        console.log('this.couleur', this.couleur);
    }
    search(){
        searchVehicule({'modele': this.modele, 'couleur': this.couleur}).then(result => {
            if(result.error === false){
                const vehiculeListEvent = new CustomEvent('vehiculelistevent', {
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