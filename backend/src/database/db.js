import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connectDataBase() {
    console.log('DATABASE_URL:', process.env.DATABASE_URL)  // Debug: verifica se variável está carregada
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
}

export default connectDataBase
