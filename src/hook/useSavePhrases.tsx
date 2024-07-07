import {useEffect, useState} from 'react';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

const useSavePhrases = () => {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      try {
        const dbInstance = await SQLite.openDatabase({
          name: 'Languages.db',
          location: 'default',
        });
        setDb(dbInstance);
        setIsDbReady(true);
        dbInstance.transaction(tx => {
          // Create the table if it does not exist
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Phrases (' +
              'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
              'topic TEXT, ' +
              'phrase TEXT);',
            [],
            () => {
              console.log('Table created or already exists.');
            },
            error => {
              console.error(
                'Failed to create table or check its existence:',
                error,
              );
            },
          );
        });
      } catch (error) {
        console.error('Error opening database:', error);
      }
    };

    initDb();
    return () => {
      db?.close().catch(error => {
        console.error('Error closing the database:', error);
      });
    };
  }, []);

  const saveEdit = async (
    selectedTopic: string,
    phrase: string,
    newPhrase: string,
  ) => {
    if (!db) {
      console.error('Database not initialized1');
      return;
    }

    const safeTopic = selectedTopic?.trim();
    const safePhrase = phrase?.trim();
    const safeNewPhrase = newPhrase?.trim();

    console.log(
      `Attempting to update phrase from '${safePhrase}' to '${safeNewPhrase}' for topic '${safeTopic}'`,
    );

    if (!safeTopic || !safePhrase || !safeNewPhrase) {
      console.error('Invalid input parameters', {
        selectedTopic,
        phrase,
        newPhrase,
      });
      return;
    }

    const updateSQL = `UPDATE Phrases SET phrase = ? WHERE topic = ? AND phrase = ?`;

    db.transaction(tx => {
      // Debug: Log existing entries before updating
      tx.executeSql(
        'SELECT * FROM Phrases WHERE topic = ? AND phrase = ?',
        [safeTopic, safePhrase],
        (_, selectResult) => {
          console.log('Existing entries:', selectResult.rows.raw());
          if (selectResult.rows.length === 0) {
            console.error('No matching entries found to update');
          }
        },
        error => {
          console.error('Error querying existing entries:', error);
        },
      );

      tx.executeSql(
        updateSQL,
        [safeNewPhrase, safeTopic, safePhrase],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Phrase updated successfully:', result.rowsAffected);
          } else {
            console.error('No phrase was updated - possibly no match found');
          }
        },
        error => {
          console.error('Failed to update phrase in database:', error);
        },
      );

      // Debug: Log entries after update attempt
      tx.executeSql(
        'SELECT * FROM Phrases WHERE topic = ?',
        [safeTopic],
        (_, selectResult) => {
          console.log('Entries after update attempt:', selectResult.rows.raw());
        },
      );
    });
  };

  const addPhrase = (topic: string, newPhrase: string) => {
    if (!db) {
      console.error('Database not initialized2');
      return;
    }

    const insertSQL = `INSERT INTO Phrases (topic, phrase) VALUES (?, ?);`;
    db.transaction(tx => {
      tx.executeSql(
        insertSQL,
        [topic.trim(), newPhrase.trim()],
        (_, result) => {
          console.log('Phrase added successfully', result.insertId);
        },
        error => console.error('Failed to add new phrase:', error),
      );
    });
  };

  const deletePhrase = (topic: string, phrase: string) => {
    if (!db) {
      console.error('Database not initialized3');
      return;
    }

    const deleteSQL = `DELETE FROM Phrases WHERE topic = ? AND phrase = ?;`;
    db.transaction(tx => {
      tx.executeSql(
        deleteSQL,
        [topic.trim(), phrase.trim()],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Phrase deleted successfully');
          } else {
            console.error('No phrase was deleted - possibly no match found');
          }
        },
        error => {
          console.error('Failed to delete phrase:', error);
        },
      );
    });
  };

  const getPhrasesByTopic = (
    topic: string,
    callback: (phrases: string[]) => void,
  ) => {
    if (!db) {
      console.error('Database not initialized4');
      return;
    }

    const selectSQL = `SELECT phrase FROM Phrases WHERE topic = ?;`;
    db.transaction(tx => {
      tx.executeSql(
        selectSQL,
        [topic.trim()],
        (_, result) => {
          const phrases = [];
          for (let i = 0; i < result.rows.length; i++) {
            phrases.push(result.rows.item(i).phrase);
          }
          callback(phrases);
        },
        error => {
          console.error('Failed to fetch phrases:', error);
        },
      );
    });
  };

  return {saveEdit, addPhrase, deletePhrase, getPhrasesByTopic, isDbReady};
};

export default useSavePhrases;
