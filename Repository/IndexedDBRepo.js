export class IndexedDBRepo {
  static dbName = "AppDB";
  static dbVersion = 1;

  // Open connection with IndexedDB
  static openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create the `usersImg` table with `userId` as the keyPath
        if (!db.objectStoreNames.contains("usersImg")) {
          db.createObjectStore("usersImg", {
            keyPath: "userId",
          });
        }

        // Create the `productImg` table with `productId` as the keyPath
        if (!db.objectStoreNames.contains("productImg")) {
          db.createObjectStore("productImg", {
            keyPath: "productId",
          });
        }
      };

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  // Get all records in a table
  static getAll(tableName) {
    return new Promise(async (resolve, reject) => {
      const db = await this.openDB();
      const transaction = db.transaction([tableName], "readonly");
      const store = transaction.objectStore(tableName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get record by key (productId or userId)
  static getById(tableName, key) {
    return new Promise(async (resolve, reject) => {
      const db = await this.openDB();
      const transaction = db.transaction([tableName], "readonly");
      const store = transaction.objectStore(tableName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Add a new record
  static add(tableName, data) {
    return new Promise(async (resolve, reject) => {
      const db = await this.openDB();
      const transaction = db.transaction([tableName], "readwrite");
      const store = transaction.objectStore(tableName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result); // Returns the key
      request.onerror = () => reject(request.error);
    });
  }

  // Update or add a record by key (productId or userId)
  static async update(tableName, key, data) {
    try {
      // Open the database
      const db = await this.openDB();

      // Fetch the existing record in a separate transaction
      const existingRecord = await this.getById(tableName, key);

      // Open a new transaction to perform the update or add operation
      const transaction = db.transaction([tableName], "readwrite");
      const store = transaction.objectStore(tableName);

      // Update or add the record
      if (existingRecord) {
        // Update the existing record
        const updatedRecord = { ...existingRecord, ...data };
        const request = store.put(updatedRecord);

        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve(true); // Successfully updated
          request.onerror = () => reject(request.error); // Error during update
        });
      } else {
        // Add a new record if not found
        const request = store.add({ ...data, [store.keyPath]: key });

        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve(true); // Successfully added
          request.onerror = () => reject(request.error); // Error during add
        });
      }
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  // Delete a record by key (productId or userId)
  static delete(tableName, key) {
    return new Promise(async (resolve, reject) => {
      const db = await this.openDB();
      const transaction = db.transaction([tableName], "readwrite");
      const store = transaction.objectStore(tableName);
      const request = store.delete(key);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }
}
