const test = require('node:test');
const assert = require('node:assert/strict');
const { protect } = require('../middleware/authMiddleware');

test('protect sends a single 401 response when Authorization is malformed', () => {
  const req = { headers: { authorization: 'Bearer' } };
  const res = {
    statusCode: 200,
    jsonCalls: 0,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.jsonCalls += 1;
      this.body = payload;
      return this;
    },
  };

  let nextCalled = false;
  protect(req, res, () => {
    nextCalled = true;
  });

  assert.equal(res.statusCode, 401);
  assert.equal(res.jsonCalls, 1);
  assert.equal(nextCalled, false);
  assert.deepEqual(res.body, { message: 'Not authorized, no token' });
});
