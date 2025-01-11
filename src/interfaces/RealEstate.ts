import { UUID } from 'crypto';

import Dropdown from './Dropdown';

export interface IMyRealEstate {
    id: UUID;
    title: string;
    description: string;
    authorId: UUID;
    statusCode: string;
    realEstateTypeCode: string;
    RealEstateType: Dropdown;
    price: number;
    cityCode: string;
    City: Dropdown;
    contactPhoneNumberViewCount: number;
    realEstateViewCount: number;
    RealEstateViewCounts: any[];
    RealEstatePhoneViewCounts: any[];
    createdAt?: Date;
    updatedAt?: Date;
}
