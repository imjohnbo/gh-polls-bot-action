// @flow
const { addPollListener } = require('./listener');

module.exports = (robot /* : Robot */) => {
  robot.on(
    [
      'issue_comment.created',
      'issue_comment.edited',
      'issues.opened',
      'issues.edited',
    ],
    addPollListener,
  );
};
