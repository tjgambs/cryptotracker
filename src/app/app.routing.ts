import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule    } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

const routes: Routes =[
    { path: 'dashboard', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule { }
