/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import searchClient from '@salesforce/apex/Lv_ClientCnt.searchClient';
export default class ClientSearchComponent extends LightningElement {

    @api numero; 
    @api prenom;
    @api nom;

    search(){
        this.numero = this.template.querySelector('.numero').value;
        this.prenom = this.template.querySelector('.prenom').value;
        this.nom = this.template.querySelector('.nom').value;
        console.log(this.numero + ' ' + this.prenom + ' ' + this.nom);
        searchClient({numero: this.numero, prenom: this.prenom,  nom: this.nom}).then(result => {
            if(result.error == false){
                let clients = JSON.parse(result.clients);
                if(clients.length == 1){
                    const selectClientToReservationEvent = new CustomEvent('selectclienttoreservationevent',{
                        detail: clients[0].Id
                    });
                    this.dispatchEvent(selectClientToReservationEvent);
                }
                const clientListEvent = new CustomEvent('clientlistevent', {
                    detail: JSON.parse(result.clients)
                });
                this.dispatchEvent(clientListEvent);                
            }
        }).catch(error => {
            console.error('error', error);
        })
    }
}