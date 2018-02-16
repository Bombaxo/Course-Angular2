import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  value: string = "desconocido";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let parametros$: Observable<any> = this.activatedRoute.params;
    parametros$.subscribe(parametros => {
      this.value = parametros['value'] || 'anónimoss';
    });

    /*parametros$.subscribe(function ( parametros ){
      return this.value = parametros['value'] || 'anónimoss'; 
    });*/

  }

}
