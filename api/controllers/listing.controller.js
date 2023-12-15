import Listing from '../models/listing.model.js'

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json(listing)
        
        
    } catch (error) {
        next(error)
        
    }
}

//delete the listing

export const deleteListing = async (req, res, next) => {
    try{
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('Listing has been deleted!')

    } catch (error) {
        next(error)
    }

 }