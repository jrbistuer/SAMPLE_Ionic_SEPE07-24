import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonText, IonInput, IonTextarea } from '@ionic/angular/standalone';
import { IVacanca } from 'src/app/model/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VacancesService } from 'src/app/services/vacances.service';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { addIcons } from 'ionicons';
import { closeCircle, exitOutline, personCircle } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonInput, IonText, IonLabel, IonItem, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, CommonModule],
})
export class Tab1Page implements OnInit {
  
  nom: string = '';
  preu: string = '';
  pais: string = '';
  descripcio: string = '';

  vacances?: IVacanca[];
  vacancaForm!: FormGroup;

  constructor(private vacancesService: VacancesService,
    private auth: Auth,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({
      exitOutline
    });
  }

  ngOnInit(): void {
    console.log('Hello World!');
    this.getVacances();
    this.createForm();
    console.log('user', this.auth.currentUser);
  }

  createForm() {
    console.log('Creating form');
    this.vacancaForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      preu: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
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
        actiu: true,
        user: this.auth.currentUser?.uid
      }
      this.vacancesService.addVacanca(v);
      this.vacancaForm.reset();
      this.getVacances();
    } else {
      this.vacancaForm.markAllAsTouched();
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
    this.vacancesService.removeVacanca(vacanca);
  }

  closeSession() {
    this.authService.logout();
  }

}
