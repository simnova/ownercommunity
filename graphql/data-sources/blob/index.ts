import { Communities } from './communities';
import { Members } from './members';
import { Properties } from './properties';
import { Context } from '../../context';

// export const Blob = {
//   communityBlobAPI: new Communities({ context: Context }),
//   memberBlobAPI: new Members({ context: {} as Context }),
//   propertyBlobAPI: new Properties({ context: {} as Context }),
// };

export {
  Communities as CommunityBlobAPI,
  Members as MemberBlobAPI,
  Properties as PropertyBlobAPI,
}
