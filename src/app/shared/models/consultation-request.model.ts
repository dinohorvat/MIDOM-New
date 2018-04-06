export class ConsultationRequestModel{
    id: number;
    creationTime: number;
    acceptanceTime: string;
    studyOwner: number;
    status: string;
    study: number;
    owner: StudyOwnerModel
}
export class StudyOwnerModel{
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    organisation: string;
    location: string;
    telephon: string;
    email: string;
    otherContact: string;
    description: string
}