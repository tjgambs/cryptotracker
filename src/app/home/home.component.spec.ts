/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import {GraphComponent} from '../graph/graph.component';
import {TickerComponent} from '../ticker/ticker.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {CryptoQuote} from '../cryptoquote.service';
import {WebsocketService} from '../websocket.service';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeComponent, GraphComponent, TickerComponent ],
            providers: [CryptoQuote, HttpClient, HttpHandler, WebsocketService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
