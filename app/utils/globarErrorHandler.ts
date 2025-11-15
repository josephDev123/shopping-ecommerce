export interface GlobalErrorHandlerType {
  msg: string;
  name: string;
  code: number;
  operational: boolean;
}

export class GlobalErrorHandler extends Error {
  code;
  // msg;
  operational;
  constructor(msg: string, name: string, code: string, operational: boolean) {
    super(msg);
    this.name = name;
    this.code = code;
    // this.msg = msg;
    this.operational = operational;
  }
}
