import { VercelApi } from './index';
import axios, { AxiosError } from 'axios';

const performIntegrationTests = true;

let vercel: VercelApi;
if(!performIntegrationTests){
  jest.mock('axios');
} 
const mockedAxios = axios as jest.Mocked<typeof axios>;

const tokenValue = !performIntegrationTests ?  'token-value' : process.env['VERCEL_TOKEN'];
const projectValue = !performIntegrationTests ? 'project-value' : process.env['VERCEL_PROJECT'];

const defaultResponseHeaders = {
  'x-RateLimit-Limit': 100,
  'x-RateLimit-Remaining': 99,
  'x-RateLimit-Reset': 1000
}

const defaultResponseHeadersResult = {
  'RateLimitLimit': defaultResponseHeaders['x-RateLimit-Limit'],
  'RateLimitRemaining': defaultResponseHeaders['x-RateLimit-Remaining'],
  'RateLimitReset': defaultResponseHeaders['x-RateLimit-Reset']
}

beforeEach(() => {
  vercel = new VercelApi(tokenValue,projectValue);
});

describe('When using the Vercel API', () => {

  test.skip('adding a new valid domain should succeed', async () => {
    // arrange
    const givenDomain = 'test.com';
    const expectedUrl = `https://api.vercel.com/v9/projects/${projectValue}/domains`;
    const expectedData = JSON.stringify({ name: givenDomain });
    const expectedHeader = ({headers: {Authorization: `Bearer ${tokenValue}`}});
    const resultObject =  {"apexName": "xxx.com", "createdAt": 1670991475218, "gitBranch": null, "name": "buildaperfectworld.com", "projectId": "xxxx", "redirect": null, "redirectStatusCode": null, "updatedAt": 1670991475218, "verified": true}
    const expectedDomainResponse = {success:true, result: Object.assign({},defaultResponseHeadersResult,resultObject)}; 

    if(!performIntegrationTests){
      mockedAxios.post.mockResolvedValue(
       
        Promise.resolve({
          headers: defaultResponseHeaders,
          data: resultObject
        })
      );
    }
  
    // act
    const actual = await vercel.addDomainToProject(givenDomain);
    // assert
    if(!performIntegrationTests){
      expect(mockedAxios.post).toHaveBeenCalledWith(expectedUrl,expectedData,expectedHeader);
    }
    expect(actual).toStrictEqual(expectedDomainResponse);
  });

  test('adding an invalid domain should fail', async () => {
    // arrange
    const givenDomain = 'testcom';
    const expectedUrl = `https://api.vercel.com/v9/projects/${projectValue}/domains`;
    const expectedData = JSON.stringify({ name: givenDomain });
    const expectedHeader = ({headers: {Authorization: `Bearer ${tokenValue}`}});
    const resultObject =  {"apexName": "xxx.com", "createdAt": 1670991475218, "gitBranch": null, "name": "buildaperfectworld.com", "projectId": "xxxx", "redirect": null, "redirectStatusCode": null, "updatedAt": 1670991475218, "verified": true}
    const expectedDomainResponse = {success:false, error : {code:'400', message:`The specified value '${givenDomain}' is not a fully qualified domain name`}}; 

    if(!performIntegrationTests){
      mockedAxios.post.mockResolvedValue(
        Promise.resolve({
          headers: defaultResponseHeaders,
          data: resultObject
        })
      );
    }
  
    // act
    const actual = await vercel.addDomainToProject(givenDomain);
    // assert
    if(!performIntegrationTests){
     // expect(mockedAxios.post).toHaveBeenCalledWith(expectedUrl,expectedData,expectedHeader);
    }
    expect(actual).toStrictEqual(expectedDomainResponse);
  });

  test('adding an a duplicate domain should fail', async () => {
    // arrange
    const givenDomain = 'duplicate.com';
    const expectedUrl = `https://api.vercel.com/v9/projects/${projectValue}/domains`;
    const expectedData = JSON.stringify({ name: givenDomain });
    const expectedHeader = ({headers: {Authorization: `Bearer ${tokenValue}`}});
    const resultObject =  {"apexName": "xxx.com", "createdAt": 1670991475218, "gitBranch": null, "name": "buildaperfectworld.com", "projectId": "xxxx", "redirect": null, "redirectStatusCode": null, "updatedAt": 1670991475218, "verified": true}
    const expectedDomainResponse = {success:false, error : {code:'409', message:`Domain already exists`}}; 

    if(!performIntegrationTests){
      /*
      mockedAxios.post.mockRejectedValue(
        Promise.resolve({
          headers: defaultResponseHeaders,
          status: 409,
          data: resultObject
        })
      );
      */
      const axError: AxiosError  = new Object( {
        config: {},
        isAxiosError: true,
        name: 'error axios',
        message: 'error 22',
        response: {
          status: 409,
          statusText: 'Conflict',
          headers: defaultResponseHeaders,
          config: {} ,
          data: resultObject
        }
      }) as AxiosError;
      
      mockedAxios.post.mockRejectedValue(
        //new Error('error 22')
       // Promise.resolve(axError)
        axError
      
        
      );
      
    }
  
    // act
    const actual = await vercel.addDomainToProject(givenDomain);
    // assert
    if(!performIntegrationTests){
      expect(mockedAxios.post).toHaveBeenCalledWith(expectedUrl,expectedData,expectedHeader);
    }
    expect(actual).toStrictEqual(expectedDomainResponse);
  });

  
});
