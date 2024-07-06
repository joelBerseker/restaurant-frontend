<script setup>
import { ref, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { ticketDetailService } from "@/services";
import { fixedDates } from "@/helpers";
const chartOptionsTypeProducts = ref({
  chart: {
    id: "pie",
  },
  noData: {
    text: "Loading...",
  },
});
const chartOptionsSalesWeek = ref({
  chart: {
    id: "bar",
  },
  series: [
    {
      name: "Dias",
      data: [2, 3],
    },
  ],
  dataLabels: {
    enabled: false,
  },
});
const chartOptionsCombined = ref({
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },
  series: [
    {
      name: "PRODUCT A",
      data: [44, 55, 41, 67, 22, 43],
    },
    {
      name: "PRODUCT B",
      data: [13, 23, 20, 8, 13, 27],
    },
    {
      name: "PRODUCT C",
      data: [11, 17, 15, 15, 21, 14],
    },
    {
      name: "PRODUCT D",
      data: [21, 7, 25, 13, 22, 8],
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      borderRadiusApplication: "end", // 'around', 'end'
      borderRadiusWhenStacked: "last", // 'all', 'last'
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: "13px",
            fontWeight: 900,
          },
        },
      },
    },
  },
});

const seriesTypeProduct = ref([]);
const seriesSalesWeek = ref([]);
const seriesCombined = ref([]);

const init = async () => {
  const data = await ticketDetailService.getStatistics();
  const productTypeStats = data.product_type_stats;
  const productTotalPrice = data.daily_total_price;
  console.log(productTotalPrice);
  const combined = data.combined_stats;
  updateLabels(
    Object.keys(productTypeStats),
    Object.keys(productTotalPrice),
    Object.values(productTotalPrice),
    combined
  );
  seriesCombined.value = combined;
  seriesTypeProduct.value = Object.values(productTypeStats);
  seriesSalesWeek.value = Object.values(productTotalPrice);
};
const updateLabels = (
  type_product,
  sales_week,
  series_sales_week,
  combined
) => {
  chartOptionsTypeProducts.value = {
    chart: {
      id: "pie",
    },
    labels: type_product,
    legend: {
      onItemClick: {
        toggleDataSeries: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "50%",
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  chartOptionsSalesWeek.value = {
    series: [
      {
        name: "Ventas",

        data: series_sales_week,
      },
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return "s/ " + parseFloat(val).toFixed(2);
      },
      offsetY: -10,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    chart: {
      height: 350,
      type: "bar",
    },
    toolbar: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "s/ " + parseFloat(val).toFixed(2);
        },
      },
    },
    stroke: {
      width: 1,
    },
    grid: {
      row: {
        colors: ["#fff", "#f2f2f2"],
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return fixedDates(value);
        },
      },
      title: {
        text: "Ultimos 7 dias",
      },
      categories: sales_week,
      tickPlacement: "on",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
  };
  seriesCombined.value = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    series: combined,
    legend: {
      position: "right",
      offsetY: 40,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },

    xaxis: {
      labels: {
        formatter: function (value) {
          return fixedDates(value);
        },
      },
      title: {
        text: "Ultimos 7 dias",
      },
      categories: sales_week,
      tickPlacement: "on",
    },
  };
};
onMounted(() => {
  init();
});
</script>

<template>
  <div id="chart">
    <VueApexCharts
      width="500"
      height="350"
      type="pie"
      :options="chartOptionsTypeProducts"
      :series="seriesTypeProduct"
    ></VueApexCharts>

    <VueApexCharts
      width="500"
      height="350"
      type="bar"
      :options="chartOptionsSalesWeek"
      :series="seriesSalesWeek"
    ></VueApexCharts>

    <VueApexCharts
      width="500"
      height="350"
      type="bar"
      :options="chartOptionsCombined"
      :series="seriesCombined"
    ></VueApexCharts>
  </div>
</template>

<style scoped>
.example {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
