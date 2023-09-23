import { Client } from "@libsql/client";

export default abstract class TursoRepository {
    constructor(
        protected libsqlClient: Client
    ) {
    }
}