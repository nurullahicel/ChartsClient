import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  connection: signalR.HubConnection;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7068/saleshub")
      .build();
    debugger;
    this.connection.start();

    this.connection.on("receiveMessage", message => {
      for(let i=0;i<this.chart.series.length;i++){
        this.chart.series[i].remove();
      }
      for(let i=0;i<message.length;i++){
        this.chart.addSeries(message[i]);
      }
      this.updateFromInput = true;
      this.chart.hideLoading();
    });
    const self = this;
    this.chartCallback = chart => {
      self.chart = chart;
    }
  }
  chart;
  updateFromInput = false;
  chartCallback;



  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: { text: "Headline" },
    subtitle: { text: "Subtitle" },
    yAxis: { title: { text: "Y Axis" } },
    xAxis: { accessibility: { rangeDescription: "2019-2020" } },
    legend: { layout: "vertical", align: "right", verticalAlign: "middle" },
    series:[{name:"A", data:[100,200],type:"spline"}],
    plotOptions: {
      series: {
        label: {
          connectorAllowed: true
        },
        pointStart: 1
      }
    }
  }
}
