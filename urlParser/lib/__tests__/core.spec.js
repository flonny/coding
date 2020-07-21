import { parse } from '../core'

describe('core/parse', () => {
  it('exposes parse as a function', function () {
    assume(parse).is.a('function');
  });
})