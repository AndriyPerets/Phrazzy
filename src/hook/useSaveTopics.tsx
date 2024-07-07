import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'AppDB.db';

function openDB() {
  return SQLite.openDatabase({
    name: database_name,
    location: 'default',
    createFromLocation: '~www/AppDB.db',
  }).then(db => {
    // First, ensure the ButtonParams table exists
    const createButtonParams = db.executeSql(`
      CREATE TABLE IF NOT EXISTS ButtonParams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        isFullWidth INTEGER,
        backgroundColor TEXT,
        width INTEGER
      );
    `);
    // Then, ensure the Settings table exists
    const createSettings = db.executeSql(`
      CREATE TABLE IF NOT EXISTS Settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic TEXT
      );
    `);
    // Wait for both table creation operations to complete
    return Promise.all([createButtonParams, createSettings]).then(() => db);
  });
}

export const useSQLiteStorage = () => {
  const getTopic = async () => {
    try {
      const db = await openDB();
      const results = await db.executeSql(
        'SELECT topic FROM Settings WHERE id=1',
      );
      if (results[0].rows.length > 0) {
        return results[0].rows.item(0).topic;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const setTopic = async (topic: string) => {
    try {
      const db = await openDB();
      await db.executeSql('UPDATE Settings SET topic = ? WHERE id=1', [topic]);
    } catch (error) {
      console.error(error);
    }
  };

  const getButtonParams = async () => {
    try {
      const db = await openDB();
      const results = await db.executeSql('SELECT * FROM ButtonParams');
      const items = [];
      for (let i = 0; i < results[0].rows.length; i++) {
        items.push(results[0].rows.item(i));
      }
      return items;
    } catch (error) {
      // console.error(error);
      return [];
    }
  };

  const saveButtonParams = async (buttonParams: any[]) => {
    try {
      const db = await openDB();
      await db.executeSql('DELETE FROM ButtonParams');
      const placeholders = buttonParams.map(_ => '(?, ?, ?, ?)').join(', ');
      const values: any[] | undefined = [];
      buttonParams.forEach(param => {
        values.push(
          param.title,
          param.isFullWidth ? 1 : 0,
          param.backgroundColor,
          param.width,
        );
      });
      await db.executeSql(
        `INSERT INTO ButtonParams (title, isFullWidth, backgroundColor, width) VALUES ${placeholders}`,
        values,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getTopic,
    setTopic,
    getButtonParams,
    saveButtonParams,
  };
};
