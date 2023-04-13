import { Injectable } from '@angular/core';
import {AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private firestore:AngularFirestore) { }
  //Metodo para crear un nuevo documento
  crearImagen(data:{descripcion:string,url:string}){
    return this.firestore.collection('imagenes').add(data);
  }

  //Metodo para obtner todos las imagenes
  getImagenes(){
    return this.firestore.collection('imagenes').snapshotChanges();
  }

  getImagen(documentId:string){
    return this.firestore.collection('imagenes').doc(documentId).snapshotChanges();
  }

  //Metodo para actualizar una imagen
  updateImagen(documentId:string,data:any){
    return this.firestore.collection('imagenes').doc(documentId).set(data);
  }

  //Metodo para eliminar una imagen
  deleteImagen(documentId:string){
    return this.firestore.collection('imagenes').doc(documentId).delete();
  }
}
