import { Notifications } from "src/notifications/entities/notifications.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NotificationType{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(() => Notifications, (notifications) => notifications.notification_type)
    notifications?: Notifications[];

}