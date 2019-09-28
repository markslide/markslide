declare module "*.svg" {
  const value: string;
  export = value;
}

declare module "*.less" {
  const value: any;
  export = value;
}

declare const PACKAGE_VERSION: string
