export const data = [
  {
    type: 'taxi',
    offers:[
      {
        id: 1,
        title: 'Add luggage 1.1',
        price: 30
      },
      {
        id: 2,
        title: 'Switch to comfort class 1.2',
        price: 100
      },
      {
        id: 3,
        title: 'Add meal 1.3',
        price: 15
      }
    ]
  },
  {
    type: 'bus',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 2.1',
        price: 344
      },
      {
        id: 2,
        title: 'Add luggage 2.2',
        price: 15
      },
      {
        id: 3,
        title: 'Add meal 2.3',
        price: 90
      },
      {
        id: 4,
        title: 'Add meal 2.4',
        price: 16
      }

    ]
  },
  {
    type: 'train',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 3.1',
        price: 56
      },
      {
        id: 2,
        title: 'Add luggage 3.2',
        price: 76
      },
      {
        id: 3,
        title: 'Add meal 3.3',
        price: 1
      },
      {
        id: 3,
        title: 'Add meal 3.4',
        price: 9
      }
    ]
  },
  {
    type: 'ship',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 4.1',
        price: 678
      },
      {
        id: 2,
        title: 'Add luggage 4.2',
        price: 111
      },
      {
        id: 3,
        title: 'Add meal 4.3',
        price: 909
      },
      {
        id: 3,
        title: 'Add meal 4.4',
        price: 965
      }
    ]
  },
  {
    type: 'drive',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 5.1',
        price: 569
      },
      {
        id: 2,
        title: 'Add luggage 5.2',
        price: 55
      },
    ]
  },
  {
    type: 'flight',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 6.1',
        price: 66
      },
    ]
  },
  {
    type: 'check-in',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 6.2',
        price: 135
      },
    ]
  },
  {
    type: 'sightseeing',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 7.1',
        price: 886
      },
      {
        id: 2,
        title: 'Add luggage 7.2',
        price: 351
      },
      {
        id: 3,
        title: 'Add meal 7.3',
        price: 531
      }
    ]
  },
  {
    type: 'restaurant',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 8.1',
        price: 321
      },
      {
        id: 2,
        title: 'Add luggage 8.2',
        price: 21
      },
    ]
  },
];
export const destinations = [
  {
    id: 1,
    description: 'Order Uber +€  ',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'forest'
      }
    ]
  },
  {
    id: 2,
    description: 'Add luggage +€  50 Switch to comfort +€  ',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163318',
        description: 'Hedgehog',
      }
    ]
  },
  {
    id: 3,
    description: 'Offers: Rent a car +€  ',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163319',
        description: 'mountain'
      }
    ]
  }
];
export const mockPoints = [
  {
    id: 1,
    type: 'bus',
    offers: [0, 1],
    destination: 2,
    basePrice: 100,
    dateFrom: '2019-07-18T10:23:56.845Z',
    dateTo: '2019-07-11T15:32:13.375Z'
  },
  {
    id: 2,
    type: 'train',
    offers: [1, 2],
    destination: 1,
    basePrice: 999,
    dateFrom: '2019-07-18T19:45:56.845Z',
    dateTo: '2019-07-11T11:54:14.375Z'
  },
  {
    id: 3,
    type: 'ship',
    offers: [0,2,3],
    destination: 1,
    basePrice: 666,
    dateFrom: '2019-07-18T12:44:56.845Z',
    dateTo: '2019-07-11T13:12:08.375Z'
  },
  {
    id: 4,
    type: 'drive',
    offers: [0, 3],
    destination: 2,
    basePrice: 323,
    dateFrom: '2019-07-18T14:09:56.845Z',
    dateTo: '2019-07-11T15:01:13.375Z'
  },
  {
    id: 5,
    type: 'flight',
    offers: [0,1],
    destination: 3,
    basePrice: 232,
    dateFrom: '2019-07-19T16:58:56.845Z',
    dateTo: '2019-07-11T17:41:13.375Z'
  },
  {
    id: 6,
    type: 'check-in',
    offers: [1],
    destination: 1,
    basePrice: 101,
    dateFrom: '2019-07-19T18:34:56.845Z',
    dateTo: '2019-07-11T19:10:13.375Z'
  },
  {
    id: 7,
    type: 'sightseeing',
    offers: [],
    destination: 3,
    basePrice: 202,
    dateFrom: '2019-07-19T13:06:56.845Z',
    dateTo: '2019-07-11T12:12:12.375Z'
  },
  {
    id: 8,
    type: 'restaurant',
    offers: [0,1],
    destination: 2,
    basePrice: 631,
    dateFrom: '2019-07-20T10:11:56.845Z',
    dateTo: '2019-07-11T12:13:13.375Z'
  },
  {
    id: 9,
    type: 'taxi',
    offers: [],
    destination: 1,
    basePrice: 291,
    dateFrom: '2019-07-20T19:10:56.845Z',
    dateTo: '2019-07-11T21:20:00.375Z'
  },
  {
    id: 10,
    type: 'taxi',
    offers: [1, 2, 3],
    destination: 1,
    basePrice: 291,
    dateFrom: '2019-07-20T19:10:56.845Z',
    dateTo: '2019-07-11T21:20:00.375Z'
  }
];
