import { Vercel } from './index';
import axios from 'axios';

let vercel: Vercel;
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const tokenValue = 'token-value';  
const projectValue = 'project-value';


beforeEach(() => {
  vercel = new Vercel(tokenValue,projectValue);
});

describe('Vercel', () => {

  test('addDomainToProject', async () => {
    // arrange
    const givenDomain = 'test-domain';
    const expectedUrl = `https://api.vercel.com/v9/projects/${projectValue}/domains`;
    const expectedData = JSON.stringify({ name: givenDomain });
    const expectedHeader = ({headers: {Authorization: `Bearer ${tokenValue}`}});
    const resultObject = {key: "Zm9vYmFy", token: "test"};


    // actual example from vercel
    // {"apexName": "buildaperfectworld.com", "createdAt": 1670991475218, "gitBranch": null, "name": "buildaperfectworld.com", "projectId": "prj_TQYcHARH5YxnuBWoc34KfHwJDZSL", "redirect": null, "redirectStatusCode": null, "updatedAt": 1670991475218, "verified": true}

    mockedAxios.post.mockResolvedValue(
      Promise.resolve({
        data: resultObject
      })
    );
  
    
    // act
    const actual = await vercel.addDomainToProject(givenDomain);
    // assert
    expect(mockedAxios.post).toHaveBeenCalledWith(expectedUrl,expectedData,expectedHeader);
    expect(actual).toBe(resultObject);
  });

  
});


