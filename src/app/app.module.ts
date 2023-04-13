import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
import { ImagenesService } from './services/imagenes.service';
import { ImagenesComponent } from './pages/imagenes/imagenes.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagenesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [
    ImagenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
