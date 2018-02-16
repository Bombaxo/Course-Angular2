/** 
 * declaración de tipos para ayuda al programador
 * los datos suelen ser intanciados en el servidor
 * en esos casos basta declararlos como interfaces
 * */

/* Data type for simple master data*/
export interface MasterModel {
    /* Identificator*/
    id   : number;
    /* Associate text */
    text : string;
}

/* Extended interface for categorize kind */
export interface MasterTypeModel extends MasterModel {
    /* Type to categorize master data*/
    type : number;
}

/* Interface fits Movement objects */
export interface MovementModel {

    _id?     : any;
    label    : string;
    date     : Date;
    amount   : number;
    kind     : number;
    category : number;
    paid     : number;
    topay    : number;
}

/* Class to create Movement type objects */
export class Movement implements MovementModel{
    
    _id?: any;
    
    constructor(
        public label    : string,
        public date     : Date,
        public amount   : number,
        public kind     : number,
        public category : number,
        public paid     : number,
        public topay    : number
    ){  }
}

