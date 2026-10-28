
const movies = [
  {
    id: "1",
    title: "Jailer 2",
    genre: "Action, Thriller",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Now Showing",
    releaseDate: "2026-10-15",
    poster: "https://placehold.co/500x750/171717/FFFFFF?text=Jailer+2",
    description:
      "Rajinikanth returns as Tiger Muthuvel Pandian in the action-packed sequel directed by Nelson Dilipkumar."
  },
  {
    id: "2",
    title: "Udta Teer",
    genre: "Comedy, Action",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Now Showing",
    releaseDate: "2026-10-23",
    poster: "https://placehold.co/500x750/292524/FFFFFF?text=Udta+Teer",
    description:
      "An upcoming-on-the-calendar October theatrical release starring Ayushmann Khurrana and Sara Ali Khan."
  },
  {
    id: "3",
    title: "Prahaar",
    genre: "Drama",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Now Showing",
    releaseDate: "2026-10-16",
    poster: "https://placehold.co/500x750/1e293b/FFFFFF?text=Prahaar",
    description:
      "A legal drama starring Rajkummar Rao as lawyer Ujjwal Nikam."
  },
  {
    id: "4",
    title: "Ranabaali",
    genre: "Drama, Action",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Now Showing",
    releaseDate: "2026-10-16",
    poster: "https://placehold.co/500x750/292524/FFFFFF?text=Ranabaali",
    description:
      "A theatrical release starring Vijay Deverakonda and Rashmika Mandanna."
  },
  {
    id: "5",
    title: "Nayyi Navelli",
    genre: "Drama",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Now Showing",
    releaseDate: "2026-10-16",
    poster: "https://placehold.co/500x750/312e81/FFFFFF?text=Nayyi+Navelli",
    description:
      "A theatrical release starring Yami Gautam."
  },
  {
    id: "6",
    title: "Tum Mere Ho",
    genre: "Romance, Drama",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Now Showing",
    releaseDate: "2026-10-23",
    poster: "https://placehold.co/500x750/831843/FFFFFF?text=Tum+Mere+Ho",
    description:
      "A romantic drama released in India's October 2026 theatrical window."
  },
  {
    id: "7",
    title: "Tu Hai Meri Kiran",
    genre: "Romance, Drama",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Now Showing",
    releaseDate: "2026-10-23",
    poster: "https://placehold.co/500x750/701a75/FFFFFF?text=Tu+Hai+Meri+Kiran",
    description:
      "A romantic drama starring Sonakshi Sinha and Zaheer Iqbal."
  },
  {
    id: "8",
    title: "Little Thomas",
    genre: "Comedy, Drama",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Now Showing",
    releaseDate: "2026-10-23",
    poster: "https://placehold.co/500x750/14532d/FFFFFF?text=Little+Thomas",
    description:
      "A comedy-drama starring Gulshan Devaiah and Rasika Dugal."
  },
  {
    id: "9",
    title: "Ramayana: The Rise of a Legend",
    genre: "Mythology, Adventure",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Bookings Open",
    releaseDate: "2026-11-05",
    poster: "https://placehold.co/500x750/78350f/FFFFFF?text=Ramayana",
    description:
      "Nitesh Tiwari's epic retelling starring Ranbir Kapoor as Rama, Sai Pallavi as Sita, and Yash as Ravana."
  },
  {
    id: "10",
    title: "King",
    genre: "Action, Thriller",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Coming Soon",
    releaseDate: "2026-12-24",
    poster: "https://placehold.co/500x750/450a0a/FFFFFF?text=King",
    description:
      "Shah Rukh Khan stars in an action thriller directed by Siddharth Anand."
  },
  {
    id: "11",
    title: "Gunmaaster G9",
    genre: "Action",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Coming Soon",
    releaseDate: "2026-11-27",
    poster: "https://placehold.co/500x750/172554/FFFFFF?text=Gunmaaster+G9",
    description:
      "An upcoming action film starring Emraan Hashmi and Genelia D'Souza."
  },
  {
    id: "12",
    title: "Yeh Prem Mol Liya",
    genre: "Romance, Drama",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Coming Soon",
    releaseDate: "2026-11-27",
    poster: "https://placehold.co/500x750/831843/FFFFFF?text=Yeh+Prem+Mol+Liya",
    description:
      "An upcoming romantic drama starring Ayushmann Khurrana and Sharvari."
  },
  {
    id: "13",
    title: "Eetha",
    genre: "Drama",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Coming Soon",
    releaseDate: "2026-12-04",
    poster: "https://placehold.co/500x750/365314/FFFFFF?text=Eetha",
    description:
      "An upcoming theatrical film starring Shraddha Kapoor and Randeep Hooda."
  },
  {
    id: "14",
    title: "Avengers: Doomsday",
    genre: "Action, Sci-Fi",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Coming Soon",
    releaseDate: "2026-12-18",
    poster: "https://placehold.co/500x750/111827/FFFFFF?text=Avengers+Doomsday",
    description:
      "Marvel's upcoming superhero event bringing together heroes from across its cinematic universe."
  },
  {
    id: "15",
    title: "Dune: Part Three",
    genre: "Sci-Fi, Adventure",
    rating: 0,
    duration: "TBA",
    price: 200,
    status: "Coming Soon",
    releaseDate: "2026-12-18",
    poster: "https://placehold.co/500x750/78350f/FFFFFF?text=Dune+Part+Three",
    description:
      "The next chapter in Denis Villeneuve's science-fiction saga set on Arrakis."
  }
];

module.exports = movies;

