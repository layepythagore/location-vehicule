/**
 * ************************************************************
 *     * @Author abdoulaye.diop@/terangacloud.com
 *     * @date  11/05/2019
 *     * @description Wizard Controller for Lv_Vehicule component
 * ************************************************************
 **/
public with sharing class VehiculeCnt {

    /**
     * @Author abdoulaye.diop@terangacloud.com
     * @date  11/05/2019
     * @description method for getting all piclist values
     * @parm nameField
     **/
    @AuraEnabled(cacheable=true)
    public static List<String> getPickListValues(String nameField){

	    List <String> allModeles = new list <String> ();
        // Get the object type of the SObject.
        Schema.sObjectType objType = Lv_Vehicule__c.getSObjectType();
     
        // Describe the Plc_WarehouseProvince__c using its object type.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
     
        // Get a map of fields for the Plc_WarehouseProvince__c
        map <String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
     
        // Get the list of picklist values for this field.
        list <Schema.PicklistEntry> values =
        fieldMap.get(nameField).getDescribe().getPickListValues();
     
        // Add these values to the selectProvince list.
        for (Schema.PicklistEntry a: values) {
            allModeles.add(a.getValue());
        }
        system.debug('allModeles ---->' + allModeles);
        allModeles.sort();
        return allModeles;
	}
    
    /**
     * @Author AD
     * @date  11/05/2019
     * @description Method to search a vehicule
     * @param String modele,
     * @param String couleur
     **/
    @AuraEnabled
    public static Map<String, Object> searchVehicule(String modele, String couleur){
        Map<String, Object> response = new Map<String, Object>();
        if (String.isNotBlank(couleur)) {
            couleur = '%' + couleur + '%';
        }        

        try {
            List<Lv_Vehicule__c> vehicules = [SELECT Id, Lv_Couleur__c, Lv_Matricule__c, Lv_Modele__c FROM Lv_Vehicule__c
            WHERE Lv_Couleur__c LIKE :couleur OR Lv_Modele__c =:modele];

            response.put('vehicules', JSON.serialize(vehicules));
            response.put('error', false);
        } catch (Exception e) {
            response.put('error', true);
            response.put('message', e.getMessage());
            response.put('trace', e.getCause() + ' '+ e.getStackTraceString());
        }
        return response;
    }
}
