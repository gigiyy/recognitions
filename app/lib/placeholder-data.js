const employees = [
  {
    id: '066D8FA5-8A79-4B09-91E7-8DFCD36B49C2',
    name: 'Guixin Zhu',
    email: 'guixin@sample.io',
    image_url: '/employees/guixin.png',
  },
  {
    id: '2620C77F-D02B-42A4-8185-873913803035',
    name: 'Chie Zhu',
    email: 'chie@sample.io',
    image_url: '/employees/chie.png',
  },
];

const recognitions = [
  {
    id: '26B45E2D-45BB-4B0F-92A2-D11553BD18E7',
    receiverId: employees[1].id,
    valueId: 'grow',
    comment: 'good job!',
    date: '2024-05-01',
  },
];

module.exports = {
  employees,
  recognitions,
};
