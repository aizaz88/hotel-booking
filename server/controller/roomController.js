import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

//API to create new Room for the Hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) return res.json({ success: false, message: "no Hotel found" });

    //upload image to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });
    // Wait for all image upload
    const images = await Promise.all(uploadImages);

    Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });
    res.json({ success: true, message: "Room created succesfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to get all Rooms
export const getRooms = async (req, res) => {};

//API to get all Rooms for specific Hotel
export const getOwnerRooms = async (req, res) => {};

//API to toggle availibility of a Room
export const toggleRoomAvailability = async (req, res) => {};
