import { proxyActivities, sleep } from '@temporalio/workflow';

import { IUserCreatedActivity } from '../activities/user-created.activity';

import { START_TO_CLOSE_TIMEOUT } from '../../@common/constants/workflow.constant';

const { sendWelcomeMail } = proxyActivities<IUserCreatedActivity>({
  startToCloseTimeout: START_TO_CLOSE_TIMEOUT,
});

export async function UserCreated(name: string): Promise<string> {
  const res = await sendWelcomeMail(name);
  console.log(res, 'HIIII');
  await sleep(10000);
  console.log('10 sec done');
  return res;
}
