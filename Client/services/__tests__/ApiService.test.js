import { loginUserRequest } from '../ApiService';

const mockUserCredentials = { email: 'test', password: '1234' };
const mockUser = {
  id: 1,
  email: 'test',
  password: '$2b$10$nyryV.gAz0p7idARwpP4ruyGN68x0pvuvUIuKSboHx2.uMoGHZ7cO',
  updatedAt: '2020-11-20T10:20:21.136Z',
  createdAt: '2020-11-20T10:20:21.136Z',
};

describe('ApiService', () => {
  test('login request is handled succesfully', async () => {
    const res = await loginUserRequest(mockUserCredentials);
    expect(res[0]).toEqual(mockUser);
  });
});
