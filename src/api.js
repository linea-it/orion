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

  static async getAllParameterStimation() {
    try {
      const parameterStimation = await client.query(`
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
      return parameterStimation;
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
}
