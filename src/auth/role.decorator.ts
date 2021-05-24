import { SetMetadata } from "@nestjs/common";
import { UserRole } from 'src/users/entities/user.entity';

export type AllowedRoles = keyof typeof UserRole | 'Any';
// UserRole(ENUM) 의 typeof 는 object,
// object 의 keyof 는 enum(=object)의 공개프로퍼티 이름의 합집합을 반환 (ex. 'Owner' | 'Client' | 'Delivery')

export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);