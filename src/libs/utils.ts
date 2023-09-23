import { Context } from "elysia";


export const transformURLEncodedToJSObject = ({ body, headers }: Context) => {
    if (headers['content-type'] === 'application/x-www-form-urlencoded') {
        const objectBody = body as any;

        let matches: string[] | null = null;

        for (const key in objectBody) {
            if (matches = key.match(/^(.*)\[\]\[(.*)\]/)) {
                const [,arrayName, propName] = matches;

                if (!Object.prototype.hasOwnProperty.call(objectBody, arrayName)) {
                    if (objectBody[key] instanceof Array) {
                        objectBody[arrayName] = objectBody[key].map((value: any) => {
                            const object: any = {};
                            object[propName] = value;
    
                            return object;
                        });
                    } else {
                        objectBody[arrayName] = [{}];
                        objectBody[arrayName][0][propName] = objectBody[key];
                    }
                } else {
                    if (objectBody[key] instanceof Array) {
                        for (let index = 0; index < objectBody[key].length; index++) {
                            if (objectBody[arrayName].length <= index) {
                                objectBody[arrayName][index] = {};
                            }
                            const element = objectBody[arrayName][index];

                            element[propName] = objectBody[key][index];
                        }
                    } else {
                        objectBody[arrayName][0][propName] = objectBody[key];
                    }
                }

                delete objectBody[key];
            }
        }
    }
}