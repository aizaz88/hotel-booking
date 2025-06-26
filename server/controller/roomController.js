import { populate } from "dotenv";
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
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to get all Rooms for specific Hotel
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//API to toggle availibility of a Room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    res.json({
      success: true,
      message: "room Availability Updated successfully ",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
