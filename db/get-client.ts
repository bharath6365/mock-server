import { getLogger } from './../utils/logger';
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient


const logger = getLogger();

export function getDbClient() {
  if (!prisma) {
    const url = process.env.DATABASE_URL;

    if (!url || url === '') {
      logger.error('DATABASE_URL not passed as environment variable')
    }
    logger.info(`Creating prisma client`);
    prisma = new PrismaClient({
      datasources: {
        db: {
          url,
        },
      }
    })
  }
  return prisma
}