const Infrastructure = {
  App: Symbol.for("InfrastructureApp"),
  Config: Symbol.for("InfrastructureConfig"),
  Db: Symbol.for("InfrastructureDb"),
  Server: Symbol.for("InfrastructureServer"),
};

const Service = {
  Main: {
    Crypt: Symbol.for("ArchitectureServiceMainCrypt"),
    Post: Symbol.for("ArchitectureServiceMainPost"),
    Review: Symbol.for("ArchitectureServiceMainReview"),
    User: Symbol.for("ArchitectureServiceMainUser"),
  },
};
const Repository = {
  Main: {
    Post: Symbol.for("ArchitectureRepositoryMainPost"),
    Review: Symbol.for("ArchitectureRepositoryMainReview"),
    User: Symbol.for("ArchitectureRepositoryMainUser"),
  },
};

const Architecture = {
  Service,
  Repository,
};

const Module = {
  Main: {
    Post: Symbol.for("ApiModuleMainPost"),
    User: Symbol.for("ApiModuleMainUser"),
  },
};
const Usecase = {
  Collection: {
    Main: {
      Post: Symbol.for("ApiUsecaseCollectionMainPost"),
      User: Symbol.for("ApiUsecaseCollectionMainUser"),
    },
  },
  Single: {
    Main: {
      Post: {
        CreateOne: Symbol.for("ApiUsecaseSingleMainPostCreateOne"),
        GetOne: Symbol.for("ApiUsecaseSingleMainPostGetOne"),
        GetAllByUser: Symbol.for("ApiUsecaseSingleMainPostGetAllByUser"),
        GetUsersPerPage: Symbol.for("ApiUsecaseSingleMainPostGetUsersPerPage"),
        RateOne: Symbol.for("ApiUsecaseSingleMainPostRateOne"),
      },
      User: {
        CreateOne: Symbol.for("ApiUsecaseSingleMainUserCreateOne"),
        GetOne: Symbol.for("ApiUsecaseSingleMainUserGetOne"),
        GetPage: Symbol.for("ApiUsecaseSingleMainUserGetPage"),
        Login: Symbol.for("ApiUsecaseSingleMainUserLogin"),
      },
    },
  },
};

const Presenter = {
  Collection: {
    Main: {
      Post: Symbol.for("ApiPresenterCollectionMainPost"),
      User: Symbol.for("ApiPresenterCollectionMainUser"),
    },
  },
  Single: {
    Main: {
      Post: {
        GetOne: Symbol.for("ApiPresenterSingleMainPostGetOne"),
        GetMany: Symbol.for("ApiPresenterSingleMainPostGetMany"),
      },
      User: {
        GetOne: Symbol.for("ApiPresenterSingleMainUserGetOne"),
        GetMany: Symbol.for("ApiPresenterSingleMainUserGetMany"),
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
