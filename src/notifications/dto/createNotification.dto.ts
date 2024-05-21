
export class CreateNotificationReceiverDto{
    receiver_identifier: string;
    type_user: string;
}

export class CreateNotificationsDto{
    entity_type: string; //(posts, service...)
    entity_id: number;
    actor_identifier: string;
    is_for_all: boolean;
    notification_type: number;
    notification_receivers: CreateNotificationReceiverDto[]
}