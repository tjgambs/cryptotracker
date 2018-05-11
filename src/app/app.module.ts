import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { GraphComponent } from './graph/graph.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TickerComponent } from './ticker/ticker.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    GraphComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    TickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
