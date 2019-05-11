/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import createClient from '@salesforce/apex/Lv_ClientCnt.createClient';
export default class ClientNewComponent extends LightningElement {

    @track numero;
    @api prenom;
    @api nom;
    @api email;
    @api telephone;
    @api addresse;

    handleChangePrenom(event){
        event.preventDefault();
        this.prenom = event.target.value;
    }
    handleChangeNom(event){
        event.preventDefault();
        this.nom = event.target.value;
    }
    handleChangeNumero(event){
        event.preventDefault();
        this.numero = event.target.value;
    }
    handleChangeEmail(event){
        event.preventDefault();
        this.email = event.target.value;
    }
    handleChangeTelephone(event){
        event.preventDefault();
        this.telephone = event.target.value;
    }
    handleChangeAddresse(event){
        event.preventDefault();
        this.addresse = event.target.value;
    }

    save(){
        let client =  { 'sobjectType': 'Lv_Client__c', };
        console.log('Lv_Identification_Numero__c', this.numero);
        client.Lv_Adresse__c = this.addresse;
        client.Name = this.nom;
        client.Lv_Email__c = this.email;
        client.Lv_Identification_Numero__c = this.numero;
        client.Lv_Prenom__c = this.prenom;
        client.Lv_Telephone__c = this.telephone;
        createClient({client: client}).then(result => {
            console.log('result ', JSON.stringify(result));
            const selectClientToReservationEvent = new CustomEvent('selectclienttoreservationevent',{
                detail: result.client.Id
            });
            this.dispatchEvent(selectClientToReservationEvent);
        }).catch(error => {
            console.error('error '+error);
        })
    }
}