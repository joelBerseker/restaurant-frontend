<script setup>
import { ref, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { ticketDetailService } from "@/services";
import LoadingContainer from "@/common/container/LoadingContainer.vue";
import { formatData } from "@/helpers";

const isLoadingCharts = ref(false);
const chartOptionsTypeProducts = ref({
  chart: {
    id: "pie",
  },
  noData: {
    text: "No se encontraron registros.",
  },
});
const chartOptionsSalesWeek = ref({
  chart: {
    id: "bar",
  },
  noData: {
    text: "No se encontraron registros.",
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
  noData: {
    text: "No se encontraron registros.",
  },
  dataLabels: {
    enabled: false,
  },
});

const seriesTypeProduct = ref([]);
const seriesSalesWeek = ref([]);
const seriesCombined = ref([]);

const init = async () => {
  isLoadingCharts.value = true;
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
  isLoadingCharts.value = false;
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
      position: "bottom",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "50%",
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    noData: {
      text: "No se encontraron registros.",
    },
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
          return formatData.datesMin(value);
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
        borderRadius: 4,
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
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    noData: {
      text: "No se encontraron registros.",
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
    xaxis: {
      labels: {
        formatter: function (value) {
          return formatData.datesMin(value);
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
        horizontal: true,
        borderRadius: 4,
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
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],

    noData: {
      text: "No se encontraron registros.",
    },
  };
};
onMounted(() => {
  init();
});
</script>

<template>
  <div id="chart">
    <div class="row gutter-sec justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6">
        <g-section-4
          title="Venta de Tipo de Productos"
          subTitle="Porcentaje de ventas de los últimos 7 días."
          class="h-100"
        >
          <LoadingContainer :loading="isLoadingCharts">
            <VueApexCharts
              width="100%"
              height="350"
              type="pie"
              :options="chartOptionsTypeProducts"
              :series="seriesTypeProduct"
            ></VueApexCharts>
          </LoadingContainer>
        </g-section-4>
      </div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6">
        <g-section-4
          title="Venta semanal"
          subTitle="Ganacias generadas los últimos 7 días."
        >
          <LoadingContainer :loading="isLoadingCharts">
            <VueApexCharts
              width="100%"
              height="350"
              type="bar"
              :options="chartOptionsSalesWeek"
              :series="seriesSalesWeek"
            ></VueApexCharts>
          </LoadingContainer>
        </g-section-4>
      </div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6">
        <g-section-4
          title="Venta de Tipo de Productos"
          subTitle="Cantidad de ventas de últimos 7 días."
        >
          <LoadingContainer :loading="isLoadingCharts">
            <VueApexCharts
              width="100%"
              height="350"
              type="bar"
              :options="chartOptionsCombined"
              :series="seriesCombined"
            ></VueApexCharts>
          </LoadingContainer>
        </g-section-4>
      </div>
    </div>
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
