import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const apiUrl = process.env.REACT_APP_API_URL;
const client = new Lokka({
  transport: new Transport(apiUrl),
});

export default class Centaurus {
  static async getAllReleaseTag() {
    try {
      const releaseTag = await client.query(`
        {
          releaseTagList {
            edges {
              node {
                id
                releaseDisplayName
                tagId               
              }
            }
          }
        }
      `);
      return releaseTag;
    } catch (e) {
      return null;
    }
  }

  static async getAllFieldsTag(selectRelease) {
    try {
      const fieldsTag = await client.query(`
        {
          fieldsByTagId(tagId: ${selectRelease}) {
            id
            displayName
            releaseTagId
          }
        }
      `);
      return fieldsTag;
    } catch (e) {
      return null;
    }
  }

  static async getAllPipelineStageList() {
    try {
      const pipelineStage = await client.query(`
        {
          pipelineStageList {
            edges {
              node {
                id
                displayName
                pipelineStageId
                level              
              }
            }
          }
        }
      `);
      return pipelineStage;
    } catch (e) {
      return null;
    }
  }

  static async getAllPipelinesByStageId(selectFields) {
    try {
      const pipelinesStageId = await client.query(`
        {
          pipelinesByStageId(stageId: ${selectFields}) {
            displayName
          }
        }
      `);
      return pipelinesStageId;
    } catch (e) {
      return null;
    }
  }
}
