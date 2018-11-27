import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const apiUrl = process.env.REACT_APP_API_URL;
const client = new Lokka({
  transport: new Transport(apiUrl),
});

export default class Centaurus {
  static async getAllDataInstalation() {
    try {
      const dataInstalation = await client.query(`
        {
          pipelinesModulesList {
            edges {
              node {
                pipeline {
                  displayName
                }
                module {
                  name
                  version
                  user {
                    displayName
                  }
                  moduleId
                  displayName
                }
              }
            }
          }
        }
      `);
      return dataInstalation;
    } catch (e) {
      return null;
    }
  }

  static async getAllDataPreparation() {
    try {
      const dataPreparation = await client.query(`
        {
          pipelinesModulesList {
            edges {
              node {
                pipeline {
                  displayName
                }
                module {
                  name
                  version
                  user {
                    displayName
                  }
                  moduleId
                  displayName
                }
              }
            }
          }
        }
      `);
      return dataPreparation;
    } catch (e) {
      return null;
    }
  }

  static async getAllScienceReadyCatalogs() {
    try {
      const scienceReadyCatalogs = await client.query(`
        {
          pipelinesModulesList {
            edges {
              node {
                pipeline {
                  displayName
                }
                module {
                  name
                  version
                  user {
                    displayName
                  }
                  moduleId
                  displayName
                }
              }
            }
          }
        }
      `);
      return scienceReadyCatalogs;
    } catch (e) {
      return null;
    }
  }

  static async getAllScienceWorkflows() {
    try {
      const scienceWorkflows = await client.query(`
        {
          pipelinesModulesList {
            edges {
              node {
                pipeline {
                  displayName
                }
                module {
                  name
                  version
                  user {
                    displayName
                  }
                  moduleId
                  displayName
                }
              }
            }
          }
        }
      `);
      return scienceWorkflows;
    } catch (e) {
      return null;
    }
  }

  static async getAllSpecialSamples() {
    try {
      const specialSamples = await client.query(`
        {
          pipelinesModulesList {
            edges {
              node {
                pipeline {
                  displayName
                }
                module {
                  name
                  version
                  user {
                    displayName
                  }
                  moduleId
                  displayName
                }
              }
            }
          }
        }
      `);
      return specialSamples;
    } catch (e) {
      return null;
    }
  }

  static async getAllUtilities() {
    try {
      const utilities = await client.query(`
        {
          pipelinesModulesList {
            edges {
              node {
                pipeline {
                  displayName
                }
                module {
                  name
                  version
                  user {
                    displayName
                  }
                  moduleId
                  displayName
                }
              }
            }
          }
        }
      `);
      return utilities;
    } catch (e) {
      return null;
    }
  }

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
