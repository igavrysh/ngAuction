import { Component, OnInit, ChangeDetectionStrategy, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'nga-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {
  @Output() serach = new EventEmitter();
  readonly matched = new ShowOnFormInvalidStateMatcher();
  readonly searchForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}


export class ShowOnFormInvalidStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null) : boolean {
    return !!((control && control.invalid) || (form && form.hasError('minLessThanMax')));
  }
}