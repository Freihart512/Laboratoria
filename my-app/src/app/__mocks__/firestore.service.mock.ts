import { DocumentData } from "@angular/fire/firestore";

export class FirestoreServiceMock {
    getUserRole(): Promise<DocumentData> {
        return Promise.resolve({role: 'chef'})}
}
