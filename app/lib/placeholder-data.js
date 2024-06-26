const employees = [
  {
    id: '066D8FA5-8A79-4B09-91E7-8DFCD36B49C2',
    name: 'Guixin Zhu',
    email: 'guixin@sample.io',
    manager_id: '32C9BBC4-8AE0-4659-A62E-0AC8D9F1ABE1',
    image_url: '/employees/guixin.png',
  },
  {
    id: '2620C77F-D02B-42A4-8185-873913803035',
    name: 'Chie Zhu',
    email: 'chie@sample.io',
    manager_id: '32C9BBC4-8AE0-4659-A62E-0AC8D9F1ABE1',
    image_url: '/employees/chie.png',
  },
  {
    id: '32C9BBC4-8AE0-4659-A62E-0AC8D9F1ABE1',
    name: 'Vercel NextJs',
    email: 'vercel@sample.io',
    manager_id: '32C9BBC4-8AE0-4659-A62E-0AC8D9F1ABE1',
    image_url: '/employees/vercel.png',
  },
  {
    id: '47DB6BCB-4157-4B42-984A-3DC98F561970',
    name: 'recognition app',
    email: 'recog@sample.io',
    manager_id: '32C9BBC4-8AE0-4659-A62E-0AC8D9F1ABE1',
    image_url: '/employees/recon.png',
  },
];

const recognitions = [
  {
    id: '26B45E2D-45BB-4B0F-92A2-D11553BD18E7',
    receiverId: employees[1].id,
    senderId: employees[3].id,
    valueId: 'grow',
    comment: 'good job!',
    date: '2024-05-01',
  },
];

module.exports = {
  employees,
  recognitions,
};
