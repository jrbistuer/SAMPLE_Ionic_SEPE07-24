import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IVacanca } from 'src/app/model/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VacancesService } from 'src/app/services/vacances.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, CommonModule],
})
export class Tab1Page implements OnInit {
  
  nom: string = '';
  preu: string = '';
  pais: string = '';
  descripcio: string = '';

  vacances?: IVacanca[];
  vacancaForm!: FormGroup;

  constructor(private vacancesService: VacancesService) {}

  ngOnInit(): void {
    console.log('Hello World!');
    this.getVacances();
    this.createForm();
  }

  createForm() {
    this.vacancaForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      preu: new FormControl('', [Validators.required]),
      pais: new FormControl(''),
      descripcio: new FormControl('')
    });
  }

  saveVacanca() {
    if (this.vacancaForm.valid) {
      const v: IVacanca = {
        nom: this.vacancaForm.get('nom')!.value,
        preu: +this.vacancaForm.get('preu')!.value,
        pais:  this.vacancaForm.get('pais')!.value,
        descripcio: this.vacancaForm.get('descripcio')!.value,
        actiu: true
      }
      this.vacancesService.addVacanca(v);
      this.getVacances();
    } else {
      alert('formaulario inválido');
    }
  }

  getVacances() {
    this.vacancesService.getVacances().subscribe((vacances: IVacanca[]) => {
      this.vacances = vacances;
    });
  }

  editVacanca(id: string) {
    this.vacancesService.getVacancaById(id).subscribe((vacanca: IVacanca) => {
      console.log(vacanca);    
    });
  }

  removeVacanca(vacanca: IVacanca) {
  }

}
