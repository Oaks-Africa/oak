import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

@Injectable()
export class TokenGenerationService {
  generateWorkflowId(workflowName?: string): string {
    const name = workflowName ?? 'workflow-id';
    return `${name}-${uuid()}`;
  }
}
