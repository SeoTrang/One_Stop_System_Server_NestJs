import { NotificationReceiver } from "src/notification-receiver/entities/notificationReceiver.entity";
import { NotificationType } from "src/notification-type/entities/notificationType.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Notifications{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entity_type: string;

    @Column()
    entity_id: number;

    @Column()
    actor_identifier: string;

    @Column()
    is_for_all: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => NotificationType, (notificationType) => notificationType.notifications)
    notification_type: NotificationType;

    @OneToMany(() => NotificationReceiver, (notificationReceiver) => notificationReceiver.notification)
    notification_receivers: NotificationReceiver[];

}