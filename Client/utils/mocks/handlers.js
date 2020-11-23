import { rest } from 'msw';
import { BASE_URL } from '../../services/ApiService';

export const handlers = [
  rest.post(BASE_URL + '/login', (req, res, ctx) => {
    if (!req.body.email || !req.body.password) {
      return res(ctx.json('Username or password is incorrect', (ctx.status = 401)));
    }
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        email: 'test',
        password: '$2b$10$nyryV.gAz0p7idARwpP4ruyGN68x0pvuvUIuKSboHx2.uMoGHZ7cO',
        updatedAt: '2020-11-20T10:20:21.146Z',
        createdAt: '2020-11-20T10:20:21.146Z',
      }),
    );
  }),
];
