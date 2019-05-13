/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import createClient from '@salesforce/apex/Lv_ClientCnt.createClient';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ClientNewComponent extends LightningElement {

    @track numero;
    @api prenom;
    @api nom;
    @api email;
    @api telephone;
    @api addresse;

    save(){
        this.numero = this.template.querySelector('.numero').value;
        this.prenom = this.template.querySelector('.prenom').value;
        this.nom = this.template.querySelector('.nom').value;
        this.email = this.template.querySelector('.email').value;
        this.telephone = this.template.querySelector('.telephone').value;
        this.addresse = this.template.querySelector('.addresse').value;        

        let client =  { 'sobjectType': 'Lv_Client__c', };
        client.Lv_Adresse__c = this.addresse;
        client.Name = this.nom;
        client.Lv_Email__c = this.email;
        client.Lv_Identification_Numero__c = this.numero;
        client.Lv_Prenom__c = this.prenom;
        client.Lv_Telephone__c = this.telephone;
        createClient({client: client}).then(result => {
            console.log('result ', JSON.stringify(result));
            if(result.error === false){
                const evt = new ShowToastEvent({
                    title: 'Info',
                    message: 'Client créé',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);

                const selectClientEvent = new CustomEvent('selectclientevent',{
                    detail: result.client.Id
                });
                this.dispatchEvent(selectClientEvent)
            } else {
                const evt = new ShowToastEvent({
                    title: 'Info',
                    message: result.trace + ' ' +result.message,
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            }            
        }).catch(error => {
            console.error('error '+error);
        })
    }
}