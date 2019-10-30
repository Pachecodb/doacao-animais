import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { EspecieListComponent } from './especie-list/especie-list.component';
import { EspecieCreateComponent } from './especie-create/especie-create.component';
import { EspecieService } from './especie/especie.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SelectExampleComponent } from './select-example/select-example.component';
import { AnimalCreateComponent } from './animal-create/animal-create.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { JwtInterceptor } from './auth/jwt.interceptor';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'especie-list', component: EspecieListComponent },
	{ path: 'especie-create', component: EspecieCreateComponent },
	{ path: 'especie-create/:id', component: EspecieCreateComponent },
    { path: 'select-example', component: SelectExampleComponent },
    { path: 'animal-list', component: AnimalListComponent },
	{ path: 'animal-create', component: AnimalCreateComponent },
	{ path: 'animal-create/:id', component: AnimalCreateComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ErrorComponent,
        EspecieListComponent,
        EspecieCreateComponent,
        SelectExampleComponent,
        AnimalCreateComponent,
        AnimalListComponent,
    ],
    // (*1)
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxCurrencyModule
    ],
    entryComponents: [ErrorComponent],
    providers: [EspecieService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor , multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule { }
