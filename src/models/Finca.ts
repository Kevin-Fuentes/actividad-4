import { Schema, model } from 'mongoose'


const FincaShema = new Schema({
     nombre: { type: String, required: true },
          capataz:{ type: String, required: true },
          numH:{ type: Number, required: true },
})

export default model('Finca',FincaShema)