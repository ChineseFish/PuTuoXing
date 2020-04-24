const commonBusTrips = [
  {
    title: '豪华大巴',
    tips: '',
    data: [{
      id: 5,
      name: '上海黄浦旅游集散站 - 普陀客运站',
      componentPath: 'luxury-bus-list'
    }, {
      id: 601,
      name: '普陀客运站 - 上海黄浦旅游集散站',
      componentPath: 'luxury-bus-list'
    }, {
      id: 216,
      name: '杭州吴山广场 - 普陀客运站',
      componentPath: 'luxury-bus-list'
    }, {
      id: 1702,
      name: '普陀客运站 - 杭州吴山广场（杭州西站）',
      componentPath: 'luxury-bus-list'
    }]
  }, {
    title: '普通大巴',
    tips: '',
    data: [{
      name: '宁波 - 普陀',
      fromStationName: '宁波',
      toStationName: '普陀'
    }, {
      name: '普陀 - 宁波',
      fromStationName: '普陀',
      toStationName: '宁波'
    }, {
      name: '宁波 - 朱家尖',
      fromStationName: '宁波',
      toStationName: '朱家尖'
    }, {
      name: '朱家尖 - 宁波',
      fromStationName: '朱家尖',
      toStationName: '宁波'
    }]
  }
]

const state = {
  travelLineList: [
    {
      title: '普陀山专线',
      image: 'static/images/travel-line-pts.jpg',
      type: 'pts',
      routerPath: '/travel-line-ticket/pts',
      desc: '海天佛国，观音道场',
      showHome: true,
      labels: [{
        text: '热门专线'
      }]
    }, {
      title: '东极岛专线',
      image: 'static/images/travel-line-djd.jpg',
      type: 'djd',
      routerPath: '/travel-line-ticket/djd',
      desc: '东海璀璨明珠',
      showHome: true,
      labels: [{
        text: '热门专线'
      }]
    }, {
      title: '鱼山岛专线',
      image: 'static/images/travel-line-ysd.jpg',
      type: 'ysd',
      routerPath: '/travel-line-ticket/ysd',
      desc: '绿色石化基地',
      showHome: true,
      labels: [{
        text: '热门专线'
      }]
    }, {
      title: '嵊山/枸杞岛专线',
      image: 'static/images/travel-line-ssd.jpg',
      type: 'ssd',
      routerPath: '/travel-line-ticket/ssd',
      desc: '天涯东尽头',
      showHome: true,
      labels: [{
        text: '热门专线'
      }]
    }, {
      title: '桃花岛专线',
      image: 'static/images/travel-line-thd.jpg',
      type: 'thd',
      routerPath: '/travel-line-ticket/thd',
      desc: '金庸先生笔下仙岛。'
    }, {
      title: '衢山岛专线',
      image: 'static/images/travel-line-qsd.jpg',
      type: 'qsd',
      routerPath: '/travel-line-ticket/qsd',
      desc: '中国最美海岛之一'
    }, {
      title: '嵊泗专线',
      image: 'static/images/travel-line-ss.jpg',
      type: 'ss',
      routerPath: '/travel-line-ticket/ss',
      desc: '舟山最北的海岛县。'
    }, {
      title: '白沙岛专线',
      image: 'static/images/travel-line-bsd.jpg',
      type: 'bsd',
      routerPath: '/travel-line-ticket/bsd',
      desc: '第一个主题钓岛'
    }, {
      title: '岱山岛专线',
      image: 'static/images/travel-line-dsd.jpg',
      type: 'dsd',
      routerPath: '/travel-line-ticket/dsd',
      desc: '海上“蓬莱”'
    }, {
      title: '秀山岛专线',
      image: 'static/images/travel-line-xsd.jpg',
      type: 'xsd',
      routerPath: '/travel-line-ticket/xsd',
      desc: '海上香格里拉'
    }, {
      title: '长涂岛专线',
      image: 'static/images/travel-line-ctd.jpg',
      type: 'ctd',
      routerPath: '/travel-line-ticket/ctd',
      desc: '风景优美，远离喧嚣'
    }, {
      title: '六横岛专线',
      image: 'static/images/travel-line-lhd.jpg',
      type: 'lhd',
      routerPath: '/travel-line-ticket/lhd',
      desc: '海上后花园'
    }, {
      title: '虾峙岛专线',
      image: 'static/images/travel-line-xzd.jpg',
      type: 'xzd',
      routerPath: '/travel-line-ticket/xzd',
      desc: '岛形狭长似虾体'
    }, {
      title: '登步岛专线',
      image: 'static/images/travel-line-dbd.jpg',
      type: 'dbd',
      routerPath: '/travel-line-ticket/dbd',
      desc: '海上盆景'
    }, {
      title: '蚂蚁岛专线',
      image: 'static/images/travel-line-myd.jpg',
      type: 'myd',
      routerPath: '/travel-line-ticket/myd',
      desc: '天空和大海的热恋'
    }
  ],
  travelLineTrips: {
    'pts': {
      bus: [
        {
          title: '普陀山专线',
          tips: '豪华往返',
          data: [{
            id: 7,
            name: '上海黄浦-普陀山（朱家尖） 二日往返',
            componentPath: 'luxury-bus-list'
          }, {
            id: 8,
            name: '上海黄浦-普陀山（朱家尖） 三日往返',
            componentPath: 'luxury-bus-list'
          }]
        },
        ...commonBusTrips
      ],
      ship: [{
        title: '去程',
        tips: '普陀山专线',
        data: [{
          name: '沈家门半升洞码头 - 普陀山',
          id: 301
        }, {
          name: '朱家尖蜈蚣峙码头 - 普陀山',
          id: 101
        }, {
          name: '宁波白峰 - 普陀山',
          href: 'http://bf.ziubao.com/bfsp/list.jsp?sCity=白峰&eCity=普陀山'
        }, {
          name: '六横大岙 - 普陀山',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=普陀山'
        }, {
          name: '上海吴淞 - 普陀山',
          id: 6102,
          type: 'ssly',
          canWebBuyDays: 15
        }, {
          name: '上海南浦 - 普陀山',
          id: 6401,
          type: 'ssly',
          canWebBuyDays: 15
        }, {
          name: '小洋山 - 普陀山',
          id: 6201,
          type: 'ssly',
          canWebBuyDays: 15
        }]
      }, {
        title: '返程',
        tips: '普陀山专线',
        data: [{
          name: '普陀山 - 朱家尖蜈蚣峙码头',
          href: 'http://pts.zsghtky.com/list.jsp?sCity=普陀山&eCity=朱家尖',
          canWebBuyDays: 1
        }, {
          name: '普陀山 - 沈家门半升洞码头',
          href: 'http://pts.zsghtky.com/list.jsp?sCity=普陀山&eCity=沈家门',
          canWebBuyDays: 1
        }, {
          name: '普陀山 - 上海吴淞',
          href: 'http://pts.zsghtky.com/ctlist.jsp?sCity=普陀山&eCity=上海吴淞',
          id: 201
        }, {
          name: '普陀山 - 白峰',
          href: 'http://pts.zsghtky.com/ctlist.jsp?sCity=普陀山&eCity=白峰',
          id: 203
        }, {
          name: '普陀山 - 小洋山',
          href: 'http://pts.zsghtky.com/ctlist.jsp?sCity=普陀山&eCity=上海洋山',
          id: 204
        }]
      }]
    },
    'djd': {
      bus: [
        ...commonBusTrips
      ],
      ship: [
        {
          title: '去程',
          tips: '东极岛专线',
          data: [{
            name: '沈家门半升洞码头 - 东极岛',
            id: 302
          }]
        }
      ]
    },
    'ssd': {
      bus: [
        ...commonBusTrips
      ],
      ship: [
        {
          title: '去程',
          tips: '嵊山/枸杞岛专线',
          data: [{
            name: '沈家门半升洞码头 - 嵊山/枸杞岛',
            id: 303
          }]
        }
      ]
    },
    'thd': {
      bus: [
        ...commonBusTrips
      ],
      ship: [{
        title: '去程',
        tips: '桃花岛专线',
        data: [{
          name: '沈家门墩头码头 - 桃花岛',
          href: 'http://dt.zsghtky.com/list.jsp?sCity=%E5%A2%A9%E5%A4%B4&eCity=%E6%A1%83%E8%8A%B1'
        }, {
          name: '朱家尖西岙码头 - 桃花岛',
          href: 'http://pt.ziubao.com/zjjsp/listCar.jsp?sCity=%E8%A5%BF%E5%B2%99&eCity=%E6%A1%83%E8%8A%B1'
        }, {
          name: '郭巨 - 桃花沙岙',
          href: 'http://gj.ziubao.com/list.jsp?sCity=%E5%AE%81%E6%B3%A2%E9%83%AD%E5%B7%A8&eCity=%E6%A1%83%E8%8A%B1%E6%B2%99%E5%B2%99'
        }, {
          name: '六横台门 - 桃花茅草屋',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=台门&eCity=桃花'
        }, {
          name: '六横大岙 - 桃花茅草屋',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=桃花'
        }, {
          name: '虾峙 - 桃花茅草屋',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=虾峙&eCity=桃花'
        }, {
          name: '朱家尖蜈蚣峙码头 - 桃花岛',
          id: 102
        }]
      }, {
        title: '返程',
        tips: '桃花岛专线',
        data: [{
          name: '桃花茅草屋 - 沈家门墩头码头',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=%E6%A1%83%E8%8A%B1&eCity=%E5%A2%A9%E5%A4%B4'
        }, {
          name: '桃花茅草屋 - 朱家尖西岙码头',
          href: 'http://pt.ziubao.com/thsp/listCar.jsp?sCity=%E6%A1%83%E8%8A%B1&eCity=%E8%A5%BF%E5%B2%99'
        }, {
          name: '桃花茅草屋 - 虾峙',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=桃花&eCity=虾峙'
        }, {
          name: '桃花茅草屋 - 六横台门',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=桃花&eCity=台门'
        }, {
          name: '桃花茅草屋 - 普陀山',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=桃花&eCity=普陀山'
        }, {
          name: '桃花茅草屋 - 六横大岙',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=桃花&eCity=大岙'
        }, {
          name: '桃花沙岙 - 郭巨',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=%E6%A1%83%E8%8A%B1%E6%B2%99%E5%B2%99&eCity=%E5%AE%81%E6%B3%A2%E9%83%AD%E5%B7%A8'
        }]
      }]
    },
    'ysd': {
      bus: [
        {
          title: '鱼山岛专线',
          tips: '普通大巴',
          data: [{
            name: '宁波 - 海丰码头',
            fromStationName: '宁波',
            toStationName: '海丰码头'
          }, {
            name: '海丰码头 - 宁波',
            fromStationName: '海丰码头',
            toStationName: '宁波'
          }]
        }
      ],
      ship: [{
        title: '去程',
        tips: '鱼山岛专线',
        data: [{
          name: '海丰 - 鱼山岛',
          href: 'http://hf.ziubao.com/list.jsp?sCity=海丰&eCity=鱼山'
        }, {
          name: '高亭 - 鱼山岛',
          id: 5103,
          type: 'dsjt'
        }]
      }, {
        title: '返程',
        tips: '鱼山岛专线',
        data: [{
          name: '鱼山岛 - 海丰',
          id: 502,
          type: 'dsjt'
        }, {
          name: '鱼山岛 - 高亭',
          id: 501,
          type: 'dsjt'
        }]
      }]
    },
    'qsd': {
      bus: [
        {
          title: '衢山岛专线',
          tips: '普通大巴',
          data: [{
            name: '宁波 - 岱山',
            fromStationName: '宁波',
            toStationName: '岱山'
          }, {
            name: '岱山 - 宁波',
            fromStationName: '岱山',
            toStationName: '宁波'
          }, {
            name: '宁波 - 三江码头',
            fromStationName: '宁波',
            toStationName: '三江码头'
          }, {
            name: '三江码头 - 宁波',
            fromStationName: '三江码头',
            toStationName: '宁波'
          }, {
            name: '宁波 - 衢山',
            fromStationName: '宁波',
            toStationName: '衢山'
          }]
        }
      ],
      ship: [{
        title: '去程',
        tips: '衢山岛专线',
        data: [{
          name: '岱山竹屿 - 衢山',
          href: 'http://ds.ziubao.com/list.jsp?sCity=竹屿&eCity=衢山',
          id: 5307,
          type: 'dsjt'
        }, {
          name: '三江 - 衢山',
          href: 'http://sj.ziubao.com/list.jsp?sCity=三江&eCity=衢山'
        }]
      }, {
        title: '返程',
        tips: '衢山岛专线',
        data: [{
          name: '衢山 - 岱山竹屿',
          href: 'http://ds.ziubao.com/list.jsp?sCity=衢山&eCity=竹屿',
          id: 5204,
          type: 'dsjt'
        }, {
          name: '衢山 - 沈家湾',
          href: 'http://ds.ziubao.com/list.jsp?sCity=衢山&eCity=沈家湾',
          id: 5201,
          type: 'dsjt'
        }, {
          name: '衢山 - 上海南浦',
          href: 'http://ds.ziubao.com/list.jsp?sCity=衢山&eCity=上海南浦',
          id: 5202,
          type: 'dsjt'
        }, {
          name: '衢山 - 三江',
          href: 'http://ds.ziubao.com/list.jsp?sCity=衢山&eCity=三江',
          id: 5203,
          type: 'dsjt'
        }, {
          name: '衢山 - 泗礁',
          href: 'http://ds.ziubao.com/list.jsp?sCity=衢山&eCity=泗礁',
          id: 5205,
          type: 'dsjt'
        }, {
          name: '衢山 - 小洋山',
          href: 'http://ds.ziubao.com/list.jsp?sCity=衢山&eCity=小洋山',
          id: 5206,
          type: 'dsjt'
        }]
      }]
    },
    'ss': {
      bus: [
        {
          title: '嵊泗专线',
          tips: '普通大巴',
          data: [{
            name: '宁波 - 岱山',
            fromStationName: '宁波',
            toStationName: '岱山'
          }, {
            name: '岱山 - 宁波',
            fromStationName: '岱山',
            toStationName: '宁波'
          }, {
            name: '宁波 - 三江码头',
            fromStationName: '宁波',
            toStationName: '三江码头'
          }, {
            name: '三江码头 - 宁波',
            fromStationName: '三江码头',
            toStationName: '宁波'
          }]
        }
      ],
      ship: [
        {
          title: '去程',
          tips: '嵊泗专线',
          data: [{
            name: '岱山竹屿 - 嵊泗',
            id: 5306,
            type: 'dsjt'
          }, {
            name: '三江 - 嵊泗',
            href: 'http://sj.ziubao.com/list.jsp?sCity=三江&eCity=嵊泗'
          }, {
            name: '上海南浦 - 嵊泗',
            id: 6301,
            type: 'ssly',
            canWebBuyDays: 15
          }]
        }
      ]
    },
    'bsd': {
      bus: [...commonBusTrips],
      ship: [
        {
          title: '去程',
          tips: '白沙岛专线',
          data: [{
            name: '朱家尖漳州湾 - 白沙岛',
            href: 'http://pt.ziubao.com/zjjsp/list.jsp?sCity=樟州湾&eCity=白沙岛'
          }, {
            name: '朱家尖蜈蚣峙码头 - 白沙岛',
            id: 104
          }]
        }
      ]
    },
    'dsd': {
      bus: [
        {
          title: '岱山专线',
          tips: '普通大巴',
          data: [{
            name: '杭州 - 岱山',
            fromStationName: '杭州',
            toStationName: '岱山'
          }, {
            name: '宁波 - 岱山',
            fromStationName: '宁波',
            toStationName: '岱山'
          }, {
            name: '岱山 - 宁波',
            fromStationName: '岱山',
            toStationName: '宁波'
          }, {
            name: '宁波 - 三江码头',
            fromStationName: '宁波',
            toStationName: '三江码头'
          }, {
            name: '三江码头 - 宁波',
            fromStationName: '三江码头',
            toStationName: '宁波'
          }]
        }
      ],
      ship: [{
        title: '岱山高亭去程',
        tips: '岱山岛专线',
        data: [{
          name: '鱼山岛 - 岱山高亭',
          id: 501,
          type: 'dsjt'
        }, {
          name: '三江 - 岱山高亭',
          href: 'http://sj.ziubao.com/list.jsp?sCity=三江&eCity=高亭'
        }]
      }, {
        title: '岱山高亭返程',
        tips: '岱山岛专线',
        data: [{
          name: '岱山高亭 - 三江',
          href: 'http://ds.ziubao.com/list.jsp?sCity=高亭&eCity=三江',
          id: 5101,
          type: 'dsjt'
        }, {
          name: '岱山高亭 - 鱼山',
          id: 5103,
          type: 'dsjt'
        }]
      }, {
        title: '岱山竹屿去程',
        tips: '岱山岛专线',
        data: [{
          name: '衢山 - 岱山竹屿',
          id: 5204,
          type: 'dsjt'
        }, {
          name: '岱山长涂 - 岱山竹屿',
          id: 5603,
          type: 'dsjt'
        }, {
          name: '上海吴淞 - 岱山竹屿',
          id: 6101,
          type: 'ssly',
          canWebBuyDays: 15
        }]
      }, {
        title: '岱山竹屿返程',
        tips: '岱山岛专线',
        data: [{
          name: '岱山竹屿 - 岱山长涂',
          href: 'http://ds.ziubao.com/list.jsp?sCity=竹屿&eCity=长涂',
          id: 5301,
          type: 'dsjt'
        }, {
          name: '岱山竹屿 - 普陀山',
          id: 5302,
          type: 'dsjt'
        }, {
          name: '岱山竹屿 - 港南',
          href: 'http://ds.ziubao.com/list.jsp?sCity=竹屿&eCity=港南',
          id: 5303,
          type: 'dsjt'
        }, {
          name: '岱山竹屿 - 衢山',
          href: 'http://ds.ziubao.com/list.jsp?sCity=竹屿&eCity=衢山'
        }, {
          name: '岱山竹屿 - 小洋山',
          id: 5304,
          type: 'dsjt'
        }, {
          name: '岱山竹屿 - 上海',
          id: 5305,
          type: 'dsjt'
        }, {
          name: '岱山竹屿 - 嵊泗',
          id: 5306,
          type: 'dsjt'
        }]
      }]
    },
    'xsd': {
      bus: [...commonBusTrips],
      ship: [{
        title: '去程',
        tips: '秀山岛专线',
        data: [{
          name: '三江 - 秀山',
          href: 'http://sj.ziubao.com/list.jsp?sCity=三江&eCity=秀山'
        }]
      }, {
        title: '返程',
        tips: '秀山岛专线',
        data: [{
          name: '秀山 - 三江',
          href: 'http://ds.ziubao.com/list.jsp?sCity=秀山&eCity=三江',
          id: 5401,
          type: 'dsjt'
        }]
      }]
    },
    'xzd': {
      bus: [...commonBusTrips],
      ship: [{
        title: '去程',
        tips: '虾峙岛专线',
        data: [{
          name: '沈家门墩头码头 - 虾峙',
          href: 'http://dt.zsghtky.com/list.jsp?sCity=墩头&eCity=虾峙'
        }, {
          name: '宁波郭巨 - 虾峙',
          href: 'http://gj.ziubao.com/list.jsp?sCity=宁波郭巨&eCity=虾峙'
        }, {
          name: '六横台门 - 虾峙',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=台门&eCity=虾峙'
        }, {
          name: '六横大岙 - 虾峙',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=虾峙'
        }, {
          name: '桃花茅草屋 - 虾峙',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=桃花&eCity=虾峙'
        }]
      }, {
        title: '返程',
        tips: '虾峙岛专线',
        data: [{
          name: '虾峙 - 沈家门墩头码头',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=虾峙&eCity=墩头'
        }, {
          name: '虾峙 - 宁波郭巨',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=虾峙&eCity=宁波郭巨'
        }, {
          name: '虾峙 - 桃花茅草屋',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=虾峙&eCity=桃花'
        }, {
          name: '虾峙 - 六横台门',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=虾峙&eCity=台门'
        }, {
          name: '虾峙 - 六横大岙',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=虾峙&eCity=大岙'
        }, {
          name: '虾峙 - 湖泥',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=虾峙&eCity=湖泥'
        }]
      }]
    },
    'ctd': {
      bus: [...commonBusTrips],
      ship: [{
        title: '去程',
        tips: '长涂岛专线',
        data: [{
          name: '岱山竹屿 - 岱山长涂',
          id: 5301,
          type: 'dsjt'
        }, {
          name: '三江 - 岱山长涂',
          href: 'http://sj.ziubao.com/list.jsp?sCity=三江&eCity=长涂'
        }]
      }, {
        title: '返程',
        tips: '长涂岛专线',
        data: [{
          name: '岱山长涂 - 岱山竹屿',
          href: 'http://ds.ziubao.com/list.jsp?sCity=长涂&eCity=竹屿',
          id: 5603,
          type: 'dsjt'
        }, {
          name: '岱山长涂 - 岱山港南',
          href: 'http://ds.ziubao.com/list.jsp?sCity=长涂&eCity=港南',
          id: 5602,
          type: 'dsjt'
        }, {
          name: '岱山长涂 - 三江',
          href: 'http://ds.ziubao.com/list.jsp?sCity=长涂&eCity=三江',
          id: 5601,
          type: 'dsjt'
        }]
      }]
    },
    'dbd': {
      bus: [...commonBusTrips],
      ship: [{
        title: '去程',
        tips: '登步岛专线',
        data: [{
          name: '沈家门墩头码头 - 登步',
          href: 'http://dt.zsghtky.com/list.jsp?sCity=墩头&eCity=登步'
        }]
      }, {
        title: '返程',
        tips: '登步岛专线',
        data: [{
          name: '登步 - 沈家门墩头码头',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=登步&eCity=墩头'
        }]
      }]
    },
    'lhd': {
      bus: [...commonBusTrips],
      ship: [{
        title: '去程',
        tips: '六横岛专线',
        data: [{
          name: '沈家门墩头码头 - 六横台门',
          href: 'http://dt.zsghtky.com/list.jsp?sCity=墩头&eCity=台门'
        }, {
          name: '沈家门墩头码头 - 六横大岙（蛟头）',
          href: 'http://dt.zsghtky.com/list.jsp?sCity=墩头&eCity=蛟头'
        }, {
          name: '长峙 - 六横大岙（蛟头）',
          href: 'http://cz.ziubao.com/list.jsp?sCity=长峙&eCity=大岙'
        }, {
          name: '定海港务码头 - 六横大岙（蛟头）',
          href: 'http://dh.zsghtky.com/list.jsp?sCity=定海&eCity=蛟头'
        }, {
          name: '宁波郭巨 - 六横沙岙',
          href: 'http://gj.ziubao.com/jh/shipy.do?startport=郭巨&endport=六横'
        }, {
          name: '虾峙 - 六横台门',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=虾峙&eCity=台门'
        }, {
          name: '虾峙 - 六横大岙',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=虾峙&eCity=大岙'
        }, {
          name: '朱家尖蜈蚣峙码头 - 六横大岙（蛟头）',
          id: 103
        }]
      }, {
        title: '返程',
        tips: '六横岛专线',
        data: [{
          name: '六横台门 - 沈家门墩头码头',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=台门&eCity=墩头'
        }, {
          name: '六横大岙 - 沈家门墩头码头',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=墩头'
        }, {
          name: '六横大岙 - 长峙',
          href: 'http://pt.ziubao.com/lhsp/listCar.jsp?sCity=大岙&eCity=长峙'
        }, {
          name: '六横大岙 - 定海港务码头',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=定海'
        }, {
          name: '六横沙岙 - 宁波郭巨',
          href: 'http://pt.ziubao.com/lhsp/jh/shipy.do?startport=沙岙&endport=郭巨'
        }, {
          name: '六横台门 - 桃花岛茅草屋',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=台门&eCity=桃花'
        }, {
          name: '六横大岙 - 桃花岛茅草屋',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=桃花'
        }, {
          name: '六横台门 - 虾峙',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=台门&eCity=虾峙'
        }, {
          name: '六横大岙 - 虾峙',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=虾峙'
        }, {
          name: '六横大岙 - 普陀山',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=普陀山'
        }, {
          name: '六横大岙 - 湖泥',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=湖泥'
        }, {
          name: '六横大岙 - 佛渡',
          href: 'http://pt.ziubao.com/lhsp/list.jsp?sCity=大岙&eCity=佛渡'
        }]
      }]
    },
    'myd': {
      bus: [...commonBusTrips],
      ship: [{
        title: '去程',
        tips: '蚂蚁岛专线',
        data: [{
          name: '沈家门墩头码头墩头 - 蚂蚁',
          href: 'http://dt.zsghtky.com/list.jsp?sCity=墩头&eCity=蚂蚁'
        }]
      }, {
        title: '返程',
        tips: '蚂蚁岛专线',
        data: [{
          name: '蚂蚁 - 沈家门墩头码头墩头',
          href: 'http://pt.ziubao.com/thsp/list.jsp?sCity=蚂蚁&eCity=墩头'
        }]
      }]
    }
  }
}

const getters = {
  travelLineList: state => state.travelLineList,
  travelLineTrips: state => state.travelLineTrips
}

const mutations = {

}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
