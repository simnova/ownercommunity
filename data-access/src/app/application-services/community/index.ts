import { AppContext } from '../../init/app-context-builder';
import { CommunityApiV1, CommunityApiV1Impl } from './v1';

export interface CommunityApi { 
  v1: CommunityApiV1,
}

export class CommunityApiImpl implements CommunityApi {
    v1: CommunityApiV1;

  constructor(context: AppContext) {
    this.v1 = new CommunityApiV1Impl(context);
  }

}
