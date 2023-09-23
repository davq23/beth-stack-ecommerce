import Database from "bun:sqlite";

export default abstract class SQLiteRepository
{
    constructor(
        protected db: Database
    ) {
    }
}