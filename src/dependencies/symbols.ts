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
    Post: Symbol.for("ApiModuleMainPost"),
  },
};
const Usecase = {
  Collection: {
    Main: {
      User: Symbol.for("ApiUsecaseCollectionMainUser"),
      Post: Symbol.for("ApiUsecaseCollectionMainPost"),
    },
  },
  Single: {
    Main: {
      User: {
        CreateOne: Symbol.for("ApiUsecaseSingleMainUserCreateOne"),
        GetOne: Symbol.for("ApiUsecaseSingleMainUserGetOne"),
      },
      Post: {
        CreateOne: Symbol.for("ApiUsecaseSingleMainPostCreateOne"),
        GetOne: Symbol.for("ApiUsecaseSingleMainPostGetOne"),
        GetAllByUser: Symbol.for("ApiUsecaseSingleMainPostGetAllByUser"),
      },
    },
  },
};

const Presenter = {
  Collection: {
    Main: {
      User: Symbol.for("ApiPresenterCollectionMainUser"),
      Post: Symbol.for("ApiPresenterCollectionMainPost"),
    },
  },
  Single: {
    Main: {
      User: {
        GetOne: Symbol.for("ApiPresenterSingleMainUserGetOne"),
      },
      Post: {
        GetOne: Symbol.for("ApiPresenterSingleMainPostGetOne"),
        GetMany: Symbol.for("ApiPresenterSingleMainPostGetMany"),
      },
    },
  },
};

const Api = {
  Module,
  Usecase,
  Presenter,
};

export const Symbols = {
  Infrastructure,
  Architecture,
  Api,
};
