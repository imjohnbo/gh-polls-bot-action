// @flow
const split /* : string => string[] */ = require('argv-split');
const R = require('ramda');
const getCommand = require('./utils/getCommand');
const { addPoll } = require('./utils/API');
const toMarkdown = require('./utils/toMarkdown');
const { LABEL } = require('./utils/config');

const addPollListener /* : Listener */ = async context => {
  console.log(context.payload);
  const { body, labels } = context.payload.issue || context.payload.comment;
  const [command, argument] /* : [string, string|void] */ = getCommand(body);

  console.log(command, argument);

  if (!command || !argument) return;

  try {
    // 1. Post API
    const options = split(argument);
    const id = await addPoll(options);

    // 2. Add Label
    if (!R.any(R.propEq('name', LABEL))(labels)) {
      await context.github.issues.addLabels(context.issue({ labels: [LABEL] }));
    }

    // 3. Update Issue Body
    const markdown = toMarkdown(id)(options);
    console.log(JSON.stringify(context.payload));

    if (
      context.payload.comment &&
      typeof context.payload.comment.id !== 'undefined'
    ) {
      await context.github.issues.updateComment({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        comment_id: context.payload.comment.id,
        body: body.replace(command, markdown),
      });
    } else {
      await context.github.issues.update({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        issue_number: context.payload.issue.number,
        body: body.replace(command, markdown),
      });
    }
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
};

module.exports = {
  addPollListener,
};
