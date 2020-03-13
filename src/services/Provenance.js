import Centaurus from './api';

export default class Provenance {
  constructor(id, name, process, product, comments, items) {
    this.id = id;
    this.name = name;
    this.process = process;
    this.product = product;
    this.comments = comments;
    this.items = items;
  }

  findProvenance(id) {
    if (this.id === id) {
      return this.getChild();
    } else {
      for (var item in this.items) {
        const founded = this.items[item].findProvenance(id);
        if (founded) return founded;
      }
      return false;
    }
  }

  async getChild() {
    const inputs = await Centaurus.getAllProcessByProcessId(this.process);
    if (
      inputs &&
      inputs.processByProcessId.inputs &&
      inputs.processByProcessId.inputs.edges
    ) {
      this.items =
        inputs.processByProcessId.inputs.edges.length > 0
          ? inputs.processByProcessId.inputs.edges.map(
              e =>
                new Provenance(
                  Math.random()
                    .toString(36)
                    .substr(2, 9),
                  e.node.process.name,
                  e.node.process.processId,
                  e.node.process.productLog,
                  e.node.process.comments,
                  e.node.process.inputs.edges.length > 0 ? [] : undefined
                )
            )
          : undefined;
    } else {
      return [];
    }
  }
}
