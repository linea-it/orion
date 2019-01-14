import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const apiUrl =
  process.env.NODE_ENV !== 'development'
    ? window.origin + '/api/graphql'
    : process.env.REACT_APP_API;
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

  static async getAllFieldsTag(dataRelease) {
    try {
      const fieldsTag = await client.query(`
        {
          fieldsByTagId(tagId: ${dataRelease}) {
            id
            displayName
            fieldId
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

  static async getAllPipelinesByFieldIdAndStageId(dataField, dataStage) {
    try {
      const pipelinesStageId = await client.query(`
        {
          pipelinesByFieldIdAndStageId(fieldId: ${dataField}, stageId: ${dataStage}) {
            displayName
            process {
              processCount
              lastProcessId
              startTime
              endTime
              status
            }
          }
        }
      `);
      return pipelinesStageId;
    } catch (e) {
      return null;
    }
  }
}
