import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  readonly countriesUrl = 'http://localhost:8080/api/countries';
  readonly statesUrl = 'http://localhost:8080/api/states';
  readonly maxCreditYears = 10;

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {
    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let validMonths: number[] = [];
    // build an array for "Month" dropdown list
    // - start at current month and loop until 
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      validMonths.push(theMonth);
    }
    return of(validMonths);
  }

  getCreditCardYears(): Observable<number[]> {
    let avaiableYears: number[] = [];
    // build an array for "Year" downlist list
    // - start at current year and loop for next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + this.maxCreditYears;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      avaiableYears.push(theYear);
    }
    return of(avaiableYears);
  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}