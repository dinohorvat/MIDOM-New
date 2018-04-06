import {StudyOwnerModel} from './consultation-request.model';

export class StudyModel{
    id: number;
    name: string;
    creationDate: number;
    ownerId: number;
    open: boolean;
    studyOwner: StudyOwnerModel;
}