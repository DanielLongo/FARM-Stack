import motor.motor_asyncio
import os
from dotenv import load_dotenv
load_dotenv()

db = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URL"))[os.getenv("MONGO_DB")]