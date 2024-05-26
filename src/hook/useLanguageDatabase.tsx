import {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';

type Language = {
  name: string;
  type: 'native' | 'learn';
};

const useLanguageDatabase = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [dbReady, setDbReady] = useState(false);

  const openCB = () => {
    // console.log('1.Database OPENED');
  };

  const db = SQLite.openDatabase(
    {name: 'LanguageDB.db', location: 'default'},
    openCB,
    error => console.log('SQLite ERROR: ', error),
  );

  // useEffect(() => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       `DROP TABLE IF EXISTS Languages;`, // Удаление таблицы, если она уже существует
  //       [],
  //       () => {
  //         console.log('Table dropped successfully');
  //         // Пересоздание таблицы с правильным PRIMARY KEY
  //         tx.executeSql(
  //           `CREATE TABLE IF NOT EXISTS Languages
  //            (
  //                type TEXT PRIMARY KEY,
  //                name TEXT NOT NULL
  //            );`,
  //           [],
  //           () => {
  //             console.log(
  //               'Table recreated successfully with correct PRIMARY KEY',
  //             );
  //             setDbReady(true);
  //           },
  //           (tx, error) =>
  //             console.log('Error creating table: ' + error.message),
  //         );
  //       },
  //       (tx, error) => console.log('Error dropping table: ' + error.message),
  //     );
  //   });
  // }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Languages
         (
             type TEXT NOT NULL,
             name TEXT NOT NULL
         );`,
        [],
        () => {
          // console.log('Table created successfully');
          setDbReady(true);
        },
        (tx, error) => console.log('Error creating table: ' + error.message),
      );
    });
  }, []);

  const clearLanguages = (type: 'native' | 'learn', callback: () => void) => {
    if (!dbReady) {
      console.log('Database not ready. Clear deferred.');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Languages WHERE type = ?;',
        [type],
        () => {
          console.log('Table cleared successfully');
          callback();
          fetchLanguages();
        },
        (_, error) => {
          console.log('ERROR clearing table:', error.message);
        },
      );
    });
  };

  // Function to clear and insert a language into the database
  const insertLanguage = (languageName: string, type: 'native' | 'learn') => {
    // console.log(
    //   `Attempting to insert or replace ${languageName} as ${type} language`,
    // );
    if (!dbReady) {
      console.log('Database not ready. Insert deferred.');
      return;
    }
    db.transaction(
      tx => {
        // console.log(
        //   `Starting transaction to replace ${type} language with ${languageName}`,
        // );
        tx.executeSql(
          'REPLACE INTO Languages (type, name) VALUES (?, ?);',
          [type, languageName],
          (_, result) => {
            // console.log(
            //   `${languageName} of type ${type} replaced successfully`,
            // );
            fetchLanguages(); // Обновляем список языков после вставки
          },
          (_, error) =>
            console.log(`Error replacing ${type} language:`, error.message),
        );
      },
      error => console.log('Transaction Error:', error.message),
      () => console.log(`Transaction completed for ${type}`),
    );
  };

  const fetchLanguages = () => {
    if (!dbReady) {
      console.log('Database not ready. Fetch deferred.');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'SELECT type, name FROM Languages;',
        [],
        (_txn, results) => {
          let fetchedLanguages: Language[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            let item = results.rows.item(i);
            fetchedLanguages.push({type: item.type, name: item.name});
          }
          setLanguages(fetchedLanguages);
          // console.log('Languages fetched:', fetchedLanguages);
        },
        (txn, error) => console.log('ERROR fetching languages:', error.message),
      );
    });
  };

  useEffect(() => {
    if (dbReady) {
      fetchLanguages();
    }
  }, [dbReady]);

  return {languages, insertLanguage, fetchLanguages, clearLanguages, dbReady};
};

export default useLanguageDatabase;
