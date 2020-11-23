import { rest } from 'msw';
import { BASE_URL } from '../../services/ApiService';

export const handlers = [
  rest.post(BASE_URL + '/register', (req, res, ctx) => {
    // Persist user's authentication in the session
    // sessionStorage.setItem('is-authenticated', true);
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        email: 'test',
        password: '$2b$10$nyryV.gAz0p7idARwpP4ruyGN68x0pvuvUIuKSboHx2.uMoGHZ7cO',
        updatedAt: '2020-11-20T10:20:21.136Z',
        createdAt: '2020-11-20T10:20:21.136Z',
      }),
    );
  }),

  //   rest.get('/user', (req, res, ctx) => {
  //     // Check if the user is authenticated in this session

  //     const isAuthenticated = sessionStorage.getItem('is-authenticated');

  //     if (!isAuthenticated) {
  //       // If not authenticated, respond with a 403 error

  //       return res(
  //         ctx.status(403),

  //         ctx.json({
  //           errorMessage: 'Not authorized',
  //         }),
  //       );
  //     }

  //     // If authenticated, return a mocked user details

  //     return res(
  //       ctx.status(200),

  //       ctx.json({
  //         username: 'admin',
  //       }),
  //     );
  // }),
];
