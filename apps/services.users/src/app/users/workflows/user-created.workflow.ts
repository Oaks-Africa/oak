import { proxyActivities, sleep } from '@temporalio/workflow';

import { IUserCreatedActivity } from '../activities/user-created.activity';

import { START_TO_CLOSE_TIMEOUT } from '../../@common/constants/workflow.constant';

import { User } from '../entities/user.entity';

const { emitUserCreatedEvent } = proxyActivities<IUserCreatedActivity>({
  startToCloseTimeout: START_TO_CLOSE_TIMEOUT,
});

export async function UserCreated(user: User): Promise<void> {
  await emitUserCreatedEvent(user);
  await sleep(10000);
  console.log('10 sec done');
}
