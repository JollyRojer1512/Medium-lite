const Infrastructure = {
  Config: Symbol.for("InfrastructureConfig"),
  Db: Symbol.for("InfrastructureDb"),
  Server: Symbol.for("InfrastructureServer"),
};

const Service = {
  Main: {
    User: Symbol.for("ServiceMainUser"),
    Post: Symbol.for("ServiceMainPost"),
  },
};
const Repository = {
  Main: {
    User: Symbol.for("RepositoryMainUser"),
    Post: Symbol.for("RepositoryMainPost"),
  },
};

const Architecture = {
  Service,
  Repository,
};

export const Symbols = {
  Infrastructure,
  Architecture,
};
