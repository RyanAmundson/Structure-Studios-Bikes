import { Injectable, inject } from '@angular/core';
import { DatabaseReference, getDatabase, list, listVal, object, ref, remove, set, stateChanges, update } from '@angular/fire/database';
import { DataSnapshot, get, limitToFirst, orderByChild, orderByKey, push, query, startAfter, startAt } from 'firebase/database';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService<T> {
  private database = getDatabase();
  project = environment.firebaseMonolithSubProject;

  // Create a new item
  createItem(path: string, data: T, database = this.database, project = this.project): Promise<void> {
    const reference: DatabaseReference = ref(database, project + '/' + path);
    const newRef = push(reference);
    return set(newRef, { ...data, timestamp: Date.now(), id: newRef.key, });
  }

  // Read an item
  readOne(path: string, database = this.database, project = this.project) {
    return get(query(ref(this.database, project + '/' + path)));
  }

  // Update an item
  updateItem(path: string, data: Partial<T>, database = this.database, project = this.project): Promise<void> {
    const reference: DatabaseReference = ref(database, project + '/' + path);
    return update(reference, data);
  }

  // Delete an item
  deleteItem(path: string, database = this.database, project = this.project): Promise<void> {
    const reference: DatabaseReference = ref(database, project + '/' + path);
    return remove(reference);
  }

  deleteAll() {
    const reference: DatabaseReference = ref(this.database, this.project);
    return remove(reference);
  }

  // Read a list of items with pagination
  readPage(path: string, offset: number, count: number, database = this.database, project = this.project): Observable<T[]> {
    const listReference = ref(database, project + '/' + path);
    return listVal(
      query(listReference, startAfter(count * offset), limitToFirst(offset), orderByChild('timestamp'))
    );
  }

  watchPage(path: string, offset: number, count: number, database = this.database, project = this.project): Observable<any[]> {
    const listReference = ref(database, project + '/' + path);
    return list(
      query(listReference, startAfter(count * offset), limitToFirst(offset), orderByChild('timestamp'))
    );
  }

  watchStateChanges(path: string, offset: number, count: number, database = this.database, project = this.project): Observable<any> {
    const listReference = ref(database, project + '/' + path);
    return stateChanges(
      query(listReference, startAfter(count * offset), limitToFirst(offset), orderByChild('timestamp'))
    );
  }
}
