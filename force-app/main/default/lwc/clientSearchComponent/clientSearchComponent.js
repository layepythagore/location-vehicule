/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import searchClient from '@salesforce/apex/Lv_ClientCnt.searchClient';
export default class ClientSearchComponent extends LightningElement {

    @api numero;
    @api prenom;
    @api nom;

    handleNumero(event){
        event.preventDefault();
        this.numero = event.target.value;
    }
    handlePrenom(event){
        event.preventDefault();
        this.prenom = event.target.value;
    }
    handleNom(event){
        event.preventDefault();
        this.nom = event.target.value;
    }

    search(){
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