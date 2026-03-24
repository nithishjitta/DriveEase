const BASE_URL = "http://localhost:5000"; // change if needed

// Import testimonial images
import testimonial_image_1 from "../assets/testimonial_image_1.png";
import testimonial_image_2 from "../assets/testimonial_image_2.png";
import user_profile from "../assets/user_profile.png";

function seedRating(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return (4.2 + ((Math.abs(h) % 8) / 10)).toFixed(1);
}

function seedReviews(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 17 + name.charCodeAt(i)) & 0xffffffff;
  }
  return 40 + (Math.abs(h) % 260);
}

const BADGES_BY_TYPE = {
  "Luxury": "Premium",
  "Luxury MPV": "Premium",
  "Electric": "Eco",
  "SUV": "Popular",
  "Sedan": "Best Value",
  "Hatchback": "Budget Pick",
  "MPV": "Family",
};

const FEATURES_BY_TYPE = {
  "Luxury": ["Leather Seats", "Sunroof", "360° Camera", "Apple CarPlay", "Android Auto"],
  "Luxury MPV": ["Captain Seats", "Sunroof", "Rear Entertainment", "Ambient Lighting"],
  "Electric": ["Zero Emissions", "Fast Charging", "Autopilot Mode"],
  "SUV": ["All-Wheel Drive", "Sunroof", "Rear Camera", "Cruise Control"],
  "Sedan": ["Apple CarPlay", "Rear Camera", "Cruise Control"],
  "Hatchback": ["Touchscreen", "Keyless Entry"],
  "MPV": ["Captain Seats", "Sliding Doors"],
};

const SPECS_EXTRA = {
  "Petrol": { Transmission: "Automatic", Mileage: "14 km/l", Power: "120 hp" },
  "Diesel": { Transmission: "Automatic", Mileage: "18 km/l", Power: "140 hp" },
  "Hybrid": { Transmission: "Automatic", Mileage: "22 km/l", Power: "175 hp" },
  "Electric": { Transmission: "Auto (EV)", Mileage: "400 km/charge", Power: "280 hp" },
};

const SAMPLE_REVIEWS = [
  { id: 1, name: "Priya S.", rating: 5, text: "Great experience! The car was clean and well-maintained. Highly recommend for long drives.", avatar: testimonial_image_1, date: "2 weeks ago" },
  { id: 2, name: "Ravi M.", rating: 5, text: "Smooth ride and excellent service. The booking process was seamless.", avatar: user_profile, date: "1 month ago" },
  { id: 3, name: "Sneha T.", rating: 4, text: "Very good car overall. Minor issues with the AC but nothing major.", avatar: testimonial_image_2, date: "3 weeks ago" },
];

export function enrichCar(apiCar, index) {
  // ✅ ONLY API images (no fallback)
  const images = (apiCar.images || []).map(img =>
    img.startsWith("http") ? img : `${BASE_URL}/${img}`
  );

  const image = images[0] || ""; // main image

  const rating = apiCar.rating ?? parseFloat(seedRating(apiCar.name));
  const reviews = seedReviews(apiCar.name);
  const badge = BADGES_BY_TYPE[apiCar.type] ?? "Available";
  const extraSpec = SPECS_EXTRA[apiCar.fuelType] ?? SPECS_EXTRA["Petrol"];
  const features = FEATURES_BY_TYPE[apiCar.type] ?? [];

  return {
    id: apiCar.id ?? String(index + 1),
    name: apiCar.name,
    city: apiCar.city,
    price: apiCar.pricePerDay,
    type: apiCar.type,
    category: apiCar.type,
    seats: apiCar.seats,
    fuelType: apiCar.fuelType,

    // ✅ ONLY API images
    image,
    images,

    rating,
    reviews,
    badge,
    year: 2023 + (index % 2),
    location: `${apiCar.city}, India`,
    transmission: extraSpec.Transmission,

    specs: {
      Seats: String(apiCar.seats),
      Fuel: apiCar.fuelType,
      Type: apiCar.type,
      Transmission: extraSpec.Transmission,
      Mileage: extraSpec.Mileage,
      Power: extraSpec.Power,
      City: apiCar.city,
      "Price/Day": `₹${apiCar.pricePerDay.toLocaleString()}`,
    },

    features,

    host: {
      name: "DriveEase Host",
      avatar: `https://i.pravatar.cc/80?img=${(index % 70) + 1}`,
      trips: 50 + ((index * 7) % 300),
      responseRate: "98%",
    },

    reviews_list: SAMPLE_REVIEWS,
  };
}