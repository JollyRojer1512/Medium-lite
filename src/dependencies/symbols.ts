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
  Main: {
    User: Symbol.for("ApiModuleMainUser"),
  },
};
const Usecase = {
  Collection: {
    Main: {
      User: Symbol.for("ApiUsecaseCollectionMainUser"),
    },
  },
  Single: {
    Main: {
      User: {
        GetOne: Symbol.for("ApiUsecaseSingleMainUserGetOne"),
      },
    },
  },
};

const Api = {
  Module,
  Usecase,
};

export const Symbols = {
  Infrastructure,
  Architecture,
  Api,
};
