const presetPrompts = [
  "Modern tech startup with geometric shapes",
  "Vintage coffee shop with warm colors",
  "Minimalist fitness brand with bold typography",
  "Creative agency with abstract art elements",
  "Eco-friendly company with nature motifs",
  "Luxury fashion brand with elegant lines",
  "Playful children's brand with bright colors",
  "Professional law firm with classic design",
  "Music streaming service with sound waves",
  "Organic food company with farm elements",
  "Futuristic AI company with digital patterns",
  "Cozy bookstore with literary symbols",
  "Adventure travel agency with mountain peaks",
  "Artisan bakery with wheat and bread icons",
  "Sustainable energy company with sun and wind",
];

export const getRandomPrompt = () => {
  const randomIndex = Math.floor(Math.random() * presetPrompts.length);
  return presetPrompts[randomIndex];
};
