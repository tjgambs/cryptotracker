import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { WebsocketService } from '../websocket.service';
import { CryptoQuote, Quote } from '../cryptoquote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ WebsocketService, CryptoQuote ]
})

export class HomeComponent implements OnInit {
  
    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];

    public quotes: { [key: string]: Quote; } = {};
    public objectKeys = Object.keys;

  constructor(private cryptoQuote: CryptoQuote) {
        cryptoQuote.quotes.subscribe(quote => {
            if (quote.exchange) {
                const key = quote.exchange.name + quote.symbol;
                this.quotes[key] = quote;
            }
        });
    }

  ngOnInit() {
      this.hoursChartType = ChartType.Line;
      this.hoursChartData = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'GDAX', imageClass: 'fa fa-circle text-info' },
        { title: 'Bitfinex', imageClass: 'fa fa-circle text-danger' },
        { title: 'Binance', imageClass: 'fa fa-circle text-warning' }
      ];
    }
}
