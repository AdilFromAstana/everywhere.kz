export interface Event {
    id: string;
    code: string;
    name: string;
    description: string;
    provider: number;
    externalId: string;
    statusId: number;
    serviceFee: number;
    minCost: number;
    ageLimit: number;
    leisureCategoryId: number;
    cityId: number;
    cityName: string;
    beginDate: string;
    cityTimeZone: number;
    cityTimeZoneName: string;
    previewFileUrl: string;
    posterFileUrl: string;
    eventumOne: any;
    createdAt: string;
    updatedAt: string;
}
