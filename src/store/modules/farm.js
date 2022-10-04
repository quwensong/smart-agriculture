import _ from 'lodash';
import service from '@/service';
import { getFarmListData } from '@/data/index'
// "id": 58,
//       "name": "梅河口优选农产品种植基地",
//       "createdAt": 1655222400000,
//       "longitude": "104.430521",
//       "latitude": "27.062855",
//       "creditCode": "",
//       "fieldArea": null,
//       "manageTypes": [{
//         "id": 62,
//         "name": "农作物种植",
//         "unit": null,
//         "value": "经营范围",
//         "keyType": "manageRange",
//         "orderBy": 1,
//         "parentId": null,
//         "description": "农作物种植"
//       }, {
//         "id": 64,
//         "name": "畜牧业",
//         "unit": null,
//         "value": "经营范围",
//         "keyType": "manageRange",
//         "orderBy": 3,
//         "parentId": null,
//         "description": "畜牧业"
//       }, {
//         "id": 65,
//         "name": "水产养殖",
//         "unit": null,
//         "value": "经营范围",
//         "keyType": "manageRange",
//         "orderBy": 4,
//         "parentId": null,
//         "description": "水产养殖"
//       }],
//       "farmMarks": [],
//       "areaCode": "220581100226",
//       "address": "贵州省毕节市金沙县保兴村",
//       "professionalType": null,
//       "feature": "",
//       "description": "毕节市政府全力打造5G+互联网现代农业，利用全市农村农田种植各类绿色、有机蔬菜，推进家禽养殖，合理布局生活区域经济作物，打造美丽乡村，改善生活条件，增加家庭收入。毕节市金沙县保兴村位于毕节市西部，隶属金沙县管辖。西与辽宁省清原县、南与小杨乡、北与大安村接壤。幅员11平方公里，距离乡道大水线3公里，距离202国道10公里，距离吉草高速山城口15公里。村集体经济收入以发包土地及棚膜食用菌产业为主，年收入20万元以上。该村地处林区，临近磨盘湖和大安屯水库，自然资源丰富，是天然的林区风景地和水源风景地，拥有开展乡村旅游的天然区位优势。",
//       "corporationName": "",
//       "corporationTel": "",
//       "corporationId": "",
//       "corporationAddr": "",
//       "contactName": "demo-测试",
//       "contactTel": "17743107101",
//       "contactAddr": "",
//       "partyOrg": false,
//       "farmType": "其它企业",
//       "partyMemberNum": null,
//       "farmIndexUrl": "https://n-tianchi-oss.oss-cn-qingdao.aliyuncs.com/farm/def80730-4d4e-4be7-a5c3-984d0ba76a8d.jpg?Expires=4811191236&OSSAccessKeyId=LTAI4Fn1GBn1T9Qk1K7wSHRP&Signature=p7rADVWCYfRsvao8JjHr49gmZA4%3D",
//       "area": 636.0,
//       "shopId": null,
//       "shopName": null,
//       "updateInfo": null,
//       "farmCertificates": [],
//       "farmVideoList": []

const defaultFarm = {
  name: '梅河口优选农产品种植基地', // 农场名称
  address: '贵州省毕节市金沙县保兴村', // 地址
  contactName: 'demo-测试', //  联系人名称
  contactTel: '17743107101', // 联系人电话
  contactAddr: '贵州大学', // 联系人地址
  corporationAddr: '', // 法人地址
  corporationId: '', // 法人id
  corporationName: '', // 法人名称
  corporationTel: '', // 法人电话
  creditCode: '91310114MA1GWD5F88', // 统一社会信用代码
  description: '空气温度: 43℃, 上升3度，最高阈值: 40℃ 土壤温度: 5℃,下降5，最低阈值: 10℃', // 详情
  farmType: '农作物种植', // 农场类型
  feature: '水产养殖', // 特色
  fieldArea: '342', // 地块面积
  longitude: '104.430521', // 经度
  latitude: '27.062855', // 纬度
  manageType: '', // 经营项目
  manageTypes: [], // 经营项目多个
  partyOrg: false, // 是否成立党组织
  partyMemberNum: '', // 党组人数
  createdAt: '2012-09-04', // 创建日期
  farmIndexUrl: 'https://n-tianchi-oss.oss-cn-qingdao.aliyuncs.com/farm/def80730-4d4e-4be7-a5c3-984d0ba76a8d.jpg?Expires=4811191236&OSSAccessKeyId=LTAI4Fn1GBn1T9Qk1K7wSHRP&Signature=p7rADVWCYfRsvao8JjHr49gmZA4%3D', // 农场封面
  farmCertificates: [{
    "fileUrl": "https://n-tianchi-oss.oss-cn-qingdao.aliyuncs.com/farm/3c0e0e0f-73d3-40ec-a341-feea2ec02127.png?Expires=4779393897&OSSAccessKeyId=LTAI4Fn1GBn1T9Qk1K7wSHRP&Signature=kFZxJ%2BTdR15ZzoVFiTvs9gCWm5w%3D",
    "fileName": "万昌logo.png"
  }], // 农场证书
  farmMarks: [{
    "fileUrl": "https://n-tianchi-oss.oss-cn-qingdao.aliyuncs.com/farm/3c0e0e0f-73d3-40ec-a341-feea2ec02127.png?Expires=4779393897&OSSAccessKeyId=LTAI4Fn1GBn1T9Qk1K7wSHRP&Signature=kFZxJ%2BTdR15ZzoVFiTvs9gCWm5w%3D",
    "fileName": "万昌logo.png"
  }]
};

const state = {
  currentFarm: _.cloneDeep(defaultFarm)
};

const getters = {
  currentFarm(state) {
    return state.currentFarm;
  }
};

const mutations = {
  // 当前农场
  setCurrentFarm(state, payload) {
    state.currentFarm = formatData(payload.farm);
  }
}

const actions = {
  async getFarmById({
    commit
  }, id) {
    try {
      // let res = await service.getFarmById(id);
      let res = getFarmListData.data.list.find(farm => id == farm.id)
      // if (res && res.code === 0) {
      commit('setCurrentFarm', {
        farm: formatData(res)
      });
      // }
      return res;
    } catch (err) {
      console.log(err);
    }
  }
};

function formatData(data) {
  if (!_.isArray(data.farmCertificates)) {
    data.farmCertificates = [];
  }

  if (!_.isArray(data.farmMarks)) {
    data.farmMarks = [];
  }
  return Object.assign({}, {
    contactAddr: ''
  }, data);
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}