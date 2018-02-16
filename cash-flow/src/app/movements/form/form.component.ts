import { MasterModel, MasterTypeModel, MovementModel, Movement } from './../data.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdSliderModule } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Component receives simple data and emit events
 * Doesnt use services
 **/
@Component({
  selector: 'mov-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private disabled   = false;
  private vertical   = false;
  private invert     = false;
  private thumbLabel = true;
  private autoTicks  = false;
  private showTicks  = true;
  private min        = 0;
  private max        = 90;
  private step       = 15;
  private value      = 0;

  /** Receives data via properties**/

  // Input property for movement types
  @Input() kinds      : MasterModel[] = [];

  // Input property for movement categories
  @Input() categories : MasterTypeModel[] = [];

  // Input property for a movement   
  @Input() movement   : Movement;

  /** Emits changing events and saving**/
  // Output property to emit the saving event from current movement
  @Output() userSave        : EventEmitter<Movement> = new EventEmitter<Movement>();
  @Output() clearFormValues : EventEmitter<Movement> = new EventEmitter<Movement>();

  // Output property to emit the changing event from current movement
  @Output() userChangeKind  : EventEmitter<number> = new EventEmitter<number>();


  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.movement = this.moveForm.value;
  }

  active = true;
  moveForm: FormGroup;
  constructor( private fb: FormBuilder ) { }

  ngOnInit() { 
    this.buildForm();
  } 

  buildForm(): void {
    this.moveForm = this.fb.group({
      'label': [this.movement.label, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24)
        ]
      ],
      'date'     : [this.movement.amount],
      'amount'   : [this.movement.amount, [Validators.required]],
      'kind'     : [this.movement.kind],
      'category' : [this.movement.category],
      'paid'     : [this.movement.paid],
      'topay'    : [this.movement.topay],
      //'power':    [this.movement.power, Validators.required]
    });

    this.moveForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    if (!this.moveForm) { return; }
    const form = this.moveForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'label'    : '',
    'date'     : '',
    'amount'   : '',
    'kind'     : '',
    'category' : '',
    'paid'     : '',
    'topay'    : ''
  };

  validationMessages = {
    'label': {
      'required':      'Label is required.',
      'minlength':     'Label must be at least 4 characters long.',
      'maxlength':     'Label cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'date': {
      'required':      'Date is required.'
    },
    'amount': {
      'required':      'Amount is required.'
    },
    'kind': {
      'required':      'Type is required.'
    },
    'category': {
      'required':      'Category is required.'
    },
    'paid': {},
    'topay': {}
  };

  // Change radio button kind changes category list
  userChangeTypeOption() {
    this.userChangeKind.emit(this.movement.kind);
  }
  
  // Click saves movements
  UserSaveMovement() {
    this.userSave.emit(this.movement);
  }

  // Click resets the form values
  clearForm() {
    this.clearFormValues.emit();
  }

  // Event paid toggle changes slider to pay
  toggleSliderInput(): void {
    if( this.disabled == false){
      this.disabled       = true;
      this.movement.topay = 0;
    }else
      this.disabled = false;
  }  

}