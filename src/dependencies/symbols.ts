const Infrastructure = {
  Config: Symbol.for("InfrastructureConfig"),
  Db: Symbol.for("InfrastructureDb"),
};

const Service = {
  Main: {
    User: Symbol.for("ServiceMainUser"),
  },
};
const Repository = {
  Main: {
    User: Symbol.for("RepositoryMainUser"),
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
