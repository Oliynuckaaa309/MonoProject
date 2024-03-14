import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"mono-project-35634","appId":"1:659458521370:web:a10cb20691a88f05d614a3","storageBucket":"mono-project-35634.appspot.com","apiKey":"AIzaSyAVZfSWn0cCI6E4gOck4aTY365leenEglQ","authDomain":"mono-project-35634.firebaseapp.com","messagingSenderId":"659458521370"}))), importProvidersFrom(provideStorage(() => getStorage()), provideFirestore (()=>getFirestore()), provideAuth (()=>getAuth())), 
  provideHttpClient(withFetch()), provideAnimationsAsync()]
};
