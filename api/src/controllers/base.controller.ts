import { Router } from 'express';

// TODO: Create `BaseController` abstract class for other controllers to inherit from
export abstract class BaseController {
  name: string;
  router: Router = Router();

  protected constructor(name: string) {
    this.name = name;
    this.register();
  }

  /** Register the controller and attach to an Express Application instance */
  abstract register(): Router;
}
