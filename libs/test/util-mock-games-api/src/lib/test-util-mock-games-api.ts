import { rest } from 'msw';
import { setupServer } from 'msw/node';
import type { Game } from '@bg-hoard/util-interface';

const withPostfix = (x: string, postfix: string): string => `${x}-${postfix}`;

const generateGame = (postfix: string): Game => ({
  id: withPostfix('mocked-id', postfix),
  name: withPostfix('mocked-name', postfix),
  image: withPostfix('mocked-image', postfix),
  description: withPostfix('mocked-description', postfix),
  price: Math.round(Math.random() * 100),
  rating: Math.random(),
});

export const handlers = [
  rest.get(`/api/games/:gameId`, (req, res, ctx) => {
    const game = generateGame('0');
    return res(ctx.status(200), ctx.json(game));
  }),

  rest.get(`/api/games`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        generateGame('0'),
        generateGame('1'),
        generateGame('2'),
        generateGame('3'),
      ])
    );
  }),
];

export const server = setupServer(...handlers);
