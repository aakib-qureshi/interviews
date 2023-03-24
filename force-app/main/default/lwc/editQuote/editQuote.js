/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api,wire } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getquote from '@salesforce/apex/QuoteDto.getquote';
import update_quote from '@salesforce/apex/QuoteDto.upate_quoterecord';
export default class EditQuote extends LightningElement {
  @api recordId;
  startdate;
  enddate;


  @wire(getquote,{recordId:'$recordId',startdate:'$startdate',endDate:'$enddate'})
   wiredAccounts({ error, data }) {
      if (data) {
          this.startdate = data.Start_Date__c;
          this.enddate=data.EndDate__c;
      } else if (error) {
          console.log(error);
          this.error = error;
      }
  }




  handlechange(event){
   if(event.target.label=='Start Date'){
this.startdate=event.target.value;

   }else{

    this.enddate=event.target.value;

   }
   

  }



  handlesave(){
    update_quote({recordId:this.recordId,startdate:this.startdate,endDate:this.enddate}).then(result=>{

      const event = new ShowToastEvent({
        title: 'Success!',
        message: 'Record has been successfully upadte!',
        
    });
    this.dispatchEvent(event);
    
    })


  }


  renderedCallback() {}
}
