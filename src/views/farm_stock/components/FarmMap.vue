<template>
  <div class="my-map">
    <div id="farm-map"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue/dist/vue.esm.js";
import _ from "lodash";
export default {
  name: "FarmMap",
  props: {
    getMapCenter: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      map: null,
      DistrictCluster: null,
      districtCluster: null,
      myInfoWindow: null,
      markerList: []
    };
  },
  async mounted() {
    try {
      await this.mapInit();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async mapInit() {
      try {
        let disCountry = new AMap.DistrictLayer.Country({
          zIndex: 10,
          SOC: 'CHN',
          styles:{
            'nation-stroke':'#6BA9FF',
            'coastline-stroke': '',
            // 填充
            'fill': ''
          }
        });

        this.map = new window.AMap.Map("farm-map", {
          // 设置地图的显示样式
          mapStyle: "amap://styles/93f622ecbb8e8a4ed4f6b40967ef3857",
          center: [106.63, 26.65],
          zoom: 6,
          layers:[
            new AMap.TileLayer(),
            disCountry
          ],
          zooms: [4, 21]
        });
        this.myInfoWindow = this.initMyInfoWindow();

        // 绑定事件
        this.map.on("zoomend", this.mapZoomendHandler.bind(this));
        this.map.on("moveend", this.mapMoveendHandler.bind(this));
        // this.districtCluster.setData([]);

        let res = await this.$service.getFarmList({pageSize: 100});
        console.log("🚀 ~ file: FarmMap.vue ~ line 67 ~ mapInit ~ res", res)
        if (res && res.code === 0) {
          let dataList = res.data.list.map(item => {
            return {
              position: [parseFloat(item.longitude), parseFloat(item.latitude)],
              farm: item
            };
          });
          let markerList = this.createMarkerList(dataList);
          this.markerList = markerList;
          this.addMarkers();
        }
      } catch (e) {
        console.log(e);
      }
    },
    removeMarkers() {
      this.markerList.forEach((marker) => {
        window.AMap.event.removeListener(marker, 'click', this.markerClickHandler);
      });
      this.map.remove(this.markerList);
    },
    addMarkers() {
      this.removeMarkers();
      this.markerList.forEach((marker) => {
        this.map.add(marker);
        window.AMap.event.addListener(marker, 'click', this.markerClickHandler);
      });
    },
    markerClickHandler(e) {
      this.showMyInfoWindow(e.target.getExtData());
    },
    showMyInfoWindow(data) {
      let { position, farm } = data;
      this.myInfoWindow.setContent(this.getPointSimplifierContent(farm));
      this.myInfoWindow.open(this.map, position);
    },
    initMyInfoWindow() {
      return new window.AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        closeWhenClickMap: false, // 点击地图关闭信息窗口
        // autoMove: false,
        content: "",
        offset: new window.AMap.Pixel(-20, -35),
        anchor: "top-right"
      });
    },
    // 地图层级缩放时候的事件
    async mapZoomendHandler() {
      try {
        const zoom = this.map.getZoom();
        let mapCenter = await this.getCity();
        this.getMapCenter({ mapCenter, zoom });
        this.addMarkers();
      } catch (err) {
        console.log(err);
      }
    },
    async mapMoveendHandler() {
      try {
        const zoom = this.map.getZoom();
        const mapCenter = await this.getCity();
        this.getMapCenter({ mapCenter, zoom });
        this.addMarkers();
      } catch (err) {
        console.log(err);
      }
    },
    getPointSimplifierContent(farm) {
      let {
        id,
        name,
        area,
        contactName,
        contactTel,
        address,
        farmIndexUrl
      } = farm;
      let fixedArea = _.isNumber(area) ? area.toFixed(2) : 0;
      let farmBgStyle = `background-image: url(${farmIndexUrl});`;
      let template = `<div class="mark-info-window-container point-simplifier border-icon5">
                        <div class="close-btn" v-on:click="closeHandler()"></div>
                        <div class="farm-info-wrapper">
                          <div class="title">${name}</div>
                          <ul class="mark-info-list">
                            <li class="mark-info-item">
                              <div class="label">面积：</div>
                              <div class="value">${fixedArea}公顷</div>
                            </li>
                            <li class="mark-info-item">
                              <div class="label">联系人：</div>
                              <div class="value">${contactName}</div>
                            </li>
                            <li class="mark-info-item">
                              <div class="label">电话：</div>
                              <div class="value">${contactTel}</div>
                            </li>
                            <li class="mark-info-item">
                              <div class="label">地址：</div>
                              <div class="value">${address}</div>
                            </li>
                          </ul>
                        </div>
                        <div style="${farmBgStyle}" class="farm-image"></div>
                        <div class="enter-btn" v-on:click="farmDetail()">进入农场</div>
                    </div>`;
      let MyComponent = Vue.extend({
        template,
        methods: {
          farmDetail: () => {
            this.gotoFarmDetail(id);
          },
          closeHandler: () => {
            this.map.clearInfoWindow();
          }
        }
      });
      let component = new MyComponent().$mount();
      return component.$el;
    },
    gotoFarmDetail(id) {
      this.$router.push({ name: "FarmStockSurvey", params: { id } });
    },
    // 获取地图当前的行政区
    getCity() {
      return new Promise(resolve => {
        this.map.getCity(info => {
          resolve(info);
        });
      });
    },
    createMarkerList(dataList) {
      return dataList.map((data) => {
        return new AMap.Marker({
          position: data.position,
          clickable: true,
          extData: data,
          content: `<div class="${this.markerContainerClass(data.farm)}">
                      <div class="out-cycle">
                      </div>
                      <div class="inner-cycle">
                      </div>
                    </div>` //自定义覆盖物
        });
      });
    },
    markerContainerClass(farm) {
      let {farmType} = farm;
      switch (farmType) {
        case '农业专业合作社':
          return 'marker-container type-one';
        case '国有企业':
          return 'marker-container type-two';
        case '个体企业':
          return 'marker-container type-three';
        case '其它企业':
          return 'marker-container type-four';
        default:
          return 'marker-container type-one';
      }
    },
    resetPosition() {
      this.map.setCenter([106.63, 26.65]);
      this.map.setZoom(6);
    },
    zoomOut() {
      const zoom = this.map.getZoom();
      this.map.setZoom(zoom + 1);
    },
    zoomIn() {
      const zoom = this.map.getZoom();
      this.map.setZoom(zoom - 1);
    },
    renderCountryBounds() {
      // let districtSearch = new AMap.DistrictSearch({
      //   // 关键字对应的行政区级别，共有5种级别
      //   level: 'country',
      //   //  是否显示下级行政区级数，1表示返回下一级行政区
      //   subdistrict: 0,
      //  // 返回行政区边界坐标点
      //   extensions: 'all'
      // });

      // districtSearch.search('中国', (status, result) => {
      //   // 查询成功时，result即为对应的行政区信息
      //   let bounds = result.districtList[0].boundaries
      //   if (bounds) {
      //     for (let i = 0, l = bounds.length; i < l; i++) {
      //     //生成行政区划polygon
      //       new AMap.Polygon({
      //         map: this.map,    //指定地图对象
      //         strokeWeight: 3,    //轮廓线宽度
      //         path: bounds[i],     //轮廓线的节点坐标数组
      //         fillOpacity: 0,     //透明度
      //         // fillColor: '#256edc',     //填充颜色
      //         strokeColor: '#4693FE',    //线条颜色
      //       });
      //     }
      //   }
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
.my-map {
  width: 100%;
  height: 100%;
  #farm-map {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss">
#farm-map {
  .amap-marker {
    .amap-icon {
      display: none;
    }
  }
  .mark-info-window-container {
    position: relative;
    width: 330px;
    height: 300px;
    padding: 4px;
    background-color: rgba(30, 91, 135, 0.8);
    .close-btn {
      position: absolute;
      right: 0;
      top: -30px;
      width: 20px;
      height: 20px;
      background-image: url('../../../assets/image/map_close_btn_icon.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .farm-info-wrapper {
      height: 130px;
      padding: 10px 20px;
      .title {
        color: #f0f0f0;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 6px;
      }
      .mark-info-list {
        .mark-info-item {
          display: flex;
          align-items: flex-start;
          font-size: 12px;
          line-height: 16px;
          color: #dcdcdc;
          .label {
            white-space: nowrap;
            text-align: left;
          }
          .value {
            flex: 1;
          }
        }
      }
    }
    .farm-image {
      width: 100%;
      height: 162px;
      background-color: transparent;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .enter-btn {
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      background-color: #38a1da;
      width: 160px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      color: #f0f0f0;
      cursor: pointer;
    }
  }
}
.amap-logo {
  right: 0 !important;
  left: auto !important;
  display: none !important;
}
.amap-copyright {
  right: 70px !important;
  left: auto !important;
  opacity:0 !important;
}
</style>
