export const up = (queryInterface, Sequelize) =>
  queryInterface.bulkInsert(
    'users',
    [
      {
        id: 'db7b7393-e136-4727-bd22-1ef307244de9',
        email: 'admin@gmail.com',
        username: 'myusername',
        password:
          '$2a$10$9Nlgh1Kxat6d2bkVk5zfcOFerh/I7S0G268uwNxsem1LSTB18QU6O',
        createdAt: '2020-05-07 09:37:12.509+02',
        updatedAt: '2020-05-08 09:37:12.509+02',
      },
    ],
    {}
  );
export const down = (queryInterface, Sequelize) =>
  queryInterface.bulkDelete('users', null, {});
