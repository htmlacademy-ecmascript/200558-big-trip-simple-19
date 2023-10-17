function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const array = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'sightseeing', 'restaurant'];
function getRandomType() {
  return array[getRandom(0, array.length - 1)];
}
function getRandomPrice() {
  return getRandom(10, 1000);
}
let fromHour,
  fromMin,
  toHour,
  toMin,
  fromDay,
  toDay;
function numberFormat(number) {
  return number < 10 ? `0${number}` : number;
}
function getRandomDateFrom() {
  fromDay = getRandom(1, 31);
  fromHour = getRandom(10, 15);
  fromMin = getRandom(0, 60);
  const stringDay = numberFormat(fromDay),
    stringHour = numberFormat(fromHour),
    stringMin = numberFormat(fromMin);
  return `2019-07-${stringDay}T${stringHour}:${stringMin}:56.845Z`;
}
function getRandomDateFromTo() {
  toHour = fromHour + getRandom(1, 10);
  toMin = fromMin + getRandom(5, 60);
  toDay = fromDay + getRandom(1, 2);
  const date = new Date(2023, 3, toDay, toHour, toMin);
  toDay = date.getDate();
  toHour = date.getHours();
  toMin = date.getMinutes();
  toDay = numberFormat(toDay);
  toHour = numberFormat(toHour);
  toMin = numberFormat(toMin);

  return `2019-07-${toDay}T${toHour}:${toMin}:56.845Z`;
}
export const data = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Add luggage 1.1',
      },
      {
        id: 2,
        title: 'Switch to comfort class 1.2',
      },
      {
        id: 3,
        title: 'Add meal 1.3',
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class 2.1',
      },
      {
        id: 2,
        title: 'Add luggage 2.2',
      },
      {
        id: 3,
        title: 'Add meal 2.3',
      },
      {
        id: 4,
        title: 'Add meal 2.4',
      }

    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class 3.1',
      },
      {
        id: 2,
        title: 'Add luggage 3.2',
      },
      {
        id: 3,
        title: 'Add meal 3.3',
      },
      {
        id: 3,
        title: 'Add meal 3.4',
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class 4.1',
      },
      {
        id: 2,
        title: 'Add luggage 4.2',
      },
      {
        id: 3,
        title: 'Add meal 4.3',
      },
      {
        id: 3,
        title: 'Add meal 4.4',
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class 5.1',

      },
      {
        id: 2,
        title: 'Add luggage 5.2',
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class 6.1',
      },
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class 6.2',
      },
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class 7.1',
      },
      {
        id: 2,
        title: 'Add luggage 7.2',
      },
      {
        id: 3,
        title: 'Add meal 7.3',
      }
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
        src: 'https://www.ejin.ru/wp-content/uploads/2017/09/7-667.jpg',
        description: 'forest'
      },
      {
        src: 'https://w.forfun.com/fetch/ca/ca3c70c3111dde977a73ebf659a9ccc2.jpeg',
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
        src: 'https://w.forfun.com/fetch/74/74739e1770f31cdbfdde99cc0b2925d3.jpeg',
        description: 'Hedgehog',
      },
      {
        src: 'https://w.forfun.com/fetch/3e/3e6d5f96bb0a293b7eb3866e91f2fd32.jpeg',
        description: 'forest'
      },
      {
        src: 'https://imgfon.ru/Img/Crop/2560x2048/Animals/begut-skachut-tri-loshadi-koni.jpg?img.1',
        description: 'forest'
      },
      {
        src: 'https://w.forfun.com/fetch/a7/a70c2b75fc3c0f687a01be077434956d.jpeg',
        description: 'forest'
      },
      {
        src: 'http://s1.1zoom.ru/b5050/595/342546-svetik_2048x1152.jpg',
        description: 'forest'
      },
      {
        src: 'https://mobimg.b-cdn.net/v3/fetch/32/32270e41db5c3c8763937d843a9d1fc8.jpeg',
        description: 'forest'
      }
    ]
  },
  {
    id: 3,
    description: 'Offers: Rent a car +€  ',
    name: 'astadam',
    pictures: [
      {
        src: 'https://i.pinimg.com/originals/21/25/ee/2125ee74769913bb6793f249d4a8cded.jpg',
        description: 'mountain'
      }
    ]
  }
];
export const mockPoints = [
  {
    id: 1,
    offers: [0, 1],
    destination: 2,
  },
  {
    id: 2,
    offers: [1, 2],
    destination: 1,
  },
  {
    id: 3,
    offers: [0, 2, 3],
    destination: 1,
  },
  {
    id: 4,
    offers: [0, 3],
    destination: 2,
  },
  {
    id: 5,
    offers: [0, 1],
    destination: 3,
  },
  {
    id: 6,
    offers: [1],
    destination: 1,
  },
  {
    id: 7,
    offers: [],
    destination: 3,
  },
  {
    id: 8,
    offers: [0, 1],
    destination: 2,
  },
  {
    id: 9,
    offers: [],
    destination: 1,
  },
  {
    id: 10,
    offers: [1, 2, 3],
    destination: 1,
  }
];
class Model {
  constructor(points) {
    this.points = [...points];
  }

  set add(value) {
    this.points.push(value);
  }

  get getPoints() {
    return this.points;
  }

  getPoint(i) {
    return this.points[i];
  }

  setPoint(i, value) {
    this.points[i] = value;
  }

  set setPoints(points) {
    this.points = [...points];
  }

  remove(id) {
    const index = this.points.findIndex((point) => point.id === id);
    this.point.splice(index, 1);
  }
}

for (const mockPoint of mockPoints) {
  mockPoint.type = getRandomType();
  mockPoint.basePrice = getRandomPrice();
  mockPoint.dateFrom = getRandomDateFrom();
  mockPoint.dateTo = getRandomDateFromTo();
}
mockPoints.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
export const model = new Model(mockPoints);
for (const da of data) {
  for (const offers of da.offers) {
    offers.price = getRandomPrice();
  }
}
