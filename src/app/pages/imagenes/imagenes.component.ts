import { Component, OnInit } from '@angular/core';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {

  constructor(private imagenesService:ImagenesService){
    this.imgForm.setValue({
      id: '', descripcion:'',url:''
    });
  }

  //Propiedades
  public imagenes = [] as any;
  public documentId = '';
  public currentStatus = 1;

  public imgForm = new FormGroup({
    descripcion: new FormControl('',Validators.required),
    url : new FormControl('',Validators.required),
    id:new FormControl('')
  })
  
  ngOnInit(): void {
    this.imagenesService.getImagenes().subscribe((imgSnapshot)=>{
      this.imagenes=[];
      imgSnapshot.forEach((imgData:any) => {
        this.imagenes.push({
          data:imgData.payload.doc.data(),
          id: imgData.payload.doc.id,
        });
        
      });
    })
  }

  //Metodo para agregar uan imagen nueva o una inexistente
  public saveImagen(form:any,documentId = this.documentId){
    if(this.currentStatus == 1){
      let data = {
        descripcion: form.descripcion,
        url: form.url
      };
      this.imagenesService.crearImagen(data).then(()=>{
        this.imgForm.setValue({
          descripcion:'',url:'',id:''
        });
      },(error)=>{
        console.log(error);
      });
    }else{
      let data={
        descripcion:form.descripcion,
        url:form.url
      };
      this.imagenesService.updateImagen(documentId,data).then(()=>{
        this.currentStatus =1;
        this.imgForm.setValue({
          descripcion:'',url:'',id:''
        });
      },(error)=>{
        console.log(error);
      })
    }

  }

  //Metodo para que al darle clic al boton editar, se envien los datos al form
  public editarImagen(documentId:string){
    let subscribe = this.imagenesService.getImagen(documentId)
    .subscribe((img:any)=>{
      this.currentStatus = 2;
      this.documentId = documentId;
      this.imgForm.setValue({
        id: documentId,
        descripcion: img.payload.data()['descripcion'],
        url: img.payload.data()['url']
      });
      subscribe.unsubscribe;
    });
  }

  //Metodo para el boton eliminar
  public deleteImagen(documentId:string){
    this.imagenesService.deleteImagen(documentId).then(()=>{
      console.log('Documento eliminado')
    },(error)=>{
      console.log(error);
    })
  }
}
