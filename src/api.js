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
            pipelineId
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

  static async getAllProcessesByFieldIdAndPipelineId(
    dataField,
    dataPipelineId
  ) {
    try {
      const pipelineProcesse = await client.query(`
        {
          processesByFieldIdAndPipelineId(fieldId: ${dataField}, pipelineId: ${dataPipelineId}) {
            processId
            startTime
            endTime
            flagPublished
            comments
            productLog
            processStatus {
              name
            }
            session {
              user {
                displayName
              }
            }
            fields {
              edges {
                node {
                  id
                  displayName
                  releaseTag {
                    releaseDisplayName
                  }
                }
              }
            }
          }
        }
      `);
      return pipelineProcesse;
    } catch (e) {
      return null;
    }
  }

  static async getAllProductsByProcessId(dataProcessId) {
    try {
      const productsProcess = await client.query(`
        {
          productsByProcessId(processId: ${dataProcessId}) {
            displayName
            dataType
            table {
              dachsUrl
            }
            Class {
              displayName
              productType {
                displayName
              }
            }
          }
        }
      `);
      return productsProcess;
    } catch (e) {
      return null;
    }
  }

  static async getAllProcessComponentsByProcessId(dataProcessId) {
    try {
      const versionProcess = await client.query(`
        {
          processComponentsByProcessId(processId: ${dataProcessId}) {
            version
            module {
              displayName
              version
            }
          }
        }
      `);
      return versionProcess;
    } catch (e) {
      return null;
    }
  }

  static async getAllCommentsByProcessId(dataProcessId) {
    try {
      const commentsProcess = await client.query(`
        {
          commentsByProcessId(processId: ${dataProcessId}) {
            comments
            date
            user {
              displayName
            }
          }
        }
      `);
      return commentsProcess;
    } catch (e) {
      return null;
    }
  }
}
