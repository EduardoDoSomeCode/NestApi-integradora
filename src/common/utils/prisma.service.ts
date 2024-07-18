import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private _multimedia: any;
  public get multimedia(): any {
    return this._multimedia;
  }
  public set multimedia(value: any) {
    this._multimedia = value;
  }
  async onModuleInit() {
    await this.$connect();
  }
  
}