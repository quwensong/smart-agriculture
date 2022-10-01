const demoList = {
  code: 0,  // 状态码为200 则调用成功
  status: 'SUCCESS',
  message: "成功",
  timestamp:new Date().getTime(),
  'data|100-200':{
    "pageNum": 0,
		"pageSize": 100,
		"total": 30,
		"pages": 1,
    "list|100":[
      {
        "id": 59,
        "name": "梅河口市丰源优品米业集团有限公司",
        "createdAt": 1300636800000,
        "longitude": "125.440487",
        "latitude": "42.358225",
        "creditCode": "",
        "fieldArea": null,
        "manageTypes": [{
          "id": 62,
          "name": "农作物种植",
          "unit": null,
          "value": "经营范围",
          "keyType": "manageRange",
          "orderBy": 1,
          "parentId": null,
          "description": "农作物种植"
        }],
        "farmMarks": [],
        "areaCode": "220581100002",
        "address": "吉林省通化市梅河口市山城镇东放社区",
        "professionalType": null,
        "feature": "",
        "description": "梅河口市丰源优品米业集团有限公司成立于2011年3月21日，集团公司注册资金5亿元，自有绿优水稻种植基地5000余亩，是一家集粮食种植、收购、储存、加工、销售、配送为一体的市属国有独资企业，下辖吉林省国源农业发展有限公司、梅河口市浩源粮谷有限公司、梅河口市冠达粮谷贸易有限公司3家精深加工和销售子公司。公司占地285亩，建筑面积35000平方米，大米加工生产线引进两条具有国际先进水平的日本佐竹加工设备，日产大米300吨，年处理稻谷能力15万吨，建有国内一流的大米产品包装线以及全自动码垛机等，可实现自动化定量包装、真空、整形、码垛。烘干车间采用电脑控温、电加热的低温烘干方式，日处理量在500吨左右",
        "corporationName": "",
        "corporationTel": "",
        "corporationId": "",
        "corporationAddr": "",
        "contactName": "郑海辉",
        "contactTel": "18943448999",
        "contactAddr": "",
        "partyOrg": false,
        "farmType": "国有企业",
        "partyMemberNum": null,
        "farmIndexUrl": "https://n-tianchi-oss.oss-cn-qingdao.aliyuncs.com/farm/a3ee0d41-9d76-4a12-8de2-65f29ac33842.jpg?Expires=4817432403&OSSAccessKeyId=LTAI4Fn1GBn1T9Qk1K7wSHRP&Signature=E2umUgnD7QGZT9e8tW0DKXHsN9Y%3D",
        "area": 334.0,
        "shopId": null,
        "shopName": null,
        "updateInfo": null,
        "farmCertificates": [],
        "farmVideoList": []
      }
    ]
  }
  
  
  
  
  
  // {
  //   total: 100,  // 一次返回100条数据
  //   'rows|10': [{  // 一组为10条
  //     id: '@guid',//得到随机的id,对象
  //     name: '@cname',//随机生成中文名字
  //     'age|20-30': 23,
  //     'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师'],
  //     date:'@date()', // 随机生成日期
  //     avatar:"@image('200 * 200','red','#fff','avatar')", //生成图片,参数:size, background, foreground, text
  //     description:'@paragraph()',  // 描述
  //     ip:'@ip()', // IP地址
  //     email:'@email()' // email
  //   }]
  // }
};
export default {
    'get|/v1/farm/list1': demoList  // (get 请求)
}
