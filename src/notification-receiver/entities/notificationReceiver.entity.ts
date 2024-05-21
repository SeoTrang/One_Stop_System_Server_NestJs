import { Notifications } from "src/notifications/entities/notifications.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class NotificationReceiver{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: false})
    is_read: boolean;

    @Column()
    type_user: string;

    @Column()
    receiver_identifier: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Notifications, (notification) => notification.notification_receivers)
    notification: Notifications;
}