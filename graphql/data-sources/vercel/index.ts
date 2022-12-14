import { Communities } from './communities';
import { Services } from '../../../infrastructure/services';

const services = new Services();

export const Vercel = {
    communityVercelApi: new Communities(services.vercel),
}
