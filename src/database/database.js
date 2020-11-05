import SQLite from 'react-native-sqlite-storage';
import {DBInitialization} from './init-db';
import {AppState} from 'react-native';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

let databaseInstance;

async function getRestaurant(id) {
    return getDatabase()
        .then(db =>
                db.executeSql('SELECT * FROM Restaurants WHERE id = ?;', [id]))
        .then(([results]) => {
            if (results === undefined) {
                return [];
            }
            return results.rows.item(0);
        });
}

async function getAllRestaurants(offset = 0) {
    console.log('[db] Fetching restaurants from the db...');
    return getDatabase()
        .then((db) =>
            // Get all the lists, ordered by newest lists first
            db.executeSql('SELECT * FROM Restaurants ORDER BY id DESC LIMIT 8 OFFSET ?;', [offset]),
        ).then(([results]) => {
            if (results === undefined) {
                return [];
            }
            const count = results.rows.length;
            const restaurants = [];
            for (let i = 0; i < count; i++) {
                const row = results.rows.item(i);
                const {title, id, phone_no, description, rating, address, city, state, country, pincode, long, lat, created_at, images} = row;
                restaurants.push({
                    id,
                    title,
                    phone_no,
                    description,
                    rating,
                    address,
                    city,
                    state,
                    country,
                    pincode,
                    long,
                    lat,
                    created_at,
                    images,
                });
            }
            return restaurants;
        });
}

async function getCount() {
    return getDatabase()
        .then(db => db.executeSql("SELECT COUNT(*) as count FROM Restaurants"))
        .then(([results]) => {
            if (results === undefined) {
                return 0;
            }

            return results.rows.item(0);
        })
}

async function addRestaurants(data = []) {
    data.forEach(d => {
        const images = [];
        d.img.forEach(img => images.push(img.image));

        getDatabase()
            .then(db => db.executeSql(
                `INSERT INTO Restaurants 
                (title, phone_no, description, rating, address, city, state, country, pincode, long, lat, created_at, images) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [d.title, d.phone_no, d.description, d.rating, d.address, d.city, d.state, d.country, d.pincode, d.long, d.lat, d.create_at, JSON.stringify(images)],
            ))
            .then(([results]) => {
                const {insertId} = results;
                console.log(`[db] Added restaurants: ${insertId}`);
            });
    });
}

async function getDatabase() {
    if (databaseInstance !== undefined) {
        return Promise.resolve(databaseInstance);
    }
    // otherwise: open the database first
    return open();
}

// Open a connection to the database
async function open() {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    if (databaseInstance) {
        console.log('[db] Database is already open: returning the existing instance');
        return databaseInstance;
    }

    // Otherwise, create a new instance
    const db = await SQLite.openDatabase({
        name: 'RestaurantDB',
        location: 'default',
    });
    console.log('[db] Database open!');

    // Perform any database initialization or updates, if needed
    const databaseInitialization = new DBInitialization();
    await databaseInitialization.updateDatabaseTables(db);

    databaseInstance = db;
    return db;
}

// Close the connection to the database
async function close() {
    if (databaseInstance === undefined) {
        console.log('[db] No need to close DB again - it\'s already closed');
        return;
    }
    const status = await databaseInstance.close();
    console.log('[db] Database closed.');
    databaseInstance = undefined;
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = 'active';
console.log('[db] Adding listener to handle app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState) {
    if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        // App has moved from the foreground into the background (or become inactive)
        console.log('[db] App has gone to the background - closing DB connection.');
        close();
    }
    appState = nextAppState;
}

export const sqliteDatabase = {addRestaurants, getRestaurant, getAllRestaurants, getCount};
