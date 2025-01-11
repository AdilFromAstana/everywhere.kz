import { UUID } from 'crypto';

import Dropdown from './Dropdown';

export interface IMyAnnouncement {
    id: UUID;
    title: string;
    description: string;
    authorId: UUID;
    statusCode: string;
    adPlacementCode: string;
    AdPlacement: Dropdown;
    announcementTypeCode: string;
    AnnouncementType: Dropdown;
    businessFieldCode?: string;
    BusinessField?: Dropdown;
    price: number;
    cityCode: string;
    City: Dropdown;
    contactPhoneNumberViewCount: number;
    announcementViewCount: number;
    AnnouncementViewCounts: any[];
    AnnouncementPhoneViewCounts: any[];
    createdAt?: Date;
    updatedAt?: Date;
}
