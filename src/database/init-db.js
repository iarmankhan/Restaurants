export class DBInitialization {
    updateDatabaseTables(database) {
        console.log('Beginning database updates...');

        return database.transaction(this.createTables)
            .then(() => {
                // Get the current database version
            })
    }

    createTables(transaction) {
        const dropAllTables = false;
        if (dropAllTables) {
            transaction.executeSql('DROP TABLE IF EXISTS Restaurants;');
        }

        // List table
        transaction.executeSql(`
          CREATE TABLE IF NOT EXISTS Restaurants(
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT,
            phone_no NUMBER,
            description TEXT,
            rating NUMBER,
            address TEXT,
            city TEXT,
            state TEXT,
            country TEXT,
            pincode TEXT,
            long TEXT,
            lat TEXT,
            created_at TEXT,
            images TEXT
          );
        `);
    }
}
