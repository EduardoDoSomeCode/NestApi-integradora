import { Prisma } from "@prisma/client"

export class Users implements Prisma.UserCreateInput {
    ItHasIntegration: boolean
    alls?: Prisma.AllCreateNestedManyWithoutIdUserInput
    habits?: Prisma.HabitsCreateNestedManyWithoutIdUserInput
    notes?: Prisma.NotesCreateNestedManyWithoutIdUserInput
    name: string
    email: string
    password: string
}