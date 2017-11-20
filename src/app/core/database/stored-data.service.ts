import {Observable} from 'rxjs/Observable';
import {NgSerializerService} from '@kaiu/ng-serializer';
import {DataModel} from '../../model/list/data-model';
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {DocumentChangeAction} from 'angularfire2/firestore/interfaces';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';
import {Subject} from 'rxjs/Subject';

export abstract class StoredDataService<T extends DataModel> {

    private optimisticData: { [index: string]: Subject<T> } = {};

    constructor(protected afdb: AngularFirestore, protected serializer: NgSerializerService) {
    }

    protected abstract getBaseUri(params?: any): Observable<string>;

    protected abstract getClass(): any;

    /**
     * Gets one object from database as T instance
     *
     * @param uid
     * @param params
     * @returns {Observable<R>}
     */
    public get(uid: string, params?: any): Observable<T> {
        return this.getBaseUri(params).switchMap(uri => {
            // Prepare optimistic state if it's not ready.
            this.optimisticData[uid] = this.optimisticData[uid] || new Subject<T>();
            return Observable.merge(this.optimisticData[uid], this.oneRef(uri, uid)
                .snapshotChanges()
                .map(doc => {
                    if (!doc.payload.exists) {
                        throw new Error('Not found');
                    }
                    const res: T = this.serializer.deserialize<T>(doc.payload.data(), this.getClass());
                    res.$key = doc.payload.id;
                    return <T>res;
                }));
        }).debounceTime(5);
    }

    /**
     * Gets the list-details of items in this base uri.
     *
     * @returns {Observable<R>}
     */
    public getAll(params?: any): Observable<T[]> {
        return this.getBaseUri(params).switchMap(uri => {
            return this.listRef(uri)
                .snapshotChanges()
                .map((snap: DocumentChangeAction[]) => {
                    const obj = snap.map(snapRow => snapRow.payload.doc.data());
                    const res: T[] = this.serializer.deserialize<T>(obj, [this.getClass()]);
                    res.forEach((row, index) => {
                        row.$key = snap[index].payload.doc.id;
                    });
                    return res;
                });
        });
    }

    /**
     * Pushes an item in the database list-details.
     *
     * @param item
     * @param params
     * @returns {firebase.database.ThenableReference}
     */
    public push(item: T, params?: any): Promise<string> {
        return new Promise<any>(resolve => {
            return this.getBaseUri(params).first().subscribe(uri => {
                return this.listRef(`${uri}`).add(<T>item.getData()).then(ref => resolve(ref.id));
            });
        });
    }

    /**
     * Updates an item with the given uid.
     *
     * @param uid
     * @param value
     * @param params
     * @returns {firebase.Promise<void>}
     */
    public update(uid: string, value: T, params?: any): Promise<void> {
        return new Promise<void>(resolve => {
            return this.getBaseUri(params).switchMap(uri => {
                this.nextOptimistic(uid, value);
                delete value.$key;
                return Observable.fromPromise(this.oneRef(uri, uid).set(<T>value.getData()));
            }).first().subscribe(resolve);
        });
    }

    /**
     * removes the given item in the current reference.
     *
     * @param uid
     * @param params
     * @returns {firebase.Promise<void>}
     */
    public remove(uid: string, params?: any): Promise<void> {
        return new Promise<void>(resolve => {
            return this.getBaseUri(params).first().subscribe(uri => {
                return this.oneRef(uri, uid).delete().then(resolve);
            });
        });
    }

    private nextOptimistic(uid: string, value: T): void {
        // Because we're using firestore, we can be quite optimistic regarding the update of the data,
        // this represents a huge performance gain.
        if (this.optimisticData[uid] !== undefined) {
            this.optimisticData[uid].next(value);
        }
    }

    private listRef(uri: string): AngularFirestoreCollection<T> {
        return this.afdb.collection<T>(uri);
    }

    private oneRef(uri: string, uid: string): AngularFirestoreDocument<T> {
        return this.afdb.doc<T>(`${uri}/${uid}`);
    }
}
