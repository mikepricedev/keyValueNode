import {BaseKeyNode, KeyNodeError} from 'key-node';

const VALUE:unique symbol = Symbol();
const DOC:unique symbol = Symbol();

export class BaseKeyValueNode<Tself extends BaseKeyValueNode = any> extends BaseKeyNode<Tself>{

  private readonly [VALUE]:any;
  private readonly [DOC]:object | any[];

  constructor(key:string, parent:Tself)
  constructor(key:string, parent:Map<string, Tself>, rootDoc:object | any[])
  constructor(key:string, parent:Tself | Map<string, Tself>, rootDoc?:object | any[]){

    super(key, parent);

    const doc = this.IS_ROOT_KEY ? rootDoc : (<BaseKeyValueNode>parent).value;

    if(typeof doc !== 'object' || doc === null){

      let docStr:string;
      switch (typeof doc) {
        case "object":
          docStr = "null";
          break;
        case "undefined":
          docStr = "undefined";
          break;
        default:
          try {
            docStr = doc.toString();
            break;
          } catch {}
          try {
            docStr = `${doc}`;
            break;
          } catch {}
          docStr = typeof doc;
      }

      throw new KeyNodeError(`Cannot read property '${key}' of ${docStr}.`, this);

    }

    this[VALUE] = doc[this.key]
    this[DOC] = doc;

  }

  //Accessors
  get key():string{

    return this.toString();

  }

  get value():any {

    return this[VALUE];

  }

  get doc():object | any[]{

    return this[DOC];

  };

}

export class KeyValueNode extends BaseKeyValueNode<KeyValueNode> {}