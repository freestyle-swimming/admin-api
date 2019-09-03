import { Application } from 'egg';
interface ValidatorObjectIdRuleType {
  required?: boolean;
  default?: string;
}

// 验证ObjectId类型
function checkObjectId(_rule: ValidatorObjectIdRuleType, value: string) {
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  if (!checkForHexRegExp.test(value)) {
    return 'should be an ObjectId';
  }
}

export default (app: Application) => {
  app.validator.addRule('objectId', checkObjectId);
};
