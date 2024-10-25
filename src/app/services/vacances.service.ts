import { Injectable } from '@angular/core';
import { IVacanca } from '../model/interfaces';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacancesService {

  constructor(private firestore: Firestore) { }

  addVacanca(vacanca: IVacanca) {
    const vacancesRef = collection(this.firestore, 'vacances');
    return addDoc(vacancesRef, vacanca);
  }

  getVacancaById(id: string): Observable<IVacanca> {
    const vacancaDocRef = doc(this.firestore, `vacances/${id}`);
    return docData(vacancaDocRef, { idField: 'id' }) as Observable<IVacanca>;
  }

  getVacances(): Observable<IVacanca[]> {
    const vacancesRef = collection(this.firestore, 'vacances');
    return collectionData(vacancesRef, { idField: 'id'}) as Observable<IVacanca[]>;
  }

  removeVacanca(vacanca: IVacanca) {
    const vacancaDocRef = doc(this.firestore, `vacances/${vacanca.id}`);
    return deleteDoc(vacancaDocRef);
  }

  updateVacanca(vacanca: IVacanca) {
    const vacancaDocRef = doc(this.firestore, `vacances/${vacanca.id}`);
    return updateDoc(vacancaDocRef, { ...vacanca });
  }

}
