import { Prisma } from "@prisma/client"

export class User implements Prisma.UserCreateInput {
    ItHasIntegration: boolean
    alls?: Prisma.AllCreateNestedManyWithoutIdUserInput
    habits?: Prisma.HabitsCreateNestedManyWithoutIdUserInput
    notes?: Prisma.NotesCreateNestedManyWithoutIdUserInput
    IdUser:number
    name: string
    email: string
    password: string
}