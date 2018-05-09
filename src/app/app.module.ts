import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { GraphComponent } from './graph/graph.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    ChartComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
