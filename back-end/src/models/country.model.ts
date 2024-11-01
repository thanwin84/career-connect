import mongoose, { mongo } from "mongoose";

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
})

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    cities: [citySchema]
},{timestamps: true})

export const Country = mongoose.model('Country', countrySchema)