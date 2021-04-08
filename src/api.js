import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? window._env_.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL;

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
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllFieldsTag(dataRelease) {
    try {
      let fieldsTag = [];
      if (dataRelease === '0') {
        fieldsTag = await client.query(`
        {
          fieldsList {
            edges {
              node {
                id
                displayName
                fieldId
              }
            }
          }
        }
      `);

        fieldsTag = {
          fieldsByTagId: fieldsTag.fieldsList.edges.map(field => ({
            id: field.node.id,
            displayName: field.node.displayName,
            fieldId: field.node.fieldId,
          })),
        };
      } else {
        fieldsTag = await client.query(`
          {
            fieldsByTagId(tagId: ${dataRelease}) {
              id
              displayName
              fieldId
            }
          }
        `);
      }
      fieldsTag.fieldsByTagId.sort(function compare(a, b) {
        if (a.displayName > b.displayName) return 1;
        if (b.displayName > a.displayName) return -1;
        return 0;
      });
      return fieldsTag;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
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
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllPipelinesByFieldIdAndStageId({
    tagId,
    dataField,
    pipelineFilter,
    pipelineStatusFilter,
    dataStage,
  }) {
    try {
      let pipelinesStageId = [];

      if (Number(pipelineFilter) === 0) {
        const allPipelines = await client.query(`
          {
            pipelinesByStageId(${
              dataStage !== '0' ? 'stageId:' + dataStage : ''
            }) {
              edges {
                node {
                  pipelineDisplayName
                  pipelineName
                  pipelineId
                  pipelineStatusId
                }
              }
            }
          }
        `);

        const pipelinesWithRuns = await client.query(`
          {
            pipelinesByStageIdAndTagIdAndFieldId(
              ${tagId !== '0' ? 'tagId:' + tagId + ',' : ''}
              ${dataField !== '0' ? 'fieldId:' + dataField + ',' : ''}
              ${dataStage !== '0' ? 'stageId:' + dataStage : ''}) {
              edges {
                node {
                  pipelineDisplayName
                  pipelineName
                  pipelineId
                  pipelineStatusId
                  processCount
                  lastProcessId
                  lastProcessStartTime
                  lastProcessEndTime
                  lastProcessStatus
                }
              }
            }
          }
        `);

        pipelinesStageId = allPipelines.pipelinesByStageId.edges.map(
          pipeline => {
            const samePipeline = pipelinesWithRuns.pipelinesByStageIdAndTagIdAndFieldId.edges.filter(
              el => el.node.pipelineId === pipeline.node.pipelineId
            );

            if (samePipeline.length > 0) {
              return {
                displayName: pipeline.node.pipelineDisplayName,
                name: pipeline.node.pipelineName,
                pipelineId: pipeline.node.pipelineId,
                pipelineStatusId: pipeline.node.pipelineStatusId,
                process: {
                  processCount: samePipeline[0].node.processCount,
                  lastProcessId: samePipeline[0].node.lastProcessId,
                  startTime: samePipeline[0].node.lastProcessStartTime,
                  endTime: samePipeline[0].node.lastProcessEndTime,
                  status: samePipeline[0].node.lastProcessStatus,
                },
              };
            }
            return {
              displayName: pipeline.node.pipelineDisplayName,
              name: pipeline.node.pipelineName,
              pipelineId: pipeline.node.pipelineId,
              pipelineStatusId: pipeline.node.pipelineStatusId,
              process: {
                processCount: 0,
                lastProcessId: null,
                startTime: null,
                endTime: null,
                status: null,
              },
            };
          }
        );
      } else if (Number(pipelineFilter) === 2) {
        const allPipelines = await client.query(`
          {
            pipelinesByStageId(${
              dataStage !== '0' ? 'stageId:' + dataStage : ''
            }) {
              edges {
                node {
                  pipelineDisplayName
                  pipelineName
                  pipelineId
                  pipelineStatusId
                }
              }
            }
          }
        `);

        const pipelinesWithRuns = await client.query(`
          {
            pipelinesByStageIdAndTagIdAndFieldId(
              ${tagId !== '0' ? 'tagId:' + tagId + ',' : ''}
              ${dataField !== '0' ? 'fieldId:' + dataField + ',' : ''}
              ${dataStage !== '0' ? 'stageId:' + dataStage : ''}) {
              edges {
                node {
                  pipelineDisplayName
                  pipelineName
                  pipelineId
                  pipelineStatusId
                  processCount
                  lastProcessId
                  lastProcessStartTime
                  lastProcessEndTime
                  lastProcessStatus
                }
              }
            }
          }
        `);

        pipelinesStageId = allPipelines.pipelinesByStageId.edges
          .map(pipeline => {
            const samePipeline = pipelinesWithRuns.pipelinesByStageIdAndTagIdAndFieldId.edges.filter(
              el => el.node.pipelineId === pipeline.node.pipelineId
            );

            if (samePipeline.length === 0) {
              return {
                displayName: pipeline.node.pipelineDisplayName,
                name: pipeline.node.pipelineName,
                pipelineId: pipeline.node.pipelineId,
                pipelineStatusId: pipeline.node.pipelineStatusId,
                process: {
                  processCount: 0,
                  lastProcessId: null,
                  startTime: null,
                  endTime: null,
                  status: null,
                },
              };
            }
          })
          .filter(pipeline => !!pipeline);
      } else {
        const query = await client.query(`
          {
            pipelinesByStageIdAndTagIdAndFieldId(
              ${tagId !== '0' ? 'tagId:' + tagId + ',' : ''}
              ${dataField !== '0' ? 'fieldId:' + dataField + ',' : ''}
              ${dataStage !== '0' ? 'stageId:' + dataStage : ''}) {
              edges {
                node {
                  pipelineDisplayName
                  pipelineName
                  pipelineId
                  pipelineStatusId
                  processCount
                  lastProcessId
                  lastProcessStartTime
                  lastProcessEndTime
                  lastProcessStatus
                }
              }
            }
          }
        `);

        pipelinesStageId = query.pipelinesByStageIdAndTagIdAndFieldId.edges.map(
          pipeline => ({
            displayName: pipeline.node.pipelineDisplayName,
            name: pipeline.node.pipelineName,
            pipelineId: pipeline.node.pipelineId,
            pipelineStatusId: pipeline.node.pipelineStatusId,
            process: {
              processCount: pipeline.node.processCount,
              lastProcessId: pipeline.node.lastProcessId,
              startTime: pipeline.node.lastProcessStartTime,
              endTime: pipeline.node.lastProcessEndTime,
              status: pipeline.node.lastProcessStatus,
            },
          })
        );
      }
      const statusId = Number(pipelineStatusFilter);
      if (statusId !== 0) {
        pipelinesStageId = pipelinesStageId.filter(
          pipelineStage => statusId === pipelineStage.pipelineStatusId
        );
      }

      return pipelinesStageId;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllProcessesByFieldIdAndPipelineId(
    tagId,
    dataField,
    dataPipelineId
  ) {
    try {
      const pipelineProcesses = await client.query(`
        {
          processesByTagIdAndFieldIdAndPipelineId(
            ${tagId !== '0' ? 'tagId:' + tagId + ',' : ''}
            ${dataField !== '0' ? 'fieldId:' + dataField + ',' : ''}
            pipelineId: ${dataPipelineId}) {
            processId
            startTime
            endTime
            flagPublished
            flagRemoved
            publishedDate
            comments
            productLog
            products{
              totalCount
            }
            savedProcesses {
              savedDate
              savedDateEnd
            }
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
      // #FIXME: Alterar ordenação para EndPoint;
      return pipelineProcesses;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
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
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllProcessComponentsByProcessId(dataProcessId) {
    try {
      const versionProcess = await client.query(`
        {
          processComponentsByProcessId(processId: ${dataProcessId}) {
            processId
            used_version: version
            process {
              process_name: name
              processPipeline {
                edges {
                  node {
                    process_version: version
                    pipeline {
                      version
                      versionDate
                    }
                  }
                }
              }
            }
            module {
              displayName
              last_version: version
              versionDate
            }
          }
        }
      `);
      return versionProcess;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
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
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }

  static async getAllProcessByProcessId(dataProcessId) {
    try {
      const processByProcessId = await client.query(`
        {
          processByProcessId(processId: ${dataProcessId}) {
            name
            processId
            productLog
            comments
            inputs {
              edges {
                node {
                  process {
                    name
                    processId
                    productLog
                    comments
                    inputs {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `);
      return processByProcessId;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }
}
