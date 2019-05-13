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

        console.log('fields ' +this.numero + ' ' + this.prenom + ' ' + this.nom);
        console.log('type numero '+ typeof this.numero);
        searchClient({numero: Number(this.numero), prenom: this.prenom,  nom: this.nom}).then(result => {
            if(result.error == false){
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