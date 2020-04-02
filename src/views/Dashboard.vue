<template>
  <div class="dashboard">
    <v-col>
      <page-title title="dashboard">
        <v-btn depressed icon><v-icon>fas fa-sync</v-icon></v-btn>
      </page-title>

      <v-row>
        <v-card class="full-wh" outlined shaped>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <highcharts :options="pieChart"></highcharts>
              </v-col>
              <v-col cols="12" md="6">
                <highcharts :options="seriesChart"></highcharts>
              </v-col>
              <v-col cols="12" md="6">
                <highcharts :options="pieChart"></highcharts>
              </v-col>
              <v-col cols="12" md="6">
                <highcharts :options="seriesChart"></highcharts>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import PageTitle from '@/components/core/PageTitle.vue';
import Highcharts from 'highcharts';
import { Chart } from 'highcharts-vue';

export default {
  name: 'Dashboard',
  components: {
    'page-title': PageTitle,
    highcharts: Chart,
    Highcharts,
  },
  data: () => ({
    pieChart: {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Resource allocation this week',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [{
        name: 'Resources',
        colorByPoint: true,
        data: [{
          name: 'projects 1',
          y: 61.41,
        }, {
          name: 'projects 2',
          y: 11.84,
        }, {
          name: 'projects 3',
          y: 10.85,
        }, {
          name: 'projects 4',
          y: 4.67,
        }, {
          name: 'projects 5',
          y: 4.18,
        }, {
          name: 'projects 6',
          y: 7.05,
        }],
      }],
    },
    seriesChart: {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Cohorts',
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)',
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [{
        name: 'Development',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
      }, {
        name: 'Reporting',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
      }],
    },
  }),
};
</script>

<style scoped>

</style>
