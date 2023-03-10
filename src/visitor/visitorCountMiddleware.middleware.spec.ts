import { VisitorCouMiddleware } from './visitorCountMiddleware.middleware';

describe('VisitorMiddleware', () => {
  it('should be defined', () => {
    expect(new VisitorMiddleware()).toBeDefined();
  });
});
