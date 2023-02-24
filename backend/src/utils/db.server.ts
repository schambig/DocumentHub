import { PrismaClient } from "@prisma/client";

// Use a private constructor and a private static property to create a Singleton
class Singleton {
  private static instance: PrismaClient;

  private constructor() {
    // Initialize PrismaClient
    Singleton.instance = new PrismaClient();
  }

  public static getInstance(): PrismaClient {
    if (!Singleton.instance) {
      new Singleton();
    }

    return Singleton.instance;
  }
}

const db = Singleton.getInstance();

export { db };
