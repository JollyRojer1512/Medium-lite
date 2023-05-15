const Infrastructure = {
  App: Symbol.for("InfrastructureApp"),
  Config: Symbol.for("InfrastructureConfig"),
  Db: Symbol.for("InfrastructureDb"),
  Server: Symbol.for("InfrastructureServer"),
};

const Service = {
  Main: {
    User: Symbol.for("ArchitectureServiceMainUser"),
    Post: Symbol.for("ArchitectureServiceMainPost"),
  },
};
const Repository = {
  Main: {
    User: Symbol.for("ArchitectureRepositoryMainUser"),
    Post: Symbol.for("ArchitectureRepositoryMainPost"),
  },
};

const Architecture = {
  Service,
  Repository,
};

const Module = {
  User: Symbol.for("ApiModuleUser"),
};

const Api = {
  Module,
};

export const Symbols = {
  Infrastructure,
  Architecture,
  Api,
};
