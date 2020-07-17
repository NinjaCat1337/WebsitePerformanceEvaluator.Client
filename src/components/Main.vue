<template>
  <div class="field">
    <div>
      <pure-vue-chart
        :points="this.graphData"
        :width="800"
        :height="200"
        :show-values="true"
      />
    </div>
    <input type="text" id="urlRequest" v-model="url" />
    <button class="btn-main-dark btn-main-hover-green mr-1" @click="getSiteMap">Go</button>
    <hr />
    <div class="history-box">
      <div class="history-left-menu">
        <ul class="list-group">
          <li
            class="list-group-item list-group-item-hover-green"
            v-for="(site, index) in sites"
            :key="index"
            @click="loadSiteTestResults(site.id)"
          >{{ site.siteUrl }}</li>
        </ul>
      </div>
      <div class="history-right-menu">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Url</th>
              <th scope="col">Min Value</th>
              <th scope="col">Max Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(siteTestResult, index) in siteTestResults" :key="index">
              <th scope="row">{{siteTestResult.url}}</th>
              <td>{{siteTestResult.minValue}}</td>
              <td>{{siteTestResult.maxValue}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import PureVueChart from "pure-vue-chart";

export default {
  data() {
    return {
      url: null,
      siteMap: [],
      sites: [],
      urlResponseTimes: [],
      siteTestResults: [],
      graphData: []
    };
  },
  components: {
    PureVueChart
  },
  methods: {
    getSiteMap() {
      const request = { url: this.url };
      Axios.post(`/sitemap/`, request).then(response => {
        if (response.status == 200) {
          this.siteMap = response.data;
          Axios.post(`/responsetime/`, this.siteMap).then(response => {
            if (response.status == 200) {
              this.urlResponseTimes = response.data;
              const testResult = {
                SiteUrl: this.url,
                UrlResponseTimes: this.urlResponseTimes
              };
              this.responseTimeToGraph();
              console.log(this.graphData);
              Axios.post(`/testresults/`, testResult).then(response => {
                if (response.status == 200) {
                  this.loadSites();
                  this.loadSiteTestResults(response.data);
                }
              });
            }
          });
        }
      });
    },
    loadSiteTestResults(idSite) {
      Axios.get(`/testresults/${idSite}`).then(response => {
        if (response.status == 200) {
          this.siteTestResults = response.data.siteMapUrls;
        }
      });
    },
    responseTimeToGraph() {
      this.urlResponseTimes.forEach(element => {
        const newElement = {
          label: element.url,
          value: element.responseTimeMilliseconds
        };
        this.graphData.push(newElement);
      });
    },
    loadSites() {
      Axios.get(`/site/`).then(response => {
        if (response.status == 200) {
          this.sites = response.data;
        }
      });
    }
  },
  mounted() {
    this.loadSites();
  }
};
</script>

<style scoped>
.field {
  margin-left: 10%;
  margin-right: 10%;
}
.history-box {
  width: 100%;
  height: 400px;
  display: flex;
}
.history-left-menu {
  width: 40%;
}
.history-right-menu {
  width: 60%;
}
</style>