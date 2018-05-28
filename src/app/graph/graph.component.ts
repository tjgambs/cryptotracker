import {Component, Input, OnInit, OnChanges, SimpleChanges, 
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import * as Chartist from 'chartist';
import * as moment from 'moment';


export interface BarResponse {
  requestSymbol: string;
  vendorSymbol: string;
  bars: BarInnerResponse;
}

export interface BarInnerResponse {
  interval: number;
  symbol: string;
  bars: [Bar];
}

export interface Bar {
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}


@Component({
    selector: 'graph',
    templateUrl: './graph.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./graph.component.css'],
})

export class GraphComponent implements OnInit {

    public lastUpdated: string = '';
    private series: any[] = [[],[],[],[],[]];
    private seriesVisible: boolean[] = [true, true, true, true, true, true];
    private status: number = 0;
    public legendItems: string[] = ['GDAX', 'Bitfinex', 'Binance','Bitstamp', 'Gemini', 'Poloniex'];
    private chart: Chartist.Line;

    @Input()
    private selectedCurrency: string;

    constructor(private cdRef:ChangeDetectorRef, private http:HttpClient) {
    }

    ngOnChanges(changes: SimpleChanges) {
        /* Whenever the user selects a new currency, this function is ran. */
        this.updateAllCryptos();
    }

    public ngOnInit(): void {
        /* Initialize the Chartist line chart for time sereis data. */
        this.chart = new Chartist.Line('.ct-chart', {
            series: this.series
        }, {
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 0
            }),
            showPoint: false,
            axisX: {
                type: Chartist.FixedScaleAxis,
                divisor: 10,
                labelInterpolationFnc: function(value) {
                    return moment(value).format('h:mm a');
                }
            }
        });
        this.updateAllCryptos();
        let t = this;
        setInterval(function() {
            /* Update the chart once every minute. */
            t.updateAllCryptos();
        }, 1000 * 60);
    }

    private toggle(name, index) {
        /* Executed when the user chooses to either turn on or turn off
         one of the currencies. */
        if (this.seriesVisible[index] == false) {
            this.addCrypto(this.selectedCurrency, name, index, false);
        } else {
            this.series[index] = {name: name, data: []};
            this.chart.update({
                series: this.series
            });
        }
        this.seriesVisible[index] = !this.seriesVisible[index];
    }

    private hideItem(item) {
        this.toggle(item, this.legendItems.indexOf(item));
    }

    public updateAllCryptos() {
        this.status = 0;
        this.addCrypto(this.selectedCurrency, 'gdax', 0, true);
        this.addCrypto(this.selectedCurrency, 'bitfinex', 1, true);
        this.addCrypto(this.selectedCurrency, 'binance', 2, true);
        this.addCrypto(this.selectedCurrency, 'bitstamp', 3, true);
        // Gemini doesn't support ltcusd currency, hence the condition.
        if (this.selectedCurrency != 'LTCUSD') {
            this.addCrypto(this.selectedCurrency, 'gemini', 4, true);
        } else {
            this.series[4] = {name: 'gemini', data: []};
        }
        this.addCrypto(this.selectedCurrency, 'poloniex', 5, true);
        this.lastUpdated = moment().format('h:mm:ss a');
        this.cdRef.detectChanges();
    }

    private addCrypto(currency, exchange, index, flag) {
        let t = this;
        this.getPastDayBars(currency, exchange, 1).subscribe(bars => {
            let data = [];
            bars.forEach( function (bar) {
                data.push({x: new Date(bar.time), y: +bar.open})
            });
            /* Create the new data points for the specified exchange and currency. */
            t.series[index] = {
                name: exchange,
                data: data
            };
            /* Flag just differentiates a call from the updateAllCryptos function 
            and the toggle function. */
            if (flag) {
                t.status = t.status + 1;
            } else {
                t.chart.update({
                    series: t.series
                });
            }
            if ((currency != 'LTCUSD' && t.status == 6) || (currency == 'LTCUSD' && t.status == 5)) {
                /* Only update the chart once all of the currencies have been retrieved. */
                t.chart.update({
                    series: t.series
                });
                t.status = 0;
            }
        })
    }

    private getPastDayBars(currency, exchange, interval): Observable<Bar[]> {
        // https://feed.cryptoquote.io/bars/minutes/1/btcusd.gdax.internal/now
        let url = 'https://feed.cryptoquote.io/bars/minutes/' + interval + '/' + currency + '.' + exchange + '.internal/now';
        return this.http.get<BarResponse>(url)
            .switchMap(res => res.bars.bars)
            .toArray();

    }
}
