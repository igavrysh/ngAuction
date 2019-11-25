import { 
  Component, 
  OnInit, 
  ChangeDetectionStrategy, 
  Output,
  EventEmitter
} from '@angular/core';
import { 
  FormGroup, 
  FormControl, 
  FormGroupDirective, 
  FormBuilder, 
  Validators, 
  ValidationErrors
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'nga-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {
  @Output() search = new EventEmitter();
  readonly matcher = new ShowOnFormInvalidStateMatcher();
  readonly searchForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.searchForm = fb.group(
      {
        title: [Validators.minLength(2)],
        minPrice: [Validators.min(0)],
        maxPrice: [Validators.min(0), Validators.max(10000)]
      },
      {
        validator: [
          minLessThanMaxValidator
        ]
      }
    );
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.search.emit();
      this.router.navigate(
        ['/search-results'], 
        {
          queryParams: withoutEmptyValues(this.searchForm.value)
        }
      );
    }
  }

  ngOnInit() {
  }
}

export class ShowOnFormInvalidStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null) : boolean {
    return !!((control && control.invalid) || (form && form.hasError('minLessThanMax')));
  }
}

function withoutEmptyValues(object: any): any {
  return Object.keys(object).reduce((queryParams: any, key) => {
    if (object[key]) {
      queryParams[key] = object[key];
    }
    return queryParams;
  }, {});
}

function minLessThanMaxValidator(group: FormGroup): ValidationErrors | null {
  const minPrice = group.controls['minPrice'].value;
  const maxPrice = group.controls['maxPrice'].value;

  if (minPrice && maxPrice) {
    return minPrice <= maxPrice ? null : { minLessThanMax: true };
  } else {
    return null;
  }
}